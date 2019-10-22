# Mconfless

Runs automatized tests in BigBlueButton HTML5 client using Headless Chrome and
Puppeteer.

## Load testing

Bot users in a meeting that can:

  - listen audio
  - share audio
  - share video
  - or simply join a meeting

### Requisites

Installed in your machine:

[juju](https://docs.jujucharms.com/2.3/en/reference-install)

Credentials to:

[aws](https://docs.jujucharms.com/2.3/en/help-aws)

### Usage

#### At AWS Cloud

Step by step instructions on using the charm:
```shell
juju bootstrap aws
juju set-model-constraints "instance-type=c3.4xlarge"
juju deploy ./bionic/mconfless --series bionic
```
Running the test scripts:
```shell
juju run "sudo mconfless" --all
```
the *run* script accept arguments:
```
 -t test  test script        default: join.js
 -h host  server url         default: https://test-live220.dev.mconf.com
 -r room  room name          default: "Demo Meeting"
 -b bots  number of bots     default: 1
 -w wait  time between bots  default: 2000 (2 seconds)
 -l life  bot life span      default: 60000 (60 seconds)
```
Where 3 bots sharing camera with 10 seconds between bots be:
```shell
juju run "sudo mconfless -t video.js -b 3 -w 10000" --all
```
Juju uses as default a 5 minutes timeout to the _run_ command. Some tests may
last more than that so be sure to set a bigger timeout in those cases, e.g.:
```shell
juju run "sudo mconfless -b 100 -w 20000" --timeout 30m0s --all
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
