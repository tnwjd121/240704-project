package com.trip.userdata.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface UserRepo extends JpaRepository<User, String>{
	
	@Query(value = "SELECT * FROM user.user WHERE ID LIKE :id", nativeQuery = true)
	User findbyID(@Param("id") String Id);
	
	
	

}