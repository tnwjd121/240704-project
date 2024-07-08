package com.trip.userdata.ctrl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.trip.userdata.database.User;
import com.trip.userdata.database.UserRepo;

@Service
@CrossOrigin
public class UserService {
	
	@Autowired
	UserRepo uRepo;
	
	
	//로그인을 시도하면 성공/실패를 보내줌
	public boolean Login(String Id, String Password){
		if (uRepo.findbyID(Id)!=null) {
		
			if (Password.equals(uRepo.findbyID(Id).getPassword())) {
				return true;
			}else {
				return false;
			}
		} else {
			return false;
		}
		
	};
	
	//유저 정보 확인
	public UserDto UserInfo(String Id) {
		User a = uRepo.findbyID(Id);
		UserDto b = new UserDto();
		
		b.setID(Id);
		b.setEmail(a.getEmail());
		b.setName(a.getName());
		b.setGender(a.isGender());
		b.setAge(a.getAge());
		
		return b;
	}
	
	//회원가입
	public Boolean UserJoin(UserDto user) {
		if (user.getID() == null) {
	        throw new IllegalArgumentException("User ID must not be null");
	    }
		
		
		Optional<User> existingUser = uRepo.findById(user.getID());
		 
		if (existingUser.isEmpty()) {
			User a = new User();
			a.setID(user.getID());
			a.setPassword(user.getPassword());
			a.setEmail(user.getEmail());
			a.setName(user.getName());
			a.setGender(user.isGender());
			a.setAge(user.getAge());
			
			uRepo.save(a);
			return true;
		}else {
			return false;
		}
		
	}
	
	//회원 탈퇴
	public Boolean UserUnsub(String Id, String Pw) {
		User a = new User();
		if (uRepo.findbyID(Id)!=null) {
			a = uRepo.findbyID(Id);
		
			if (Pw == a.getPassword()) {
				uRepo.delete(a);
				return true;
			}else {
				return false;
			}
		} else {
			return false;
		}
		
	}
	
	//회원 정보 업데이트
		public Boolean UserUpdate(UserDto user) {
			User a = new User();
			if (uRepo.findbyID(user.getID())!=null) {
				
				a.setPassword(user.getPassword());
				a.setEmail(user.getEmail());
				a.setName(user.getName());
				a.setGender(user.isGender());
				a.setAge(user.getAge());
				
				uRepo.save(a);
				return true;
			}else {
				return false;
			}
			
		}
	
	
	
}
