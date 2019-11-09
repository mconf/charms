# Mconfless

Runs automated tests for BigBlueButton HTML5 client using Puppeteer.

## Load testing

Bot users in a meeting that can:

  - join meeting `-t join`
  - listen audio `-t listen`
  - share microphone `-t microphone`
  - share video (VP8 only) `-t video`

### Requirements

Installed in your machine:

[juju](https://docs.jujucharms.com/2.3/en/reference-install)

Credentials to:

[aws](https://docs.jujucharms.com/2.3/en/help-aws)

### Usage

#### Locally

```shell
cd CHARMS_PATH
sudo juju bootstrap localhost lxd-controller
sudo juju deploy ./bionic/mconfless --series bionic
sudo juju run "./run" --all
```

```shell
sudo juju add-unit --num-units 1 mconfless
```

```shell
sudo juju remove-unit mconfless/1
```

```shell
sudo juju destroy-controller lxd-controller --destroy-all-models
```

#### At AWS Cloud

```shell
cd CHARMS_PATH
sudo juju bootstrap aws
sudo juju set-model-constraints "instance-type=c3.4xlarge"
sudo juju deploy ./bionic/mconfless --series bionic
sudo juju run "./run" --all
```

```shell
sudo juju add-unit --num-units 1 mconfless
```

```shell
sudo juju remove-unit mconfless/1
```

```shell
sudo juju destroy-controller aws-us-east-1 --destroy-all-models
```
