package com.serverproject.security;

import com.serverproject.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        log.debug("HEADER: {}", authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            try {
                String email = jwtUtil.getEmailFromToken(token);
                log.debug("EMAIL: {}", email);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    UserDetails userDetails = userService.loadUserByUsername(email);

                    if (jwtUtil.isTokenValid(token)) {

                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );

                        authToken.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );

                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        log.info("User authenticated: {}", email);
                    }
                }

            } catch (Exception e) {
                // Token invalid/expired ho to bhi request ko aage badhne do —
                // ye User ko "anonymous" treat karega, aur SecurityConfig khud decide karega
                // ki us path pe permission hai ya nahi (permitAll ya authenticated)
                log.warn("JWT validation failed (ignoring, treating as unauthenticated): {}", e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}