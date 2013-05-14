#!/bin/sh
psql -U postgres -d xpsearchliang_db -w postgres -h localhost -f /home/lwf/mywork/XpSearchLiang/src/main/resources/sql/00_create_tables.sql
psql -U postgres -d xpsearchliang_db -w postgres -h localhost -f /home/lwf/mywork/XpSearchLiang/src/main/resources/sql/01_create_ts_indexes.sql
psql -U postgres -d xpsearchliang_db -w postgres -h localhost -f /home/lwf/mywork/XpSearchLiang/src/main/resources/sql/02_create_triggers.sql