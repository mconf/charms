# Flashinar

Runs automatized tests in BigBlueButton Flash client using Chrome and Puppeteer.

## Requisites

Installed in your machine:

[juju](https://docs.jujucharms.com/2.3/en/reference-install)

*if you want to build the (./utils/dockerfiles/puppeteer-flash/)Dockerfile locally:*

[docker](https://docs.docker.com/install/linux/docker-ce/ubuntu)

Credentials to:

[Mconftec at docker-hub](https://hub.docker.com/r/mconftec)

[aws](https://docs.jujucharms.com/2.3/en/help-aws)

## Usage

### Locally with docker

Use docker to pull or build puppeteer with chrome
```shell
cd utils/dockerfiles/puppeteer-flash
docker build -t mconftec/puppeteer:flash .
```
or
```shell
sudo docker login
sudo docker pull mconftec/puppeteer:flash
```
Copy the scripts to your local /tmp directory
```shell
cp -r utils/scripts /tmp
```
and run it
```shell
cd hooks
sudo ./run
```
the *run* script accept arguments:
```
 -h host  server url         default: https://sip.dev.mconf.com
 -r room  room name          default: "Test Room"
 -b bots  number of bots     default: 1
 -w wait  time between bots  default: 10000 (10 seconds)
 -l life  bot life span      default: 60000 (60 seconds)
```
Where 5 bots sharing michrophone at "Demo Meeting" with 5 seconds between bots be:
```shell
sudo ./run -t mic -r "Demo Meeting" -b 5 -w 5000
```

### At AWS Cloud

Juju will automatically run the install script (./hooks/install) when it's
deployed. Make sure to include your Docker Hub credentials at:
```shell
sudo docker login ...
```
and set the docker image to use: (currently using *mconftec/puppeteer:flash*)
```shell
sudo docker pull ...
```
Step by step instructions on using the charm:
```shell
juju bootstrap aws
juju set-model-constraints "instance-type=c3.4xlarge"
juju deploy ./xenial/flashinar --series xenial
```
Running the test scripts:
```shell
juju run "sudo /tmp/run" --all
```
the *run* script accept arguments:
```
 -h host  server url         default: https://sip.dev.mconf.com
 -b bots  number of bots     default: 1
 -w wait  time between bots  default: 15000 (15 seconds)
 -l life  bot life span      default: 60000 (60 seconds)
```
Where 3 bots with 20 seconds between bots be:
```shell
juju run "sudo /tmp/run -b 3 -w 20000" --all
```
Juju uses as default a 5 minutes timeout to the _run_ command. Some tests may
last more than that so be sure to set a bigger timeout in those cases
```shell
juju run "sudo /tmp/run -b 100 -w 20000" --timeout 30m0s --all
```

#### Scale out usage

Add more machines:
```shell
juju add-unit --num-units 2 flashinar
```
Or remove it:
```shell
juju remove-unit flashinar/1
```

#### After usage

When running this charm at AWS, don't forget to destroy the whole environment
```shell
juju destroy-controller aws-us-east-1 --destroy-all-models
```

## About google-chrome-config.tar.gz

When running Flash in Chrome, the user must install and allow Pepper Flash to execute.
To make it simple to the test scripts you can manually install and allow Pepper Flash
in all server you want to test and then compress it to be copied when building the docker image.

### How to generate this directory in xenial:

  1. create a pptruser in your local machine and log in using the UI
  2. open Google Chrome and join the Flash client in the server to be tested
  3. Chrome will install PepperFlash and you will have to restart the browser
  4. repeat step number 2 and allow the Flash app to run

At this point all configuration files you will need are ready.
You can check it's location browsing chrome://version in pptruser Chrome:
```
Flash: 30.0.0.134 /home/pptruser/.config/google-chrome/PepperFlash/30.0.0.134/libpepflashplayer.so
User Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36
Command Line: /usr/bin/google-chrome-stable --flag-switches-begin --flag-switches-end
Executable Path: /opt/google/chrome/google-chrome
Profile Path: /home/pptruser/.config/google-chrome/Default
```
Set Pepper Flash version and path in the test script (utils/scripts/join.js):
```
'--ppapi-flash-version=30.0.0.134',
'--ppapi-flash-path=/home/pptruser/.config/google-chrome/PepperFlash/30.0.0.134/libpepflashplayer.so',
```
Also, set Chrome user-data-dir to be the path of your config dir:
```
'--user-data-dir=/home/pptruser/.config/google-chrome'
```
Compress this user-data-dir and replace it in utils/dockerfiles/puppeteer-flash/config:
```shell
tar -czvf google-chrome-config.tar.gz /home/pptruser/.config/google-chrome
```
And replace the original google-chrome-config.tar.gz with this.
Make sure your original user has access to read this file since it was made by the pptruser.
