#!/bin/bash

DATE=`date +'%Y%m%d%H%M'`
dstat -tcmdngyi --noheaders --tcp --udp --output dstat-$DATE.out
