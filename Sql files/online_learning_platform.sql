use online_learning_platform;

create table student_info(
	er_no int primary key auto_increment,
    first_name varchar(35) not null,
	last_name varchar(35) not null,
    password_hashed text,
    phone_no varchar(15) not null,
    address text,
    pincode int,
    is_active boolean default true,
    
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table instructors(
		instructor_id int primary key auto_increment,
        first_name varchar(35) not null,
        last_name varchar(35) not null,
        password_hashed text,
        email varchar(40) not null,
        phone_no varchar(15) not null,
        address text,
        pincode int,
        bio text,
        is_active boolean default true,
        
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp
); 

create table courses(
	course_id int primary key auto_increment,
    instructor_id int,
    
    course_name varchar(30) not null,
    course_desc text,
    content_text text,
    content_image text,
    content_video text,
    
    foreign key (instructor_id) references instructors(instructor_id),
	constraint unique_course_instructor unique (course_id,instructor_id),
    
    added_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

alter table courses add column price decimal(8,2) default 0.00;
alter table courses add column course_duration int not null;

create table lessons(
	lesson_id int auto_increment primary key,
    course_id int,
    
    lesson_title text not null,
    lesson_number int not null ,check(lesson_number between 1 and 12),
    lesson_duration int not null,
    content_text text,
    content_image text,
    content_video text,
    
    added_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

alter table lessons add constraint fk_course foreign key (course_id) references courses(course_id);
alter table lessons drop column lesson_duration;

create table student_enrollment(
	enroll_id int auto_increment primary key,
    student_id int,
    course_id int,
    course_status enum('Completed','Active','Dropped'),
    
    foreign key (student_id)references student_info(er_no),
    foreign key (course_id)references courses(course_id),
    unique key (student_id,course_id)
);

create table payments(
	payment_id int auto_increment primary key,
    transaction_id varchar(75) ,
    student_id int not null,
    course_id int not null,
    payment_status enum('Completed','Pending','Failed') default 'Pending',
    
    transaction_at timestamp default current_timestamp,
    
    foreign key (student_id) references student_info(er_no),
    foreign key (course_id) references courses(course_id)
); 

create table lesson_progress(
	progress_id int auto_increment primary key,
    lesson_id int,
    student_id int,
    progress_status enum('Completed','Pending','Ongoing'),
    last_accessed timestamp default current_timestamp on update current_timestamp,
    
    foreign key (lesson_id) references lessons(lesson_id),
    foreign key (student_id) references student_info(er_no)
);

create table questions(
	question_id int auto_increment primary key,
    course_id int ,
    
    question_title varchar(50) not null,
    option_a varchar(30) not null,
    option_b varchar(30) not null,
    option_c varchar(30) not null,
    option_d varchar(30) not null,
    option_e varchar(30),
    option_f varchar(30),
    correct_answer varchar(30),
    quetion_mark  int not null,
    negative_mark int unsigned default 0,
    
    foreign key (course_id) references courses(course_id)
);

alter table questions add constraint fk_18 foreign key (exam_id) references exams (exam_id);

create table exams(
	exam_id int auto_increment primary key,
    course_id int,
    
    is_negative_marking boolean default false,
    total_marks int not null,
    
    foreign key (course_id) references courses(course_id)
);

alter table exams add created_at timestamp default current_timestamp;
alter table exams add passing_mark smallint after total_marks;

create table results(
	result_id int auto_increment primary key,
    student_id int,
    exam_id int,
    course_id int,
    
    total_attempt smallint default 1,
    total_marks smallint not null,
    
    foreign key (exam_id) references exams(exam_id),
    foreign key (course_id) references courses(course_id),
    foreign key (student_id) references student_info(er_no),
    
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

alter table results rename column total_marks to marks_obtained;
alter table results add column is_pass enum('Pass','Fail') not null after marks_obtained;

create table cretificates(
	cretificate_id varchar(80) primary key,
    student_id int,
    course_id int,
    instructor_id int,
    result_id int,
    
    foreign key (student_id) references student_info(er_no),
    foreign key (course_id) references courses(course_id),
    foreign key (instructor_id) references instructors(instructor_id),
    foreign key (result_id) references results(result_id),
    
    created_at timestamp default current_timestamp
);
