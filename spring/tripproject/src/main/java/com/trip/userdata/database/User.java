package com.trip.userdata.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
	
	@Id
	private String ID;
	//id 중복이 아닐것
	
	private String Password;
	//비번
	
	private String Email;
	//이메일
	
	private String name;
	//유저 이름
	
	private boolean gender;
	//참이면 남자 거짓이면 여자
	
	private int age;
	//나이
	
	

}
