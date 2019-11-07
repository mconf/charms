# Mconftec Juju charms

Juju is an open source, application and service modelling tool from Ubuntu that
helps you deploy, manage and scale your applications on any cloud.

Charms are sets of scripts for deploying and operating software. With event
handling built in, they can declare interfaces that fit charms for other
services, so relationships can be formed.

## Install Juju

[Juju reference install](https://docs.jujucharms.com/2.3/en/reference-install)

## Get these charms

```shell
git clone https://github.com/mconftec/charms
```

## Or write your own

[Juju charm writing](https://docs.jujucharms.com/2.3/en/authors-charm-writing)

## Run Juju's charm

Juju offers a bootstrap interface for running charms in several cloud services.
We will explore LXD for local testing the scripts and Amazon Web Service
for running the tests.

[Juju in cloud](https://docs.jujucharms.com/2.3/en/clouds)

### Locally

[Running Juju with LXD](https://docs.jujucharms.com/2.3/en/clouds-LXD)

```shell
cd CHARMS_PATH
sudo juju bootstrap localhost lxd-controller
sudo juju deploy ./bionic/mconfless --series bionic
sudo juju run "./run" --all
```

```shell
sudo juju destroy-controller lxd-controller --destroy-all-models
```

### AWS Cloud

[Running Juju with AWS](https://docs.jujucharms.com/2.3/en/help-aws)

```shell
cd CHARMS_PATH
sudo juju bootstrap aws
sudo juju set-model-constraints "instance-type=c3.4xlarge"
sudo juju deploy ./bionic/mconfless --series bionic
sudo juju run "./run" --all
```

```shell
juju destroy-controller aws-us-east-1 --destroy-all-models
```