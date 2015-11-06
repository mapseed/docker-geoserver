#!/bin/bash
docker kill geoserver-geoexplorer
docker rm geoserver-geoexplorer
docker kill geoserver-postgis
docker rm geoserver-postgis

#DATA_DIR=~/geoserver_data
#if [ ! -d $DATA_DIR ]
#then
#    mkdir -p $DATA_DIR
#fi

docker run \
               --name="geoserver-postgis" \
               --restart=always \
               -t -d kartoza/postgis

docker run \
  --name=geoserver-geoexplorer \
  --restart=always \
  --link geoserver-postgis:postgis \
  -v /home/geoserver/geoserver_data:/opt/geoserver/data_dir \
  -v /home/duwamish/docker-geoserver/resources/conf/web.xml:/usr/local/tomcat/conf/web.xml \
  -p 8080:8080 \
  -d \
  -t lukeswart/geoserver-geoexplorer
