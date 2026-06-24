import { useState, createContext, useContext, useEffect, useCallback } from "react";
import {
  Droplets, Heart, Search, Plus, Bell, User, LogOut, Menu, X,
  MapPin, Phone, Mail, CheckCircle, AlertCircle, Zap, Shield,
  Users, Eye, EyeOff, ArrowRight, Home, FileText,
  AlertTriangle, Calendar, ChevronDown, Clock,
  Check, RefreshCw, Filter, Activity, Wifi, WifiOff
} from "lucide-react";


const CONFIG = {
  API_BASE: "http://localhost:8080",   
  TOKEN_KEY: "bb_jwt_token",          
  USE_MOCK: false,                     
};


const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'DM Sans',sans-serif;background:#F7F4F0;color:#1C1917;-webkit-font-smoothing:antialiased;}
  :root{
    --red:#BF1827;--red-light:#E8303F;--red-dim:#F5D0D3;--red-bg:#FDF2F3;
    --dark:#1C1917;--mid:#57534E;--muted:#A8A29E;--line:#E7E5E4;
    --surface:#FFFFFF;--bg:#F7F4F0;--card:#FFFFFF;
    --shadow-sm:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);
    --shadow:0 4px 16px rgba(0,0,0,0.08),0 2px 6px rgba(0,0,0,0.05);
    --shadow-lg:0 16px 40px rgba(0,0,0,0.12);
    --r-sm:8px;--r:12px;--r-lg:18px;--r-xl:24px;
  }
  ::-webkit-scrollbar{width:4px;height:4px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:var(--line);border-radius:4px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.96);}to{opacity:1;transform:scale(1);}}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes shimmer{0%{background-position:-600px 0;}100%{background-position:600px 0;}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
  @keyframes ripple{0%{transform:scale(0.8);opacity:0.7;}100%{transform:scale(2.2);opacity:0;}}
  .fu{animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;}
  .fi{animation:fadeIn 0.4s ease both;}
  .si{animation:scaleIn 0.3s cubic-bezier(0.22,1,0.36,1) both;}
  .spin{animation:spin 0.9s linear infinite;}
  .float{animation:float 4s ease-in-out infinite;}
  .skeleton{background:linear-gradient(90deg,#f0eeec 25%,#e8e6e3 50%,#f0eeec 75%);background-size:600px 100%;animation:shimmer 1.5s infinite;}
  input,select,textarea,button{font-family:'DM Sans',sans-serif;}
  input:focus,select:focus,textarea:focus{outline:none;border-color:var(--red)!important;box-shadow:0 0 0 3px rgba(191,24,39,0.10)!important;}
  a{text-decoration:none;color:inherit;}
  button{cursor:pointer;}
  ::selection{background:var(--red-dim);color:var(--red);}
`;

const BLOOD_GROUPS = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const PROFESSIONS  = ["Student","Engineer","Doctor","Teacher","Business","Government Employee","Other"];


const MOCK_DONORS = [
  {id:1,name:"Arjun Sharma",bloodGroup:"O+",city:"Mumbai",phone:"+91 98765 43210",email:"arjun@email.com",available:true,lastDonationDate:"2024-11-15",address:"Andheri West",age:28},
  {id:2,name:"Priya Patel",bloodGroup:"A+",city:"Delhi",phone:"+91 98765 43211",email:"priya@email.com",available:true,lastDonationDate:"2024-10-20",address:"Connaught Place",age:32},
  {id:3,name:"Rahul Singh",bloodGroup:"B+",city:"Bangalore",phone:"+91 98765 43212",email:"rahul@email.com",available:false,lastDonationDate:"2024-12-01",address:"Indiranagar",age:25},
  {id:4,name:"Meera Nair",bloodGroup:"AB+",city:"Chennai",phone:"+91 98765 43213",email:"meera@email.com",available:true,lastDonationDate:"2024-09-10",address:"Anna Nagar",age:30},
  {id:5,name:"Vikram Reddy",bloodGroup:"O-",city:"Hyderabad",phone:"+91 98765 43214",email:"vikram@email.com",available:false,lastDonationDate:"2024-11-30",address:"Banjara Hills",age:35},
  {id:6,name:"Ananya Das",bloodGroup:"A-",city:"Mumbai",phone:"+91 98765 43215",email:"ananya@email.com",available:true,lastDonationDate:"2024-10-05",address:"Bandra",age:27},
];


const mockApi = {
  async register(data) {
    await new Promise(r => setTimeout(r, 900));
    return { message: "User registered successfully!" };
  },
  async login(data) {
    await new Promise(r => setTimeout(r, 900));
    if (data.email && data.password) {
      return {
        token: "mock-jwt-token-xyz-123",
        // We'll fake user info since Spring Boot login only returns token
        user: { id:1, name:"Rahul Kumar", email:data.email, role:"donor", phone:"+91 98765 43200", location:"Mumbai", profession:"Engineer", bloodGroup:"O+" }
      };
    }
    throw new Error("Invalid credentials");
  },
  async getDonors(bloodGroup, city) {
    await new Promise(r => setTimeout(r, 700));
    let donors = [...MOCK_DONORS];
    if (bloodGroup) donors = donors.filter(d => d.bloodGroup === bloodGroup);
    if (city) donors = donors.filter(d => d.city.toLowerCase().includes(city.toLowerCase()));
    return donors;
  },
  async addDonor(data) {
    await new Promise(r => setTimeout(r, 900));
    return { id: Date.now(), message: "Donor added!" };
  },
  async addRequest(data) {
    await new Promise(r => setTimeout(r, 900));
    return { id: Date.now(), message: "Request submitted!" };
  },
  async updateProfile(data) {
    await new Promise(r => setTimeout(r, 700));
    return { message: "Profile updated!" };
  },
};


const realApi = {
  _getToken() {
    return localStorage.getItem(CONFIG.TOKEN_KEY);
  },
  _headers(auth = true) {
    const h = { "Content-Type": "application/json" };
    if (auth) {
      const token = this._getToken();
      if (token) h["Authorization"] = `Bearer ${token}`;
    }
    return h;
  },
  async _post(endpoint, data, auth = true) {
    const res = await fetch(`${CONFIG.API_BASE}${endpoint}`, {
      method: "POST",
      headers: this._headers(auth),
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || json.error || `Error ${res.status}`);
    return json;
  },
  async _get(endpoint, params = {}) {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([,v]) => v !== "" && v != null))
    ).toString();
    const res = await fetch(`${CONFIG.API_BASE}${endpoint}${qs ? "?" + qs : ""}`, {
      headers: this._headers(),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || json.error || `Error ${res.status}`);
    return json;
  },
  async _put(endpoint, data) {
    const res = await fetch(`${CONFIG.API_BASE}${endpoint}`, {
      method: "PUT",
      headers: this._headers(),
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || json.error || `Error ${res.status}`);
    return json;
  },

  // ── AUTH ENDPOINTS ──────────────────────────────────────────────────────────
  // POST /api/auth/register   Body: { name, email, phone, password, gender, profession, location, role }
  // Response: "User registered successfully!" (plain string)
  async register(data) {
    const res = await fetch(`${CONFIG.API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: this._headers(false),
      body: JSON.stringify(data),
    });
    const text = await res.text();
    if (!res.ok) throw new Error(text || `Error ${res.status}`);
    return { message: text };
  },

  // POST /api/auth/login   Body: { email, password }
  // Response: JWT token string (plain text, NOT JSON)
  // NOTE: Spring Boot ka UserService sirf "Login Successful" ya error return karta hai
  // Hum token generate karwane ke liye AuthController mein JwtUtil.generateToken() call karaana padega
  async login(data) {
    const res = await fetch(`${CONFIG.API_BASE}/api/auth/login`, {
      method: "POST",
      headers: this._headers(false),
      body: JSON.stringify(data),
    });
    const text = await res.text();
    if (!res.ok) throw new Error(text || "Login failed");
    // Spring Boot se JWT token aana chahiye
    // Agar token milta hai:
    const token = text.trim();
    // User info fetch karo token se (agar /api/auth/me endpoint ho)
    let user = { email: data.email, name: data.email.split("@")[0], role:"donor" };
    try {
      // Optional: agar /api/auth/me endpoint banaya ho
      const meRes = await fetch(`${CONFIG.API_BASE}/api/auth/me`, {
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
      });
      if (meRes.ok) user = await meRes.json();
    } catch {}
    return { token, user };
  },

  // ── DONOR ENDPOINTS ─────────────────────────────────────────────────────────
  // GET /api/donors?bloodGroup=O+&city=Mumbai
  // Response: List<Donor>
  async getDonors(bloodGroup, city) {
  if (bloodGroup && city) return this._get("/api/donors/search", { bloodGroup, city });
  if (bloodGroup)         return this._get("/api/donors/search/bloodgroup", { bloodGroup });
  if (city)               return this._get("/api/donors/search/city", { city });
  return this._get("/api/donors/search", { bloodGroup: "", city: "" });
},

  // POST /api/donors   Body: Donor object   (Protected — JWT required)
  // Response: saved Donor
  async addDonor(data) {
    return this._post("/api/donors", data);
  },

  // ── BLOOD REQUEST ENDPOINT ──────────────────────────────────────────────────
  // POST /api/requests   Body: BloodRequest object   (Protected — JWT required)
  async addRequest(data) {
    return this._post("/api/requests", data);
  },

  // ── PROFILE UPDATE ──────────────────────────────────────────────────────────
  // PUT /api/auth/profile   Body: { name, phone, location, ... }   (Protected)
  async updateProfile(data) {
    return this._put("/api/auth/profile", data);
  },
};

