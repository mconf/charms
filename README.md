# Mconftec Juju charms

Juju is an open source, application and service modelling tool from Ubuntu that
helps you deploy, manage and scale your applications on any cloud.

Charms are sets of scripts for deploying and operating software. With event
handling built in, they can declare interfaces that fit charms for other
services, so relationships can be formed.

## Install Juju

[install]: https://docs.jujucharms.com/2.3/en/reference-install

## Get these charms

```shell
git clone https://github.com/mconftec/charms
```

## Or write your own

[charm-writing]: https://docs.jujucharms.com/2.3/en/authors-charm-writing

## Run Juju's charm

Juju offers a bootstrap interface for running charms in several cloud services.
We will explore LXD for local testing the scripts and Amazon Web Service
for running the tests.
[clouds]: https://docs.jujucharms.com/2.3/en/clouds

### Locally

[lxd]: https://docs.jujucharms.com/2.3/en/clouds-LXD
*notice that LXD environment can be tricky when trying to run other
containerized applications*

### AWS Cloud

[aws]: https://docs.jujucharms.com/2.3/en/help-aws
