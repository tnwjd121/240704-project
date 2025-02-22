package com.trip.festival;

import java.sql.Date;

//import com.trip.festival.image.AttachmentType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Festival {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer fesId;
	
	@Column(nullable = false)
	private String country, fesName, address, imageUrl, price, phoneNumber, host, countryName, region;
	
	@Column(length = 500)
	private String detail;
	 
	@Column(nullable = false)
	private Date startDate;
	
	@Column(nullable = false)
	private Date endDate;
}
