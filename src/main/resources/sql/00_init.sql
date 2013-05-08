DROP SCHEMA  IF EXISTS  xpsearchliang_schema  CASCADE;

CREATE SCHEMA xpsearchliang_schema AUTHORIZATION xpsearchliang_user;

SET search_path TO xpsearchliang_schema;

CREATE TABLE post
(
  id bigint NOT NULL,
  acceptedanswerid bigint,
  answercount integer,
  body character varying(2048),
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
  tags character varying(1024),
  title character varying(1024),
  viewcount integer,
  CONSTRAINT post_pkey PRIMARY KEY (id )
);

CREATE INDEX post_idx ON post USING gin(to_tsvector('english', title||body||tags));