create database dyn_location;
use dyn_location;

create table country(
	country_id int auto_increment primary key,
    country_name varchar(30) not null
);

create table states(
	state_id int auto_increment primary key,
    country_id int,
    
    state_name varchar(30) not null,
    
    foreign key (country_id) references country(country_id)
);

create table citys(
	city_id int auto_increment primary key,
    state_id int,
    
    city_name varchar(30) not null,
    
    foreign key (state_id) references states(state_id)
);
select * from citys;	
create table temp(
    country_name varchar(70) not null,
    state_name varchar(70) not null,
    city_name varchar(70) not null
);
select * from states;

insert into states(country_id,state_name)
select distinct c.country_id , t.state_name from temp as t
join country as c on c.country_name = t.country_name;

insert into citys(state_id,city_name)
select distinct s.state_id , t.city_name from temp as t
join states as s on s.state_name = t.state_name;

load data local infile '/home/jay-patel/Internship Tasks/Node Js Practice/Dynamic DropDown/Countries, states cities - Sheet1.csv'
into table temp
fields terminated by ","
lines terminated by "\n"
ignore 1 rows;

set global local_infile = 1; 