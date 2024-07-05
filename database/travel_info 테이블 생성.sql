create table travel_info (
	  id integer(10) primary key,
	  country varchar(50) not null,
    region varchar(50) not null,
    category varchar(50) not null,
    placeName varchar(100) not null,
    address varchar(100) not null,
    description varchar(200) not null,
    photoUrl varchar(200) not null
);