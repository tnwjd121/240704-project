package com.trip.userdata.ctrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserService uService;
	
	//로그인 참이면 성공 거짓이면 실패
    @GetMapping("/User/Login/id={Id}&pw={Pw}")
    public Boolean Login(@PathVariable("Id") String Id, @PathVariable("Pw") String Pw) {
    	return uService.Login(Id, Pw);
    }
    
    //유저 정보 확인
    @GetMapping("/User/UserInfo/id={Id}")
    public UserDto UserInfo(@PathVariable("Id") String Id) {
    	return uService.UserInfo(Id);
    }
    
    //회원가입 참이면 성공 거짓이면 실패
    @PostMapping("/User/join")
    public Boolean UserJoin(@RequestBody UserDto user) {
    	return uService.UserJoin(user);
    }
    
    //회원 탈퇴
    @DeleteMapping("/User/unsubscribe/id={Id}&pw={Pw}")
    public Boolean UserUnsub(@PathVariable("Id") String Id, @PathVariable("Pw") String Pw) {
    	return uService.UserUnsub(Id, Pw);
    }
    
	@PutMapping("/User/update")
    public Boolean User(@RequestBody UserDto user) {
    	return uService.UserUpdate(user);
    }

	
}
