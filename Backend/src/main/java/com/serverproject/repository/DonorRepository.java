package com.serverproject.repository;

import com.serverproject.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DonorRepository extends JpaRepository<Donor, Long> {


    List<Donor> findByBloodGroupAndCity(String bloodGroup, String city);


    List<Donor> findByBloodGroup(String bloodGroup);


    List<Donor> findByCity(String city);


    List<Donor> findByAvailable(boolean available);


    List<Donor> findByBloodGroupAndCityAndAvailable(String bloodGroup, String city, boolean available);

}