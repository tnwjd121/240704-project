package com.trip.festival.image;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {
	
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Attachment> attachedFiles = new ArrayList<>();

}
