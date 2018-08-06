#!/bin/bash

DATE=`date +'%Y%m%d%H%M'`

ruby $(dirname "$0")/bbb-live-monitor.rb | tee monitor-$DATE.out