// ─── API SWITCH ───────────────────────────────────────────────────────────────
const api = CONFIG.USE_MOCK ? mockApi : realApi;

// ─── CONTEXTS ─────────────────────────────────────────────────────────────────
const AuthContext  = createContext(null);
const ToastContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(CONFIG.TOKEN_KEY));

  const login = (userData, tok) => {
    localStorage.setItem(CONFIG.TOKEN_KEY, tok);
    setUser(userData);
    setToken(tok);
  };
  const logout = () => {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);
  return (
    <ToastContext.Provider value={{ addToast: add }}>
      {children}
      <div style={{ position:"fixed", top:20, right:20, zIndex:9999, display:"flex", flexDirection:"column", gap:8, pointerEvents:"none" }}>
        {toasts.map(t => <ToastItem key={t.id} {...t} onClose={() => setToasts(p => p.filter(x => x.id !== t.id))}/>)}
      </div>
    </ToastContext.Provider>
  );
}

const useAuth  = () => useContext(AuthContext);
const useToast = () => useContext(ToastContext);

// ─── TOAST ────────────────────────────────────────────────────────────────────
function ToastItem({ msg, type, onClose }) {
  const cfg = {
    success: { bg:"#ECFDF5", border:"#A7F3D0", text:"#065F46", Icon:CheckCircle },
    error:   { bg:"#FEF2F2", border:"#FCA5A5", text:"#991B1B", Icon:AlertCircle },
    info:    { bg:"#EFF6FF", border:"#BFDBFE", text:"#1E40AF", Icon:AlertCircle },
  }[type] || { bg:"#EFF6FF", border:"#BFDBFE", text:"#1E40AF", Icon:AlertCircle };
  return (
    <div className="si" style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:cfg.bg, border:`1px solid ${cfg.border}`, borderRadius:"var(--r)", color:cfg.text, fontSize:13, fontWeight:500, minWidth:260, maxWidth:360, boxShadow:"var(--shadow)", pointerEvents:"all" }}>
      <cfg.Icon size={16} style={{ flexShrink:0 }}/>
      <span style={{ flex:1, lineHeight:1.5 }}>{msg}</span>
      <button onClick={onClose} style={{ background:"none", border:"none", color:cfg.text, display:"flex", alignItems:"center", padding:2, opacity:0.7 }}><X size={14}/></button>
    </div>
  );
}

// ─── UI ATOMS ─────────────────────────────────────────────────────────────────
function Btn({ children, variant="primary", size="md", loading, icon:Icon, fullWidth, onClick, type="button", disabled }) {
  const v = {
    primary: { background:"var(--red)", color:"#fff", border:"none", boxShadow:"0 2px 8px rgba(191,24,39,0.25)" },
    outline: { background:"transparent", color:"var(--red)", border:"1.5px solid var(--red)", boxShadow:"none" },
    ghost:   { background:"transparent", color:"var(--mid)", border:"1.5px solid var(--line)", boxShadow:"none" },
    dark:    { background:"var(--dark)", color:"#fff", border:"none", boxShadow:"0 2px 8px rgba(0,0,0,0.18)" },
  }[variant]||{};
  const s = {
    sm: { padding:"7px 13px", fontSize:12, borderRadius:"var(--r-sm)", gap:5 },
    md: { padding:"10px 20px", fontSize:13, borderRadius:"var(--r)", gap:6 },
    lg: { padding:"13px 26px", fontSize:15, borderRadius:"var(--r)", gap:7 },
  }[size]||{};
  return (
    <button type={type} onClick={onClick} disabled={disabled||loading}
      style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", fontWeight:600, transition:"all 0.15s", width:fullWidth?"100%":"auto", opacity:(disabled||loading)?0.55:1, cursor:(disabled||loading)?"not-allowed":"pointer", letterSpacing:"-0.1px", ...v, ...s }}
      onMouseEnter={e => { if(!disabled&&!loading){ e.currentTarget.style.filter="brightness(1.08)"; e.currentTarget.style.transform="translateY(-1px)"; }}}
      onMouseLeave={e => { e.currentTarget.style.filter=""; e.currentTarget.style.transform=""; }}>
      {loading?<RefreshCw size={14} className="spin"/>:Icon?<Icon size={size==="lg"?16:14}/>:null}
      {children}
    </button>
  );
}

function Field({ label, type="text", placeholder, value, onChange, error, required, icon:Icon, hint, readOnly }) {
  const [show, setShow] = useState(false);
  const t = type==="password"?(show?"text":"password"):type;
  return (
    <div style={{ marginBottom:14 }}>
      {label&&<label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--mid)", marginBottom:5 }}>{label}{required&&<span style={{ color:"var(--red)" }}> *</span>}</label>}
      <div style={{ position:"relative" }}>
        {Icon&&<Icon size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)", pointerEvents:"none" }}/>}
        <input type={t} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} readOnly={readOnly}
          style={{ width:"100%", padding:`10px ${type==="password"?"40px":"13px"} 10px ${Icon?"38px":"13px"}`, border:`1.5px solid ${error?"#FCA5A5":"var(--line)"}`, borderRadius:"var(--r)", fontSize:14, color:"var(--dark)", background:readOnly?"var(--bg)":"#fff" }}/>
        {type==="password"&&<button type="button" onClick={()=>setShow(!show)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"var(--muted)", display:"flex", alignItems:"center" }}>{show?<EyeOff size={14}/>:<Eye size={14}/>}</button>}
      </div>
      {hint&&!error&&<p style={{ fontSize:11, color:"var(--muted)", marginTop:4 }}>{hint}</p>}
      {error&&<p style={{ fontSize:11, color:"#DC2626", marginTop:4 }}>{error}</p>}
    </div>
  );
}

function Sel({ label, value, onChange, options, required }) {
  return (
    <div style={{ marginBottom:14 }}>
      {label&&<label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--mid)", marginBottom:5 }}>{label}{required&&<span style={{ color:"var(--red)" }}> *</span>}</label>}
      <div style={{ position:"relative" }}>
        <select value={value} onChange={e=>onChange(e.target.value)}
          style={{ width:"100%", padding:"10px 36px 10px 13px", border:"1.5px solid var(--line)", borderRadius:"var(--r)", fontSize:14, color:value?"var(--dark)":"var(--muted)", background:"#fff", appearance:"none", cursor:"pointer" }}>
          {options.map(o=><option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}
        </select>
        <ChevronDown size={13} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)", pointerEvents:"none" }}/>
      </div>
    </div>
  );
}

function Card({ children, style={} }) {
  return <div style={{ background:"var(--card)", border:"1px solid var(--line)", borderRadius:"var(--r-lg)", padding:22, boxShadow:"var(--shadow-sm)", ...style }}>{children}</div>;
}

function Badge({ children, type="success" }) {
  const cfg = { success:{bg:"#DCFCE7",color:"#166534"}, danger:{bg:"#FEE2E2",color:"#991B1B"}, warning:{bg:"#FEF3C7",color:"#92400E"}, info:{bg:"#DBEAFE",color:"#1E40AF"} }[type]||{bg:"#F3F4F6",color:"#374151"};
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px", borderRadius:20, background:cfg.bg, color:cfg.color, fontSize:11, fontWeight:700 }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:cfg.color }}/>{children}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div style={{ background:"var(--card)", border:"1px solid var(--line)", borderRadius:"var(--r-lg)", padding:20 }}>
      <div style={{ display:"flex", gap:12, marginBottom:16 }}>
        <div className="skeleton" style={{ width:48, height:48, borderRadius:"var(--r)" }}/>
        <div style={{ flex:1 }}>
          <div className="skeleton" style={{ height:14, borderRadius:4, marginBottom:8, width:"60%" }}/>
          <div className="skeleton" style={{ height:10, borderRadius:4, width:"35%" }}/>
        </div>
      </div>
      {[75,90,55,40].map((w,i)=><div key={i} className="skeleton" style={{ height:10, borderRadius:4, marginBottom:8, width:`${w}%` }}/>)}
    </div>
  );
}

