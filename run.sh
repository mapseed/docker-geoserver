#!/bin/bash
docker kill geoserver
docker rm geoserver
docker kill geoserver-postgis
docker rm geoserver-postgis

#DATA_DIR=~/geoserver_data
#if [ ! -d $DATA_DIR ]
#then
#    mkdir -p $DATA_DIR
#fi

docker run --name="geoserver-postgis" -t -d kartoza/postgis

docker run \
  --name=geoserver \
  --link geoserver-postgis:postgis \
  -v /home/lucas/geoserver_data:/opt/geoserver/data_dir \
  -v /home/lucas/docker-geoserver/resources/conf/web.xml:/usr/local/tomcat/conf/web.xml \
  -p 8080:8080 \
  -d \
  -t lukeswart/geoserver
