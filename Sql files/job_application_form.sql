use job_applications;

create table applicants_information(
	applicant_id int unsigned auto_increment primary key,
    
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    email varchar(50) not null,
    designation varchar(30) not null,
    phone_number varchar(15) not null,
    address1 varchar(200) not null,
    address2 varchar(50),
    city varchar(35) not null,
    state varchar(35) not null,
    pincode varchar(10) not null,
    relationship_status varchar(10) not null,
    date_of_birth date not null,
    preferedCity1 varchar(30) not null,
    preferedCity2 varchar(30),
    preferedCity3 varchar(30),
    notice_period tinyint,
    expected_ctc decimal(4,2) not null,
    current_ctc decimal(4,2) not null,
    department varchar(30) not null,
    
    applied_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);
select * from applicants_information;
alter table applicants_information add column preferedCity2 varchar(30) after preferedCity1;

create table education_details(
	edu_id int unsigned auto_increment primary key,
    applicant_id int unsigned,
    
    course_name varchar(90) not null,
    passing_year varchar(6) not null,
    university_board varchar(50) not null,
    result decimal(5,2) not null,
    
    added_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (applicant_id) references applicants_information(applicant_id)
);
show create table education_details;
show create table work_experience;
alter table education_details add CONSTRAINT education_details_ibfk_1 FOREIGN KEY (`applicant_id`) REFERENCES `applicants_information` (`applicant_id`) on delete cascade;

create table work_experience(
	experience_id int unsigned auto_increment primary key,
    applicant_id int unsigned,
    
    company_name varchar(45) not null,
    from_date date not null,
    to_date date not null,
    annual_package decimal(4,2) not null,
    reason_to_leave text not null,
    ref_contact_number varchar(15) not null,
    ref_contact_name varchar(90) not null,
    
    foreign key (applicant_id) references applicants_information(applicant_id) on delete cascade
);
show create table work_experience;

create table lang_master(
	lang_id int unsigned auto_increment primary key,
    lang_name varchar(30) not null
);

create table language_known(
	langKnown_id int unsigned auto_increment primary key,
    applicant_id int unsigned,
    lang_id int unsigned,
    
    can_read boolean default false,
    can_write boolean default false,
    can_speak boolean default false,
    
    foreign key (applicant_id) references applicants_information(applicant_id),
    foreign key (lang_id) references lang_master(lang_id)
);
SELECT * FROM language_known;
alter table language_known add CONSTRAINT `language_known_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicants_information` (`applicant_id`) on delete cascade;

create table tech_master(
	tech_id int unsigned auto_increment primary key,
    tech_name varchar(30) not null
);

create table tech_known(
	techKnown_id int unsigned auto_increment primary key,
    applicant_id int unsigned,
    tech_id int unsigned,

    is_beginner boolean default false,
    is_intermediate boolean default false,
    is_expert boolean default false,
    
    foreign key (applicant_id) references applicants_information(applicant_id),
    foreign key (tech_id) references tech_master(tech_id)
);
select * from tech_known where applicant_id = 9;
alter table tech_known add CONSTRAINT `tech_known_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicants_information` (`applicant_id`) on delete cascade;

create table reference_contact(
	reference_id int unsigned auto_increment primary key,
    applicant_id int unsigned,
    
    ref_name varchar(50) not null,
    ref_contact_number varchar(15) not null,
    ref_relation varchar(35) not null,
    
    foreign key (applicant_id) references applicants_information(applicant_id)
);
show create table reference_contact;
alter table reference_contact add CONSTRAINT `reference_contact_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicants_information` (`applicant_id`) on delete cascade;

select * from applicants_information;