function BloodDrop({ size=110, animate=false }) {
  return (
    <div className={animate?"float":""} style={{ width:size, height:size*1.3 }}>
      <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"100%" }}>
        <defs>
          <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8303F"/>
            <stop offset="100%" stopColor="#8B0000"/>
          </linearGradient>
          <radialGradient id="ds" cx="35%" cy="28%" r="42%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.32)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>
        </defs>
        {animate&&[1,2].map(i=>(
          <circle key={i} cx="50" cy="82" r="24" fill="none" stroke="rgba(191,24,39,0.18)" strokeWidth="2"
            style={{ animation:"ripple 2s ease-out infinite", animationDelay:`${(i-1)*0.55}s` }}/>
        ))}
        <path d="M50 8 C50 8 14 56 14 80 C14 101 30 118 50 118 C70 118 86 101 86 80 C86 56 50 8 50 8Z" fill="url(#dg)"/>
        <path d="M50 8 C50 8 14 56 14 80 C14 101 30 118 50 118 C70 118 86 101 86 80 C86 56 50 8 50 8Z" fill="url(#ds)"/>
        <path d="M30 68 C28 77 31 88 37 94 C41 99 47 101 50 100" stroke="rgba(255,255,255,0.30)" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <text x="50" y="90" textAnchor="middle" fill="white" fontSize="26" fontWeight="700" style={{ fontFamily:"sans-serif" }}>+</text>
      </svg>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAV = [
  { key:"dashboard", label:"Dashboard",      icon:Home },
  { key:"search",    label:"Search Donors",  icon:Search },
  { key:"add-donor", label:"Add Donor",      icon:Plus },
  { key:"emergency", label:"Emergency",      icon:AlertTriangle, alert:true },
  { key:"profile",   label:"Profile",        icon:User },
];

function Sidebar({ current, onNav, onLogout, user, collapsed, onToggle }) {
  return (
    <div style={{ width:collapsed?64:240, minHeight:"100vh", background:"var(--dark)", display:"flex", flexDirection:"column", transition:"width 0.25s cubic-bezier(0.4,0,0.2,1)", flexShrink:0, position:"sticky", top:0, alignSelf:"flex-start", overflowX:"hidden" }}>
      <div style={{ padding:"18px 14px", display:"flex", alignItems:"center", justifyContent:collapsed?"center":"space-between", borderBottom:"1px solid rgba(255,255,255,0.07)", minHeight:66 }}>
        {!collapsed&&(
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:32, height:32, background:"var(--red)", borderRadius:"var(--r-sm)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Droplets size={16} color="#fff"/></div>
            <div>
              <div style={{ fontWeight:700, fontSize:15, color:"#F5F5F4", fontFamily:"'DM Serif Display',serif" }}>BloodBridge</div>
              <div style={{ fontSize:10, color:"#57534E", marginTop:1 }}>Donor Network</div>
            </div>
          </div>
        )}
        {collapsed&&<div style={{ width:32, height:32, background:"var(--red)", borderRadius:"var(--r-sm)", display:"flex", alignItems:"center", justifyContent:"center" }}><Droplets size={16} color="#fff"/></div>}
        {!collapsed&&<button onClick={onToggle} style={{ background:"rgba(255,255,255,0.06)", border:"none", color:"#78716C", borderRadius:8, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center" }}><Menu size={14}/></button>}
      </div>

      {!collapsed&&user&&(
        <div style={{ padding:"14px 14px 10px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(255,255,255,0.05)", borderRadius:"var(--r)", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"var(--red)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:12, fontWeight:600, color:"#E7E5E4", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name||user.email}</p>
              <p style={{ fontSize:10, color:"#78716C", marginTop:1 }}>{user.role||"Donor"}</p>
            </div>
          </div>
        </div>
      )}

      <nav style={{ padding:"10px 10px", flex:1 }}>
        {NAV.map(item=>{
          const active=current===item.key;
          return (
            <button key={item.key} onClick={()=>onNav(item.key)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:collapsed?"12px":"10px 12px", borderRadius:"var(--r)", border:"none", background:active?"rgba(191,24,39,0.15)":"transparent", color:active?"var(--red-light)":item.alert?"#F87171":"#78716C", marginBottom:2, transition:"all 0.15s", justifyContent:collapsed?"center":"flex-start", position:"relative" }}
              onMouseEnter={e=>{if(!active){e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color="#E7E5E4";}}}
              onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color=item.alert?"#F87171":"#78716C";}}}>
              {active&&<span style={{ position:"absolute", left:0, top:"20%", bottom:"20%", width:3, background:"var(--red)", borderRadius:"0 3px 3px 0" }}/>}
              <item.icon size={16} style={{ flexShrink:0 }}/>
              {!collapsed&&<span style={{ fontSize:13, fontWeight:active?600:500 }}>{item.label}</span>}
              {!collapsed&&item.alert&&<span style={{ marginLeft:"auto", width:7, height:7, borderRadius:"50%", background:"#EF4444" }}/>}
            </button>
          );
        })}
      </nav>

      <div style={{ padding:"10px 10px 14px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        {!collapsed&&(
          <div style={{ padding:"8px 12px", background:CONFIG.USE_MOCK?"rgba(239,68,68,0.08)":"rgba(74,222,128,0.08)", border:`1px solid ${CONFIG.USE_MOCK?"rgba(239,68,68,0.2)":"rgba(74,222,128,0.2)"}`, borderRadius:"var(--r)", marginBottom:8, display:"flex", alignItems:"center", gap:8 }}>
            {CONFIG.USE_MOCK
              ?<><WifiOff size={12} color="#F87171"/><span style={{ fontSize:11, color:"#F87171", fontWeight:600 }}>Mock Mode</span></>
              :<><Wifi size={12} color="#4ADE80"/><span style={{ fontSize:11, color:"#4ADE80", fontWeight:600 }}>Spring Boot Connected</span></>
            }
          </div>
        )}
        <button onClick={onLogout}
          style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:collapsed?"12px":"10px 12px", borderRadius:"var(--r)", border:"none", background:"transparent", color:"#78716C", justifyContent:collapsed?"center":"flex-start", transition:"all 0.15s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.1)";e.currentTarget.style.color="#FCA5A5";}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#78716C";}}>
          <LogOut size={15}/>{!collapsed&&<span style={{ fontSize:13 }}>Logout</span>}
        </button>
      </div>
    </div>
  );
}

