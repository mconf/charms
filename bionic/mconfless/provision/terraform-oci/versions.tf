terraform {
  required_providers {
    oci = {
      source = "hashicorp/oci"
      version = "~> 4.25.0"
    }
  }

  required_version = ">= 0.15"
}
