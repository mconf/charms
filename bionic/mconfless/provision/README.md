# Ansible

First step is to setup the docker credentials. This is only needed if you're going to build the puppeteer-node image, otherwise the container is already in the image.

```bash
cd ansible/
cp .docker-auth.example .docker-auth
# insert your docker credentials on .docker-auth
```

# Initial terraform setup

If you're going to build an image with Packer, you're gonna need to setup the basics with terraform - essentially the network part.

Copy `.env` to `.env.local` and set it accordingly to your environment. You can leave `TF_VAR_oci_subnet_ocid` blank since it hasn't been created yet. Load the envs using:

```bash
source .env.local
```

Install Terraform from https://www.terraform.io/downloads.html, and init with:

```bash
cd terraform-oci/
terraform init
```

Then launch it, initially without setting up `num_instances`:

```bash
terraform plan -no-color -out="last_plan.bin" | tee last_plan.log
terraform apply "last_plan.bin"
```

Now copy the value of `subnet_ocid` to `.env.local` and reload the envs file.

# Packer

Packer is used to create the puppeteer-node image. Install Packer from https://www.packer.io/downloads

Build the imagem using:

```bash
cd packer-oci/
PACKER_LOG=1 packer build node.json
```

The image will be called `puppeteer-node`, and it will take aproximately 7 minutes to build.

# Launch

Back to Terraform, you can launch the puppeteer nodes with:

```bash
cd terraform-oci/
terraform plan -no-color -out="last_plan.bin" -var="num_instances=2" | tee last_plan.log
terraform apply "last_plan.bin"
```

# Destroy

After testing, make sure you destroy everything you built:

```bash
terraform destroy
```

It will destroy only what's in your Terraform state, so there isn't any concern regarding infrastructure created outside this scope.

# Tests

Scripts are located on `/home/ubuntu`.
