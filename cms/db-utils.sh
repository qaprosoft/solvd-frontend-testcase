#!/bin/bash

# @TODO Extend variables from environment
DB_CONTAINER='cms_db_1'
DB_NAME='craft'
DB_USER='craft'
DB_PASSWORD='craft'
BACKUP_NAME='backup.sql'

if [ "$1" == "--make-backup" ]
then
  docker exec -it $DB_CONTAINER sh -c "mysqldump --no-tablespaces -u $DB_USER --password=$DB_PASSWORD $DB_NAME > /tmp/$BACKUP_NAME"
  docker cp $DB_CONTAINER:/tmp/$BACKUP_NAME ./
  exit 0
fi

if [ "$1" == "--load-backup" ]
then
  docker cp ./$BACKUP_NAME $DB_CONTAINER:/tmp/ 
  docker exec -it $DB_CONTAINER sh -c "mysql -u $DB_USER --password=$DB_PASSWORD $DB_NAME < /tmp/$BACKUP_NAME"
  exit 0
fi
