SET search_path TO xpsearchliang_schema;
-- create tsvector col and index

ALTER TABLE post ADD COLUMN tsv tsvector;
UPDATE post SET tsv =
    setweight(to_tsvector(coalesce(title,'')), 'A') ||
    setweight(to_tsvector(coalesce(body,'')), 'B')  ||
    setweight(to_tsvector(coalesce(tags,'')), 'C');
CREATE INDEX post_tsv_idx ON post USING gin(tsv);

ALTER TABLE comment ADD COLUMN tsv tsvector;
UPDATE comment SET tsv =
  setweight(to_tsvector(coalesce(text,'')), 'D');
CREATE INDEX comment_tsv_idx ON comment USING gin(tsv);


ALTER TABLE posthistory ADD COLUMN tsv tsvector;
UPDATE posthistory SET tsv =
  setweight(to_tsvector(coalesce(text,'')), 'E');

CREATE INDEX posthistory_tsv_idx ON posthistory_tsv_idx USING gin(tsv);