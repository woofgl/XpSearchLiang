
SET search_path TO xpsearchliang_schema;

CREATE FUNCTION post_trigger() RETURNS trigger AS $$
begin
  new.tsv :=
     setweight(to_tsvector('english', coalesce(new.title,'')), 'A') ||
     setweight(to_tsvector('english', coalesce(new.body,'')), 'B') ||
     setweight(to_tsvector('english', coalesce(new.tags,'')), 'C');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON post FOR EACH ROW EXECUTE PROCEDURE post_trigger();


CREATE FUNCTION comment_trigger() RETURNS trigger AS $$
begin
  new.tsv :=
     setweight(to_tsvector('english', coalesce(new.text,'')), 'D');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON comment FOR EACH ROW EXECUTE PROCEDURE comment_trigger();

CREATE FUNCTION users_trigger() RETURNS trigger AS $$
begin
  new.tsv :=
     setweight(to_tsvector('english', coalesce(new.displayname,'')), 'D');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON users FOR EACH ROW EXECUTE PROCEDURE users_trigger();


CREATE FUNCTION tag_trigger() RETURNS trigger AS $$
begin
  insert into tagrelpost(tagid, postid)
    select id, new.id from post where tsv @@ to_tsquery(new.tagName);

  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tagupdate AFTER INSERT OR UPDATE
ON tag FOR EACH ROW EXECUTE PROCEDURE tag_trigger();