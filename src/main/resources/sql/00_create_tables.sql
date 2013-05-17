DROP SCHEMA  IF EXISTS  xpsearchliang_schema  CASCADE;

CREATE SCHEMA xpsearchliang_schema AUTHORIZATION xpsearchliang_user;

SET search_path TO xpsearchliang_schema;

CREATE TABLE post
(
  id bigint NOT NULL,
  acceptedanswerid bigint,
  answercount integer,
  body character varying(40960),
  commentcount integer,
  communityowneddate timestamp without time zone,
  creationdate timestamp without time zone,
  favoritecount integer,
  lastactivitydate timestamp without time zone,
  lasteditdate timestamp without time zone,
  lasteditoruserid bigint,
  owneruserid bigint,
  parentid bigint,
  posttypeid bigint,
  score integer,
  tags character varying(2048),
  title character varying(2048),
  viewcount integer,
  CONSTRAINT post_pkey PRIMARY KEY (id )
);

CREATE TABLE comment
(
  id bigint NOT NULL,
  postId bigInt,
  userId bigInt,
  score integer,
  text character varying(20480),
  CONSTRAINT comment_pkey PRIMARY KEY (id )
);

CREATE TABLE users
(
  id bigint NOT NULL,
  displayName char varying(256),
  CONSTRAINT user_pkey PRIMARY KEY (id )
);

CREATE TABLE posthistory
(
  id bigint NOT NULL,
  postHistoryTypeId int,
  postId bigint not null,
  userId bigint not null,
  text char varying(10240),
  CONSTRAINT posthistory_pkey PRIMARY KEY (id )
);

CREATE TABLE vote
(
  id bigint NOT NULL,
  voteTypeId int,
  postId bigint not null,
  CONSTRAINT vote_pkey PRIMARY KEY (id )
);


CREATE TABLE userreluser
(
  id bigserial NOT NULL,
  userid bigint,
  relid bigint not null,
  CONSTRAINT userreluser_pkey PRIMARY KEY (id )
) ;

-- get data from select
insert into userreluser(userid, relid)
  select distinct on (c.id, d.id) c.id , d.id relif from post a
    inner join  comment b on a.id = b.postid
    inner join users c on c.id = a.owneruserid
    inner join users d on d.id = b.userid;

