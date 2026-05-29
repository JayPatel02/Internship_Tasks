use job_applications_v2;

select * from option_master;
select * from select_master;

insert into select_master (field_name,tag_name) values("Courses","select");
insert into select_master (field_name,tag_name) values("Departments","select");

insert into option_master (select_id,option_value,option_label) values (6,"10","10th"),(6,"12","12th"),(6,"btech","BTech"),(6,"mtech","MTech") ;
insert into option_master (select_id,option_value,option_label) values (7,"Development","Development"),(7,"Design","Design"),(7,"Marketing","Marketing");
insert into option_master (select_id,option_value,option_label) values (1,"Other","Other");

create table tech_known_v2 like job_applications.tech_known;

select * from  tech_known_v2;

alter table tech_known_v2 drop column tech_id;
alter table  tech_known_v2 add column tech_name varchar(100) after applicant_id;

select * from language_known_v2;

show create table reference_contact_v2;

alter table reference_contact_v2 add constraint fk_refCon foreign key  (applicant_id) references applicants_information_v2(applicant_id) on delete cascade;