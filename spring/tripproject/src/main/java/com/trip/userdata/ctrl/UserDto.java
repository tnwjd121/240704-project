package com.trip.userdata.ctrl;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonProperty;

@Getter
@Setter
@ToString
public class UserDto {

    @JsonProperty("ID")
    private String ID;

    @JsonProperty("Password")
    private String Password;

    @JsonProperty("Email")
    private String Email;

    @JsonProperty("name")
    private String name;

    @JsonProperty("gender")
    private boolean gender;

    @JsonProperty("age")
    private int age;
}

