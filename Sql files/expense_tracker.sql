create database expense_tracker;
use expense_tracker;

create table expenseDetails(
	expenseId int unsigned auto_increment primary key,
    
    expDescription text not null,
    expAmount decimal(10,2) not null,
    
    created_at timestamp default current_timestamp
);

select * from expenseDetails;