function DashShell({ children, page, onNav, onLogout, user }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg)" }}>
      <Sidebar current={page} onNav={onNav} onLogout={onLogout} user={user} collapsed={collapsed} onToggle={()=>setCollapsed(c=>!c)}/>
      <div style={{ flex:1, overflow:"hidden" }}>
        <div style={{ padding:"0 28px", height:62, background:"#fff", borderBottom:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {collapsed&&<button onClick={()=>setCollapsed(false)} style={{ background:"none", border:"none", color:"var(--muted)", display:"flex", alignItems:"center", marginRight:8 }}><Menu size={18}/></button>}
            <h2 style={{ fontSize:16, fontWeight:700, color:"var(--dark)", fontFamily:"'DM Serif Display',serif" }}>
              {NAV.find(n=>n.key===page)?.label||"Dashboard"}
            </h2>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button style={{ width:34, height:34, borderRadius:"var(--r-sm)", border:"1.5px solid var(--line)", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--muted)", position:"relative" }}>
              <Bell size={15}/>
              <span style={{ position:"absolute", top:7, right:7, width:6, height:6, borderRadius:"50%", background:"var(--red)", border:"2px solid #fff" }}/>
            </button>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"var(--red)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", cursor:"pointer" }} onClick={()=>onNav("profile")}>
              {user?.name?.charAt(0).toUpperCase()||"U"}
            </div>
          </div>
        </div>
        <div style={{ padding:28, maxWidth:1200 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onNav }) {
  const stats = [{v:"50K+",l:"Active Donors"},{v:"1.2L+",l:"Lives Saved"},{v:"500+",l:"Cities Covered"},{v:"24/7",l:"Emergency Support"}];
  const steps = [
    {n:"01",t:"Register",d:"Create your donor profile in 2 minutes. No hospital tie-up needed."},
    {n:"02",t:"Get Matched",d:"Our system finds donors near the patient, any city, any blood group."},
    {n:"03",t:"Donate & Save",d:"Connect directly. Coordinate with the patient or their family."},
  ];
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <nav style={{ padding:"0 6%", height:64, background:"#fff", borderBottom:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:32, height:32, background:"var(--red)", borderRadius:"var(--r-sm)", display:"flex", alignItems:"center", justifyContent:"center" }}><Droplets size={16} color="#fff"/></div>
          <span style={{ fontWeight:700, fontSize:17, color:"var(--dark)", fontFamily:"'DM Serif Display',serif" }}>BloodBridge</span>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <Btn variant="ghost" onClick={()=>onNav("login")}>Sign In</Btn>
          <Btn onClick={()=>onNav("signup")}>Register</Btn>
        </div>
      </nav>

      <section style={{ padding:"80px 6% 70px", display:"grid", gridTemplateColumns:"1fr 420px", gap:60, alignItems:"center", maxWidth:1200, margin:"0 auto" }}>
        <div className="fu">
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 12px", background:"var(--red-bg)", border:"1px solid var(--red-dim)", borderRadius:20, marginBottom:20 }}>
            <Zap size={12} color="var(--red)"/>
            <span style={{ fontSize:12, color:"var(--red)", fontWeight:700 }}>India's Open Blood Donor Network</span>
          </div>
          <h1 style={{ fontSize:54, fontWeight:400, color:"var(--dark)", lineHeight:1.1, letterSpacing:"-1.5px", marginBottom:20, fontFamily:"'DM Serif Display',serif" }}>
            Find a donor,<br/><em style={{ color:"var(--red)", fontStyle:"italic" }}>save a life</em>
          </h1>
          <p style={{ fontSize:17, color:"var(--mid)", lineHeight:1.75, marginBottom:36, maxWidth:460 }}>
            A free, community-driven platform connecting blood donors with patients across India — no hospital restriction, no fees.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Btn size="lg" onClick={()=>onNav("signup")} icon={Heart}>Become a Donor</Btn>
            <Btn size="lg" variant="outline" onClick={()=>onNav("login")} icon={Search}>Find Donors</Btn>
          </div>
        </div>
        <div className="fi" style={{ display:"flex", justifyContent:"center" }}>
          <div style={{ position:"relative" }}>
            <div style={{ width:320, height:320, borderRadius:"50%", background:"linear-gradient(135deg,#FDF2F3,#fff)", border:"2px solid var(--red-dim)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <BloodDrop size={160} animate/>
            </div>
          </div>
        </div>
      </section>

      <div style={{ background:"var(--dark)", padding:"28px 6%" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", maxWidth:900, margin:"0 auto" }}>
          {stats.map((s,i)=>(
            <div key={i} style={{ textAlign:"center", padding:"0 20px", borderRight:i<3?"1px solid rgba(255,255,255,0.1)":"none" }}>
              <div style={{ fontSize:30, fontWeight:700, color:"#fff", fontFamily:"'DM Serif Display',serif" }}>{s.v}</div>
              <div style={{ fontSize:12, color:"#78716C", marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <section style={{ padding:"70px 6%", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <h2 style={{ fontSize:38, fontWeight:400, color:"var(--dark)", fontFamily:"'DM Serif Display',serif" }}>How it works</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
          {steps.map((s,i)=>(
            <div key={i} style={{ padding:28, background:"#fff", border:"1px solid var(--line)", borderRadius:"var(--r-xl)" }}>
              <div style={{ fontSize:60, fontWeight:800, color:"var(--red-dim)", fontFamily:"'DM Serif Display',serif", lineHeight:1, marginBottom:14 }}>{s.n}</div>
              <h3 style={{ fontSize:18, fontWeight:700, color:"var(--dark)", marginBottom:10, fontFamily:"'DM Serif Display',serif" }}>{s.t}</h3>
              <p style={{ fontSize:13, color:"var(--mid)", lineHeight:1.7 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop:"1px solid var(--line)", padding:"24px 6%", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontWeight:700, color:"var(--dark)", fontSize:14, fontFamily:"'DM Serif Display',serif" }}>BloodBridge</span>
        <p style={{ fontSize:12, color:"var(--muted)" }}>© 2025 BloodBridge. Free & open for all.</p>
      </footer>
    </div>
  );
}

// ─── AUTH SHELL ───────────────────────────────────────────────────────────────
function AuthShell({ children, title, sub, onBack }) {
  return (
    <div style={{ minHeight:"100vh", display:"flex" }}>
      <div style={{ width:400, background:"var(--dark)", display:"flex", flexDirection:"column", padding:"36px 40px", flexShrink:0, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:"-10%", right:"-30%", width:400, height:400, background:"radial-gradient(circle,rgba(191,24,39,0.14) 0%,transparent 70%)", borderRadius:"50%", pointerEvents:"none" }}/>
        <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:56 }}>
          <div style={{ width:32, height:32, background:"var(--red)", borderRadius:"var(--r-sm)", display:"flex", alignItems:"center", justifyContent:"center" }}><Droplets size={16} color="#fff"/></div>
          <span style={{ fontWeight:700, fontSize:16, color:"#F5F5F4", fontFamily:"'DM Serif Display',serif" }}>BloodBridge</span>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <BloodDrop size={100} animate/>
          <h2 style={{ fontSize:30, fontWeight:400, color:"#F5F5F4", marginTop:28, marginBottom:12, fontFamily:"'DM Serif Display',serif" }}>Every Drop<br/><em style={{ color:"var(--red-light)" }}>Counts</em></h2>
          <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:10 }}>
            {["50,000+ Active Donors","Any city, any blood group","Emergency alerts 24×7"].map(item=>(
              <div key={item} style={{ display:"flex", alignItems:"center", gap:9 }}>
                <CheckCircle size={13} color="var(--red)"/>
                <span style={{ fontSize:12, color:"#78716C" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 52px", background:"#fff" }}>
        <div style={{ width:"100%", maxWidth:400 }} className="si">
          <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", color:"var(--muted)", fontSize:12, cursor:"pointer", marginBottom:28 }}>
            <ArrowRight size={13} style={{ transform:"rotate(180deg)" }}/> Back to home
          </button>
          <h1 style={{ fontSize:28, fontWeight:400, color:"var(--dark)", marginBottom:6, fontFamily:"'DM Serif Display',serif" }}>{title}</h1>
          <p style={{ fontSize:13, color:"var(--mid)", marginBottom:28 }}>{sub}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onNav }) {
  const { login } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({ email:"", password:"" });
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e={};
    if(!form.email) e.email="Email required";
    else if(!/\S+@\S+\.\S+/.test(form.email)) e.email="Invalid email";
    if(!form.password) e.password="Password required";
    return e;
  };

  const submit = async(ev) => {
    ev.preventDefault();
    const e=validate(); if(Object.keys(e).length){setErrs(e);return;}
    setLoading(true);
    try {
      // Spring Boot: POST /api/auth/login → JWT token
      const r = await api.login(form);
      login(r.user, r.token);
      addToast("Welcome back!","success");
      onNav("dashboard");
    } catch(err) { addToast(err.message||"Login failed","error"); }
    finally { setLoading(false); }
  };

  return (
    <AuthShell title="Welcome back" sub="Sign in to your BloodBridge account" onBack={()=>onNav("landing")}>
      <form onSubmit={submit}>
        <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={v=>setForm({...form,email:v})} error={errs.email} required icon={Mail}/>
        <Field label="Password" type="password" placeholder="Your password" value={form.password} onChange={v=>setForm({...form,password:v})} error={errs.password} required icon={Shield}/>
        <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:20 }}>
          <a href="#" style={{ fontSize:12, color:"var(--red)", fontWeight:600 }}>Forgot password?</a>
        </div>
        <Btn type="submit" fullWidth size="lg" loading={loading}>Sign In</Btn>
        <p style={{ textAlign:"center", fontSize:12, color:"var(--muted)", marginTop:20 }}>
          No account?{" "}<span onClick={()=>onNav("signup")} style={{ color:"var(--red)", fontWeight:700, cursor:"pointer" }}>Create one free</span>
        </p>
      </form>
      {CONFIG.USE_MOCK&&(
        <div style={{ marginTop:20, padding:"11px 14px", background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:"var(--r)" }}>
          <p style={{ fontSize:11, fontWeight:700, color:"#166534", marginBottom:2 }}>Demo — any email & password works</p>
        </div>
      )}
    </AuthShell>
  );
}

// ─── SIGNUP ───────────────────────────────────────────────────────────────────
function Signup({ onNav }) {
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  // Fields match exactly your User.java model
  const [form, setForm] = useState({ name:"", email:"", phone:"", password:"", gender:"", profession:"", location:"", role:"donor" });
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);
  const upd = (k,v) => setForm(p=>({...p,[k]:v}));

  const v1 = () => {
    const e={};
    if(!form.name.trim()) e.name="Name required";
    if(!form.email||!/\S+@\S+\.\S+/.test(form.email)) e.email="Valid email required";
    if(!form.phone) e.phone="Phone required";
    if(!form.password||form.password.length<6) e.password="Min 6 characters";
    return e;
  };
  const v2 = () => {
    const e={};
    if(!form.gender) e.gender="Select gender";
    if(!form.location.trim()) e.location="City required";
    return e;
  };

  const next = () => { const e=v1(); if(Object.keys(e).length){setErrs(e);return;} setErrs({}); setStep(2); };
  const submit = async(ev) => {
    ev.preventDefault();
    const e=v2(); if(Object.keys(e).length){setErrs(e);return;}
    setLoading(true);
    try {
      // Spring Boot: POST /api/auth/register   Body matches User.java fields
      await api.register(form);
      addToast("Account created! Please sign in.","success");
      onNav("login");
    } catch(err) { addToast(err.message||"Registration failed","error"); }
    finally { setLoading(false); }
  };

  return (
    <AuthShell title={step===1?"Create account":"Your details"} sub={step===1?"Join the BloodBridge network":"Just a few more things"} onBack={()=>step===1?onNav("landing"):setStep(1)}>
      <div style={{ display:"flex", gap:6, marginBottom:26 }}>
        {[1,2].map(s=>(
          <div key={s} style={{ flex:1 }}>
            <div style={{ height:3, borderRadius:2, background:s<=step?"var(--red)":"var(--line)", transition:"background 0.3s" }}/>
            <p style={{ fontSize:11, color:s<=step?"var(--red)":"var(--muted)", marginTop:5, fontWeight:s<=step?600:400 }}>Step {s}</p>
          </div>
        ))}
      </div>
      {step===1?(
        <div>
          <Field label="Full Name" placeholder="Rahul Kumar" value={form.name} onChange={v=>upd("name",v)} error={errs.name} required icon={User}/>
          <Field label="Email" type="email" placeholder="rahul@example.com" value={form.email} onChange={v=>upd("email",v)} error={errs.email} required icon={Mail}/>
          <Field label="Phone" placeholder="+91 98765 43210" value={form.phone} onChange={v=>upd("phone",v)} error={errs.phone} required icon={Phone}/>
          <Field label="Password" type="password" placeholder="Minimum 6 characters" value={form.password} onChange={v=>upd("password",v)} error={errs.password} required icon={Shield} hint="Use letters, numbers & symbols"/>
          <Btn fullWidth size="lg" onClick={next} icon={ArrowRight}>Continue</Btn>
        </div>
      ):(
        <form onSubmit={submit}>
          <Sel label="Gender" value={form.gender} onChange={v=>upd("gender",v)} options={[{value:"",label:"Select gender"},"Male","Female","Other"]} required/>
          {errs.gender&&<p style={{ fontSize:11, color:"#DC2626", marginTop:-10, marginBottom:12 }}>{errs.gender}</p>}
          <Sel label="Profession" value={form.profession} onChange={v=>upd("profession",v)} options={[{value:"",label:"Select profession"},...PROFESSIONS]}/>
          <Field label="City" placeholder="Mumbai, Delhi, Bangalore…" value={form.location} onChange={v=>upd("location",v)} error={errs.location} required icon={MapPin}/>
          <Sel label="I am a" value={form.role} onChange={v=>upd("role",v)} options={[{value:"donor",label:"Blood Donor"},{value:"recipient",label:"Patient / Recipient"},{value:"staff",label:"Hospital Staff"}]}/>
          <Btn type="submit" fullWidth size="lg" loading={loading}>Create Account</Btn>
        </form>
      )}
      <p style={{ textAlign:"center", fontSize:12, color:"var(--muted)", marginTop:18 }}>
        Already registered?{" "}<span onClick={()=>onNav("login")} style={{ color:"var(--red)", fontWeight:700, cursor:"pointer" }}>Sign in</span>
      </p>
    </AuthShell>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashHome({ onNav }) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  useEffect(()=>{const t=setTimeout(()=>setShow(true),150);return()=>clearTimeout(t);},[]);
  const cards=[
    {title:"Total Donors",value:"12,847",change:"+8% this month",icon:Users,color:"#3B82F6",bg:"#EFF6FF"},
    {title:"Emergency Requests",value:"23",change:"+3 today",icon:AlertTriangle,color:"#EF4444",bg:"#FEF2F2"},
    {title:"Available Now",value:"8,492",change:"+12% this week",icon:CheckCircle,color:"#10B981",bg:"#ECFDF5"},
    {title:"Lives Saved",value:"4,261",change:"All-time total",icon:Heart,color:"var(--red)",bg:"var(--red-bg)"},
  ];
  const activity=[
    {msg:"O− blood requested — Mumbai",time:"2 min ago",dot:"#EF4444"},
    {msg:"Rahul S. donated successfully",time:"15 min ago",dot:"#10B981"},
    {msg:"New donor registered — Bangalore",time:"1h ago",dot:"#3B82F6"},
    {msg:"AB+ emergency resolved — Chennai",time:"2h ago",dot:"#10B981"},
    {msg:"B+ urgently needed — Hyderabad",time:"3h ago",dot:"#F59E0B"},
  ];
  const supply=[{g:"O+",pct:85,c:"#10B981"},{g:"A+",pct:72,c:"#3B82F6"},{g:"B+",pct:48,c:"#F59E0B"},{g:"AB−",pct:14,c:"#EF4444"},{g:"O−",pct:28,c:"#F59E0B"}];
  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22, fontWeight:400, color:"var(--dark)", fontFamily:"'DM Serif Display',serif" }}>
          Good {new Date().getHours()<12?"morning":new Date().getHours()<17?"afternoon":"evening"}, {user?.name?.split(" ")[0]||"there"} 👋
        </h1>
        <p style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:14, marginBottom:22 }}>
        {cards.map((c,i)=>(
          <div key={i} style={{ background:"#fff", border:"1px solid var(--line)", borderRadius:"var(--r-lg)", padding:"18px 20px", boxShadow:"var(--shadow-sm)", opacity:show?1:0, transform:show?"translateY(0)":"translateY(14px)", transition:`opacity 0.4s ${i*0.08}s,transform 0.4s ${i*0.08}s` }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ width:38, height:38, borderRadius:"var(--r)", background:c.bg, display:"flex", alignItems:"center", justifyContent:"center" }}><c.icon size={18} color={c.color}/></div>
              <span style={{ fontSize:10, color:"var(--muted)", background:"var(--bg)", padding:"3px 7px", borderRadius:6, fontWeight:600 }}>{c.change}</span>
            </div>
            <div style={{ fontSize:26, fontWeight:700, color:"var(--dark)", letterSpacing:"-0.8px", marginBottom:2, fontFamily:"'DM Serif Display',serif" }}>{c.value}</div>
            <div style={{ fontSize:12, color:"var(--muted)" }}>{c.title}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:16 }}>
        <Card>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, paddingBottom:14, borderBottom:"1px solid var(--line)" }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--dark)" }}>Recent Activity</h3>
            <span style={{ fontSize:12, color:"var(--red)", cursor:"pointer", fontWeight:600 }}>View all →</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {activity.map((a,i)=>(
              <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start" }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:a.dot, marginTop:5, flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, color:"var(--dark)", marginBottom:2 }}>{a.msg}</p>
                  <p style={{ fontSize:11, color:"var(--muted)" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card>
            <h3 style={{ fontSize:13, fontWeight:700, color:"var(--dark)", marginBottom:14 }}>Quick Actions</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[{label:"Search Donors",icon:Search,color:"#3B82F6",key:"search"},{label:"Add Donor",icon:Plus,color:"#10B981",key:"add-donor"},{label:"Emergency Request",icon:AlertTriangle,color:"var(--red)",key:"emergency"}].map(a=>(
                <button key={a.key} onClick={()=>onNav(a.key)}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", border:"1.5px solid var(--line)", borderRadius:"var(--r)", background:"var(--bg)", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s", fontSize:13, fontWeight:600, color:"var(--dark)" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=a.color;e.currentTarget.style.background="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--line)";e.currentTarget.style.background="var(--bg)";}}>
                  <div style={{ width:28, height:28, borderRadius:"var(--r-sm)", background:a.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}><a.icon size={13} color={a.color}/></div>
                  {a.label}
                  <ArrowRight size={12} style={{ marginLeft:"auto", color:"var(--muted)" }}/>
                </button>
              ))}
            </div>
          </Card>
          <Card>
            <h3 style={{ fontSize:13, fontWeight:700, color:"var(--dark)", marginBottom:14 }}>Blood Supply</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {supply.map(b=>(
                <div key={b.g}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                    <span style={{ fontWeight:700, color:"var(--dark)" }}>{b.g}</span>
                    <span style={{ color:"var(--muted)" }}>{b.pct}%</span>
                  </div>
                  <div style={{ height:5, background:"var(--bg)", borderRadius:3 }}>
                    <div style={{ height:"100%", width:`${b.pct}%`, background:b.c, borderRadius:3, transition:"width 1.2s ease" }}/>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH DONOR ─────────────────────────────────────────────────────────────
function SearchDonor() {
  const [filters, setFilters] = useState({ bloodGroup:"", city:"" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { addToast } = useToast();

  const doSearch = async(f=filters) => {
    setLoading(true); setSearched(true);
    try {
      // Spring Boot: GET /api/donors?bloodGroup=O+&city=Mumbai
      // DonorRepository.findByBloodGroupAndCity() se data aayega
      const data = await api.getDonors(f.bloodGroup, f.city);
      setResults(Array.isArray(data)?data:data.data||[]);
    } catch(err) { addToast(err.message||"Search failed","error"); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ doSearch(); },[]);

  const clear = () => { const f={bloodGroup:"",city:""}; setFilters(f); doSearch(f); };

  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:400, color:"var(--dark)", fontFamily:"'DM Serif Display',serif" }}>Search Blood Donors</h1>
        <p style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>Find available donors by blood group and city</p>
      </div>
      <Card style={{ marginBottom:20 }}>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"flex-end" }}>
          <div style={{ flex:"1 1 160px" }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--mid)", marginBottom:6 }}>Blood Group</label>
            <div style={{ position:"relative" }}>
              <select value={filters.bloodGroup} onChange={e=>setFilters({...filters,bloodGroup:e.target.value})}
                style={{ width:"100%", padding:"10px 34px 10px 13px", border:"1.5px solid var(--line)", borderRadius:"var(--r)", fontSize:13, color:filters.bloodGroup?"var(--dark)":"var(--muted)", background:"#fff", appearance:"none", cursor:"pointer", fontFamily:"inherit" }}>
                <option value="">All Groups</option>
                {BLOOD_GROUPS.map(g=><option key={g} value={g}>{g}</option>)}
              </select>
              <ChevronDown size={13} style={{ position:"absolute", right:11, top:"50%", transform:"translateY(-50%)", color:"var(--muted)", pointerEvents:"none" }}/>
            </div>
          </div>
          <div style={{ flex:"1 1 180px" }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--mid)", marginBottom:6 }}>City</label>
            <div style={{ position:"relative" }}>
              <MapPin size={13} style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", color:"var(--muted)", pointerEvents:"none" }}/>
              <input value={filters.city} onChange={e=>setFilters({...filters,city:e.target.value})} placeholder="Enter city…" onKeyDown={e=>e.key==="Enter"&&doSearch()}
                style={{ width:"100%", padding:"10px 13px 10px 34px", border:"1.5px solid var(--line)", borderRadius:"var(--r)", fontSize:13, color:"var(--dark)", background:"#fff", fontFamily:"inherit" }}/>
            </div>
          </div>
          <Btn onClick={()=>doSearch()} loading={loading} icon={Search}>Search</Btn>
          <Btn variant="ghost" onClick={clear} icon={X}>Clear</Btn>
        </div>
      </Card>
      {searched&&!loading&&<p style={{ fontSize:12, color:"var(--muted)", marginBottom:14 }}>Found <strong style={{ color:"var(--dark)" }}>{results.length}</strong> donor{results.length!==1?"s":""}</p>}
      {loading?(
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
          {[1,2,3,4,5,6].map(i=><SkeletonCard key={i}/>)}
        </div>
      ):results.length>0?(
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
          {results.map((d,i)=>(
            <div key={d.id||i} style={{ background:"#fff", border:"1px solid var(--line)", borderRadius:"var(--r-lg)", padding:18, boxShadow:"var(--shadow-sm)", animation:`fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) ${i*0.06}s both`, transition:"box-shadow 0.2s,transform 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--shadow)";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--shadow-sm)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ width:44, height:44, borderRadius:"var(--r)", background:"var(--red-bg)", border:"1.5px solid var(--red-dim)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"var(--red)", fontFamily:"'DM Serif Display',serif" }}>{d.bloodGroup}</div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:"var(--dark)" }}>{d.name}</p>
                    <p style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>Age {d.age}</p>
                  </div>
                </div>
                <Badge type={d.available?"success":"danger"}>{d.available?"Available":"Busy"}</Badge>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14, padding:"12px 0", borderTop:"1px solid var(--line)", borderBottom:"1px solid var(--line)" }}>
                {[[MapPin,`${d.city}${d.address?` · ${d.address}`:""}`],[Phone,d.phone],[Mail,d.email],[Clock,`Last donated: ${d.lastDonationDate||d.lastDonation||"—"}`]].map(([Icon,txt],j)=>txt&&(
                  <div key={j} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:"var(--mid)" }}>
                    <Icon size={12} color="var(--muted)"/><span>{txt}</span>
                  </div>
                ))}
              </div>
              {d.available?(
                <a href={`tel:${d.phone}`} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"9px", background:"var(--red)", color:"#fff", borderRadius:"var(--r)", fontSize:13, fontWeight:700 }}>
                  <Phone size={13}/> Contact Donor
                </a>
              ):(
                <div style={{ padding:"9px", background:"var(--bg)", borderRadius:"var(--r)", textAlign:"center", fontSize:12, color:"var(--muted)" }}>Not available currently</div>
              )}
            </div>
          ))}
        </div>
      ):searched&&(
        <div style={{ textAlign:"center", padding:"60px 20px" }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"var(--red-bg)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}><Search size={24} color="var(--red)"/></div>
          <h3 style={{ fontSize:16, fontWeight:700, color:"var(--dark)", marginBottom:8, fontFamily:"'DM Serif Display',serif" }}>No Donors Found</h3>
          <p style={{ fontSize:13, color:"var(--muted)" }}>Try a different city or blood group.</p>
        </div>
      )}
    </div>
  );
}

// ─── ADD DONOR ────────────────────────────────────────────────────────────────
function AddDonor() {
  const { addToast } = useToast();
  // Fields match your Donor.java model exactly
  const blank = { name:"", bloodGroup:"", city:"", phone:"", email:"", address:"", lastDonationDate:"", age:"", latitude:"", longitude:"", available:true };
  const [form, setForm] = useState(blank);
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const upd = (k,v) => setForm(p=>({...p,[k]:v}));

  const validate = () => {
    const e={};
    if(!form.name.trim()) e.name="Required";
    if(!form.bloodGroup)  e.bloodGroup="Select blood group";
    if(!form.city.trim()) e.city="Required";
    if(!form.phone.trim()) e.phone="Required";
    if(form.email&&!/\S+@\S+\.\S+/.test(form.email)) e.email="Invalid email";
    if(form.age&&(isNaN(form.age)||+form.age<18||+form.age>65)) e.age="Must be 18–65";
    return e;
  };

  const submit = async(ev) => {
    ev.preventDefault();
    const e=validate(); if(Object.keys(e).length){setErrs(e);return;}
    setLoading(true);
    try {
      // Spring Boot: POST /api/donors   Body: Donor.java fields
      // age must be int, latitude/longitude must be double
      const payload = {
        ...form,
        age: form.age ? parseInt(form.age) : null,
        latitude: form.latitude ? parseFloat(form.latitude) : 0,
        longitude: form.longitude ? parseFloat(form.longitude) : 0,
      };
      await api.addDonor(payload);
      addToast("Donor added successfully!","success");
      setDone(true); setForm(blank); setErrs({});
      setTimeout(()=>setDone(false),3000);
    } catch(err) { addToast(err.message||"Failed to add donor","error"); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:400, color:"var(--dark)", fontFamily:"'DM Serif Display',serif" }}>Add New Donor</h1>
        <p style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>Register a blood donor to the network</p>
      </div>
      {done&&<div className="si" style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", background:"#ECFDF5", border:"1px solid #A7F3D0", borderRadius:"var(--r)", marginBottom:18 }}>
        <CheckCircle size={18} color="#059669"/><p style={{ fontSize:13, fontWeight:600, color:"#065F46" }}>Donor added! You can add another.</p>
      </div>}
      <form onSubmit={submit}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <Card>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:18, paddingBottom:14, borderBottom:"1px solid var(--line)" }}>
              <div style={{ width:32, height:32, borderRadius:"var(--r-sm)", background:"var(--red-bg)", display:"flex", alignItems:"center", justifyContent:"center" }}><User size={15} color="var(--red)"/></div>
              <h3 style={{ fontSize:13, fontWeight:700, color:"var(--dark)" }}>Personal Information</h3>
            </div>
            <Field label="Full Name" placeholder="Arjun Sharma" value={form.name} onChange={v=>upd("name",v)} error={errs.name} required icon={User}/>
            <Field label="Age" type="number" placeholder="28" value={form.age} onChange={v=>upd("age",v)} error={errs.age} icon={Calendar} hint="Must be 18–65 years"/>
            <Sel label="Blood Group" value={form.bloodGroup} onChange={v=>upd("bloodGroup",v)} options={[{value:"",label:"Select blood group"},...BLOOD_GROUPS]} required/>
            {errs.bloodGroup&&<p style={{ fontSize:11, color:"#DC2626", marginTop:-10, marginBottom:12 }}>{errs.bloodGroup}</p>}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px", background:form.available?"#ECFDF5":"var(--red-bg)", borderRadius:"var(--r)", border:`1.5px solid ${form.available?"#A7F3D0":"var(--red-dim)"}`, marginTop:6 }}>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:form.available?"#065F46":"var(--red)" }}>Available to Donate</p>
                <p style={{ fontSize:11, color:form.available?"#059669":"var(--red-light)", marginTop:1 }}>{form.available?"Ready now":"Not available"}</p>
              </div>
              <button type="button" onClick={()=>upd("available",!form.available)}
                style={{ width:44, height:24, borderRadius:12, background:form.available?"#10B981":"#D6D3D1", border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
                <span style={{ position:"absolute", top:3, left:form.available?22:3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.18)" }}/>
              </button>
            </div>
          </Card>
          <Card>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:18, paddingBottom:14, borderBottom:"1px solid var(--line)" }}>
              <div style={{ width:32, height:32, borderRadius:"var(--r-sm)", background:"#EFF6FF", display:"flex", alignItems:"center", justifyContent:"center" }}><MapPin size={15} color="#3B82F6"/></div>
              <h3 style={{ fontSize:13, fontWeight:700, color:"var(--dark)" }}>Contact & Location</h3>
            </div>
            <Field label="Phone Number" placeholder="+91 98765 43210" value={form.phone} onChange={v=>upd("phone",v)} error={errs.phone} required icon={Phone}/>
            <Field label="Email" type="email" placeholder="donor@example.com" value={form.email} onChange={v=>upd("email",v)} error={errs.email} icon={Mail}/>
            <Field label="City" placeholder="Mumbai" value={form.city} onChange={v=>upd("city",v)} error={errs.city} required icon={MapPin}/>
            <Field label="Full Address" placeholder="Andheri West, near XYZ" value={form.address} onChange={v=>upd("address",v)} icon={FileText}/>
            <Field label="Last Donation Date" type="date" value={form.lastDonationDate} onChange={v=>upd("lastDonationDate",v)} icon={Calendar}/>
          </Card>
        </div>
        <div style={{ display:"flex", justifyContent:"flex-end", gap:10 }}>
          <Btn variant="ghost" type="button" onClick={()=>{setForm(blank);setErrs({});}} icon={X}>Reset</Btn>
          <Btn type="submit" loading={loading} icon={Plus}>Add Donor</Btn>
        </div>
      </form>
    </div>
  );
}

// ─── EMERGENCY ────────────────────────────────────────────────────────────────
function Emergency() {
  const { addToast } = useToast();
  // Fields match BloodRequest.java (jo tumhare tree mein tha)
  const [form, setForm] = useState({ bloodGroup:"", location:"", urgency:"Urgent", notes:"", contactPhone:"" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(null);
  const upd = (k,v) => setForm(p=>({...p,[k]:v}));
  const urgMap = {
    Normal:{color:"#3B82F6",bg:"#EFF6FF",border:"#BFDBFE",label:"Within 24–48 hours",icon:Clock},
    Urgent:{color:"#F59E0B",bg:"#FFFBEB",border:"#FDE68A",label:"Within 4–6 hours",icon:AlertCircle},
    Critical:{color:"#EF4444",bg:"#FEF2F2",border:"#FECACA",label:"Immediately needed",icon:AlertTriangle},
  };
  const submit = async(ev) => {
    ev.preventDefault();
    if(!form.bloodGroup||!form.location){addToast("Blood group and location required","error");return;}
    setLoading(true);
    try {
      // Spring Boot: POST /api/requests   Body: BloodRequest.java fields
      const r = await api.addRequest(form);
      setDone(r.id||r.requestId||"REQ-"+Date.now());
      addToast("Emergency alert sent!","success");
    } catch(err) { addToast(err.message||"Failed to send request","error"); }
    finally { setLoading(false); }
  };
  if(done) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
      <div style={{ textAlign:"center", maxWidth:380 }} className="si">
        <div style={{ width:80, height:80, borderRadius:"50%", background:"#ECFDF5", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 0 0 14px rgba(16,185,129,0.08)" }}>
          <CheckCircle size={36} color="#10B981"/>
        </div>
        <h2 style={{ fontSize:26, fontWeight:400, color:"var(--dark)", marginBottom:10, fontFamily:"'DM Serif Display',serif" }}>Request Sent!</h2>
        <p style={{ fontSize:13, color:"var(--mid)", lineHeight:1.75, marginBottom:12 }}>Your emergency request has been broadcast. Nearby donors will contact you soon.</p>
        <div style={{ padding:"8px 16px", background:"var(--bg)", borderRadius:"var(--r)", display:"inline-block", marginBottom:24 }}>
          <span style={{ fontSize:11, color:"var(--muted)" }}>Request ID: </span>
          <span style={{ fontSize:11, fontWeight:800, color:"var(--dark)", fontFamily:"monospace" }}>{done}</span>
        </div>
        <div><Btn onClick={()=>{setDone(null);setForm({bloodGroup:"",location:"",urgency:"Urgent",notes:"",contactPhone:""}); }} icon={RefreshCw}>Send Another</Btn></div>
      </div>
    </div>
  );
  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 11px", background:"var(--red-bg)", border:"1px solid var(--red-dim)", borderRadius:20, marginBottom:10 }}>
          <AlertTriangle size={11} color="var(--red)"/>
          <span style={{ fontSize:11, color:"var(--red)", fontWeight:700 }}>EMERGENCY REQUEST</span>
        </div>
        <h1 style={{ fontSize:22, fontWeight:400, color:"var(--dark)", fontFamily:"'DM Serif Display',serif" }}>Request Emergency Blood</h1>
        <p style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>Alert nearby donors instantly</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:18 }}>
        <form onSubmit={submit}>
          <Card style={{ marginBottom:16 }}>
            <h3 style={{ fontSize:13, fontWeight:700, color:"var(--dark)", marginBottom:14 }}>Urgency Level</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {Object.entries(urgMap).map(([key,cfg])=>(
                <button key={key} type="button" onClick={()=>upd("urgency",key)}
                  style={{ padding:"14px 8px", border:`2px solid ${form.urgency===key?cfg.color:"var(--line)"}`, borderRadius:"var(--r)", background:form.urgency===key?cfg.bg:"#fff", cursor:"pointer", textAlign:"center", transition:"all 0.15s", fontFamily:"inherit" }}>
                  <cfg.icon size={18} color={cfg.color} style={{ margin:"0 auto 8px", display:"block" }}/>
                  <p style={{ fontSize:13, fontWeight:700, color:cfg.color, marginBottom:3 }}>{key}</p>
                  <p style={{ fontSize:10, color:"var(--muted)", lineHeight:1.4 }}>{cfg.label}</p>
                </button>
              ))}
            </div>
          </Card>
          <Card style={{ marginBottom:16 }}>
            <h3 style={{ fontSize:13, fontWeight:700, color:"var(--dark)", marginBottom:14 }}>Blood Group Required <span style={{ color:"var(--red)" }}>*</span></h3>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {BLOOD_GROUPS.map(g=>(
                <button key={g} type="button" onClick={()=>upd("bloodGroup",g)}
                  style={{ padding:"8px 16px", border:`2px solid ${form.bloodGroup===g?"var(--red)":"var(--line)"}`, borderRadius:"var(--r)", background:form.bloodGroup===g?"var(--red-bg)":"#fff", color:form.bloodGroup===g?"var(--red)":"var(--dark)", fontWeight:form.bloodGroup===g?700:500, fontSize:13, cursor:"pointer", transition:"all 0.15s", fontFamily:"inherit" }}>
                  {g}
                </button>
              ))}
            </div>
          </Card>
          <Card>
            <Field label="Hospital / Location" placeholder="e.g. AIIMS Delhi, Ward 4" value={form.location} onChange={v=>upd("location",v)} required icon={MapPin}/>
            <Field label="Your Contact Phone" placeholder="+91 98765 43210" value={form.contactPhone} onChange={v=>upd("contactPhone",v)} icon={Phone}/>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--mid)", marginBottom:5 }}>Additional Notes</label>
              <textarea value={form.notes} onChange={e=>upd("notes",e.target.value)} rows={3} placeholder="Any details the donor should know…"
                style={{ width:"100%", padding:"10px 13px", border:"1.5px solid var(--line)", borderRadius:"var(--r)", fontSize:13, fontFamily:"inherit", resize:"vertical", color:"var(--dark)", background:"#fff" }}/>
            </div>
            {form.urgency==="Critical"&&<div style={{ padding:"11px 13px", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:"var(--r)", display:"flex", gap:8, marginBottom:14 }}>
              <AlertTriangle size={14} color="#EF4444" style={{ flexShrink:0, marginTop:1 }}/>
              <p style={{ fontSize:12, color:"#DC2626", lineHeight:1.6 }}>Critical requests are broadcast immediately to all available donors in your area.</p>
            </div>}
            <Btn type="submit" loading={loading} fullWidth size="lg" icon={Zap}>
              {form.urgency==="Critical"?"🚨 Send Critical Alert":"Send Emergency Request"}
            </Btn>
          </Card>
        </form>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card style={{ background:"var(--dark)", border:"none" }}>
            <h3 style={{ fontSize:13, fontWeight:700, color:"#F5F5F4", marginBottom:14 }}>Emergency Hotline</h3>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <div style={{ width:36, height:36, borderRadius:"var(--r-sm)", background:"rgba(191,24,39,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}><Phone size={15} color="#F87171"/></div>
              <div>
                <p style={{ fontSize:16, fontWeight:700, color:"#fff", fontFamily:"'DM Serif Display',serif" }}>1800-BLOOD</p>
                <p style={{ fontSize:10, color:"#57534E" }}>Available 24×7</p>
              </div>
            </div>
          </Card>
          <Card>
            <h3 style={{ fontSize:13, fontWeight:700, color:"var(--dark)", marginBottom:14 }}>What happens next?</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[[Zap,"var(--red)","Request broadcast to donors"],[Bell,"#F59E0B","Donors get instant notification"],[Phone,"#3B82F6","Donors contact you directly"],[Heart,"#10B981","Donation coordinated"]].map(([Icon,c,txt],i)=>(
                <div key={i} style={{ display:"flex", gap:9, alignItems:"flex-start" }}>
                  <div style={{ width:24, height:24, borderRadius:"var(--r-sm)", background:c+"18", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon size={12} color={c}/></div>
                  <p style={{ fontSize:12, color:"var(--mid)", lineHeight:1.6, marginTop:3 }}>{txt}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile() {
  const { user, setUser } = useAuth();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name:user?.name||"", email:user?.email||"", phone:user?.phone||"", location:user?.location||"", profession:user?.profession||"", bloodGroup:user?.bloodGroup||"" });
  const [saving, setSaving] = useState(false);
  const save = async() => {
    setSaving(true);
    try {
      await api.updateProfile(form);
      if(setUser) setUser(prev=>({...prev,...form}));
      addToast("Profile updated!","success");
      setEditing(false);
    } catch(err) { addToast(err.message||"Update failed","error"); }
    finally { setSaving(false); }
  };
  const fields=[{label:"Full Name",key:"name",icon:User},{label:"Email",key:"email",icon:Mail},{label:"Phone",key:"phone",icon:Phone},{label:"City",key:"location",icon:MapPin},{label:"Profession",key:"profession",icon:FileText},{label:"Blood Group",key:"bloodGroup",icon:Activity}];
  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:400, color:"var(--dark)", fontFamily:"'DM Serif Display',serif" }}>My Profile</h1>
        <p style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>Manage your account information</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:16 }}>
        <Card style={{ textAlign:"center" }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:"var(--red)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, fontWeight:700, color:"#fff", margin:"0 auto 14px", boxShadow:"0 6px 20px rgba(191,24,39,0.25)", fontFamily:"'DM Serif Display',serif" }}>
            {user?.name?.charAt(0).toUpperCase()||"U"}
          </div>
          <h2 style={{ fontSize:15, fontWeight:700, color:"var(--dark)", marginBottom:2, fontFamily:"'DM Serif Display',serif" }}>{user?.name}</h2>
          <p style={{ fontSize:11, color:"var(--muted)", marginBottom:14 }}>{user?.email}</p>
          <Badge type="success">Active Account</Badge>
          <div style={{ display:"flex", justifyContent:"space-around", marginTop:20, paddingTop:16, borderTop:"1px solid var(--line)" }}>
            {[{v:user?.donationCount||"0",l:"Donations"},{v:form.bloodGroup||"—",l:"Blood Type"}].map(s=>(
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:18, fontWeight:700, color:"var(--dark)", fontFamily:"'DM Serif Display',serif" }}>{s.v}</div>
                <div style={{ fontSize:10, color:"var(--muted)", marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, paddingBottom:14, borderBottom:"1px solid var(--line)" }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--dark)" }}>Account Information</h3>
            {editing?(
              <div style={{ display:"flex", gap:8 }}>
                <Btn variant="ghost" size="sm" onClick={()=>setEditing(false)} icon={X}>Cancel</Btn>
                <Btn size="sm" loading={saving} onClick={save} icon={Check}>Save</Btn>
              </div>
            ):(
              <Btn variant="ghost" size="sm" onClick={()=>setEditing(true)} icon={FileText}>Edit</Btn>
            )}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {fields.map(f=>(
              <div key={f.key}>
                {editing?(
                  <Field label={f.label} value={form[f.key]} onChange={v=>setForm(p=>({...p,[f.key]:v}))} icon={f.icon}/>
                ):(
                  <div style={{ padding:"11px 13px", background:"var(--bg)", borderRadius:"var(--r)", border:"1px solid var(--line)" }}>
                    <p style={{ fontSize:11, color:"var(--muted)", marginBottom:3 }}>{f.label}</p>
                    <p style={{ fontSize:13, fontWeight:600, color:"var(--dark)" }}>{form[f.key]||"Not set"}</p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ padding:"11px 13px", background:"var(--bg)", borderRadius:"var(--r)", border:"1px solid var(--line)" }}>
              <p style={{ fontSize:11, color:"var(--muted)", marginBottom:3 }}>Role</p>
              <p style={{ fontSize:13, fontWeight:600, color:"var(--dark)" }}>{user?.role||"Donor"}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────
const PROTECTED = ["dashboard","search","add-donor","emergency","profile"];
function Router() {
  const { isAuthenticated, logout, user } = useAuth();
  const [page, setPage] = useState("landing");
  const nav = (p) => { window.scrollTo(0,0); setPage(p); };
  const handleLogout = () => { logout(); setPage("landing"); };
  if(PROTECTED.includes(page)&&!isAuthenticated) return <Login onNav={nav}/>;
  if(page==="landing") return <Landing onNav={nav}/>;
  if(page==="login")   return <Login   onNav={nav}/>;
  if(page==="signup")  return <Signup  onNav={nav}/>;
  return (
    <DashShell page={page} onNav={nav} onLogout={handleLogout} user={user}>
      {page==="dashboard"&&<DashHome onNav={nav}/>}
      {page==="search"   &&<SearchDonor/>}
      {page==="add-donor"&&<AddDonor/>}
      {page==="emergency"&&<Emergency/>}
      {page==="profile"  &&<Profile/>}
    </DashShell>
  );
}

export default function App() {
  useEffect(()=>{
    const el=document.createElement("style");
    el.textContent=GLOBAL_CSS;
    document.head.appendChild(el);
    return()=>document.head.removeChild(el);
  },[]);
  return (
    <AuthProvider>
      <ToastProvider>
        <Router/>
      </ToastProvider>
    </AuthProvider>
  );
}
