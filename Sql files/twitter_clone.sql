create database twitter_clone;
use twitter_clone;

create table users(
	user_id int unsigned auto_increment primary key,
    
    firstName varchar(100) not null,
    lastName varchar(100) not null,
    userEmail varchar(120) not null unique,
    userPhone varchar(15) not null,
    userName varchar(120) not null unique,
    userPassword varchar(150) not null,
    bio text,
    profilePic text,
    coverPic text,
    
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table follow (
	follow_id int unsigned primary key auto_increment,
    
    following_id int unsigned not null,
    follower_id int unsigned not null,
    
    followed_at timestamp default current_timestamp,
    
    foreign key (following_id) references users(user_id) on delete cascade,
    foreign key (follower_id) references users(user_id) on delete cascade
); 

create table tweets (
	tweet_id int unsigned primary key auto_increment,
    
    user_id int unsigned not null,
    tweetContent varchar(280) not null,
    tweetImg text ,
    
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (user_id) references users(user_id) on delete cascade
);
create index index_updated_at on tweets (updated_at);

create table likes(
	like_id int unsigned auto_increment primary key,
    
    user_id int unsigned,
    tweet_id int unsigned,
    
    unique (user_id , tweet_id),
    created_at timestamp default current_timestamp,
    
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (tweet_id) references tweets(tweet_id) on delete cascade
);

create table retweets(
	retweet_id int unsigned auto_increment primary key,
    
    user_id int unsigned,
    tweet_id int unsigned,
    unique (user_id , tweet_id),
    
    created_at timestamp default current_timestamp,
    
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (tweet_id) references tweets(tweet_id) on delete cascade 
);

create table comments (
	comment_id int unsigned auto_increment primary key,
    
    user_id int unsigned,
    tweet_id int unsigned,
    commentText text not null,
    created_at timestamp default current_timestamp,
    
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (tweet_id) references tweets(tweet_id) on delete cascade 
);

select * from follow;
select * from tweets;
select * from users;
select * from likes;
select * from retweets;
select * from comments;

select u.userName, u.profilePic, u.firstName, u.lastName, t.tweet_id, t.tweetContent, t.tweetImg, t.updated_at, count(rt.tweet_id) as retweetCount, max(case when rt.user_id = ? then 1 else 0 end) as isRetweet
from tweets as t
join users as u on u.user_id = t.user_id
left join retweets as rt on t.tweet_id = rt.tweet_id
where t.user_id = ?
group by t.tweet_id
order by updated_at desc;

select u.userName , u.profilePic , t.tweet_id , c.commentText ,c.created_at
from tweets as t
join comments as c on c.tweet_id = t.tweet_id
join users as u on u.user_id = c.user_id
where t.tweet_id = 14; 

select 
	u.userName,u.profilePic,u.firstName,u.lastName,t.tweet_id,t.tweetContent,t.tweetImg,t.updated_at,
	(select count(*) from likes where tweet_id = t.tweet_id) AS likecount,
	(select count(*) from comments where tweet_id = t.tweet_id) AS commentCount,
	exists(select * from likes where user_id = 6 and tweet_id = t.tweet_id ) AS isLiked
from tweets AS t
join users AS u ON u.user_id = t.user_id
left join likes AS l ON t.tweet_id = l.tweet_id
where t.user_id = ? 
or t.user_id in (select following_id from follow where follower_id = ?)
group by t.tweet_id
order by t.updated_at desc;

delete from users where user_id = ?;