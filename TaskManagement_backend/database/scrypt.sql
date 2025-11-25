create database TaskManagement;

create table users (
    id  int primary key auto_increment,
    name varchar(100) not null,
    email varchar(100) unique not null,
    password varchar(100) not null
)

create table tasks (
    id int primary key auto_increment,
    user_id int,
    title varchar(255) not null,
    description text,
    status enum('pending', 'in_progress', 'completed') default 'pending',
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (user_id) references users(id) on delete cascade
);
