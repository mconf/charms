# Mconfless

Runs automatized tests in BigBlueButton HTML5 client using Headless Chrome and
Puppeteer.

## Load testing

Bot users in a meeting that can:

  - send messages in public chat
  - write in shared notes
  - listen audio
  - share audio
  - share video
  - or simply join a meeting

### Requisites

Installed in your machine:

[juju](https://docs.jujucharms.com/2.3/en/reference-install)

*if you want to build the (./utils/dockerfiles/puppeteer-html5/)Dockerfile locally:*

[docker](https://docs.docker.com/install/linux/docker-ce/ubuntu)

Credentials to:

[Mconf at docker-hub](https://hub.docker.com/r/mconf/puppeteer)

[aws](https://docs.jujucharms.com/2.3/en/help-aws)

### Usage

#### Locally with docker

Use docker to pull or build puppeteer with headless-chrome
```shell
cd utils/dockerfiles/puppeteer
docker build -t mconf/puppeteer:html5 .
```
or
```shell
sudo docker login
sudo docker pull mconf/puppeteer:html5
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
 -t test  <lis|mic|cam|all>  default: join
 -h host  server url         default: https://test.bigbluebutton.org
 -r room  room name          default: "Test Room"
 -b bots  number of bots     default: 1
 -w wait  time between bots  default: 2000 (2 seconds)
 -l life  bot life span      default: 60000 (60 seconds)
```
Where 5 bots sharing michrophone at "Demo Meeting" with 5 seconds between bots be:
```shell
sudo ./run -t mic -r "Demo Meeting" -b 5 -w 5000
```

#### At AWS Cloud

Juju will automatically run the install script (./hooks/install) when it's
deployed. Make sure to include your Docker Hub credentials at:
```shell
sudo docker login ...
```
and set the docker image to use: (currently using *mconf/puppeteer:html5*)
```shell
sudo docker pull ...
```
Step by step instructions on using the charm:
```shell
juju bootstrap aws
juju set-model-constraints "instance-type=c3.4xlarge"
juju deploy ./xenial/mconfless --series xenial
```
Running the test scripts:
```shell
juju run "sudo /tmp/run" --all
```
the *run* script accept arguments:
```
 -t test  <lis|mic|cam|all>  default: join
 -h host  server url         default: https://test.bigbluebutton.org
 -r room  room name          default: "Test Room"
 -b bots  number of bots     default: 1
 -w wait  time between bots  default: 2000 (2 seconds)
 -l life  bot life span      default: 60000 (60 seconds)
```
Where 3 bots sharing camera at "Demo Meeting" with 10 seconds between bots be:
```shell
juju run "sudo /tmp/run -t cam -r \"Demo Meeting\" -b 3 -w 10000" --all
```
Juju uses as default a 5 minutes timeout to the _run_ command. Some tests may
last more than that so be sure to set a bigger timeout in those cases, e.g.:
```shell
juju run "sudo /tmp/run -b 100 -w 20000" --timeout 30m0s --all
```

##### Scale out usage

Add more machines:
```shell
juju add-unit --num-units 2 mconfless
```
Or remove it:
```shell
juju remove-unit mconfless/1
```

##### After usage

When running this charm at AWS, don't forget to destroy the whole environment
```shell
juju destroy-controller aws-us-east-1 --destroy-all-models
```
