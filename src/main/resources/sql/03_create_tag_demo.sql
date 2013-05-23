
SET search_path TO xpsearchliang_schema;
truncate table tag;
truncate table tagrelpost;

INSERT INTO tag (tagName) VALUES ('email');
INSERT INTO tag (tagName) VALUES ('java');
INSERT INTO tag (tagName) VALUES ('android');
INSERT INTO tag (tagName) VALUES ('facebook');
INSERT INTO tag (tagName) VALUES ('google');
INSERT INTO tag (tagName) VALUES ('facebook');
INSERT INTO tag (tagName) VALUES ('vb');
INSERT INTO tag (tagName) VALUES ('vc');
INSERT INTO tag (tagName) VALUES ('jquery');
INSERT INTO tag (tagName) VALUES ('javascript');
INSERT INTO tag (tagName) VALUES ('template');
INSERT INTO tag (tagName) VALUES ('spring');
INSERT INTO tag (tagName) VALUES ('hibernate');
INSERT INTO tag (tagName) VALUES ('vaadin');
INSERT INTO tag (tagName) VALUES ('gwt');
INSERT INTO tag (tagName) VALUES ('nodejs');
INSERT INTO tag (tagName) VALUES ('ip');
INSERT INTO tag (tagName) VALUES ('scala');
INSERT INTO tag (tagName) VALUES ('grails');
INSERT INTO tag (tagName) VALUES ('ruby');
INSERT INTO tag (tagName) VALUES ('rails');
INSERT INTO tag (tagName) VALUES ('groovy');
INSERT INTO tag (tagName) VALUES ('maven');
INSERT INTO tag (tagName) VALUES ('ant');
INSERT INTO tag (tagName) VALUES ('skype');
INSERT INTO tag (tagName) VALUES ('hotmail');
INSERT INTO tag (tagName) VALUES ('struts2');
INSERT INTO tag (tagName) VALUES ('britejs');
INSERT INTO tag (tagName) VALUES ('microsoft');
INSERT INTO tag (tagName) VALUES ('borland');
INSERT INTO tag (tagName) VALUES ('extjs');


-- get data from select
insert into userreluser(userid, relid)
  select distinct on (c.id, d.id) c.id , d.id relif from post a
    inner join  comment b on a.id = b.postid
    inner join users c on c.id = a.owneruserid
    inner join users d on d.id = b.userid;
