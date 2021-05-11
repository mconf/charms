variable "oci_tenancy_ocid" {}
variable "oci_compartment_ocid" {}
variable "oci_user_ocid" {}
variable "oci_fingerprint" {}
variable "oci_private_key_path" {}
variable "oci_private_key_password" {}

variable "ssh_key_path" {}

variable "num_instances" {
  type = number
  default = "0"
}
variable "shape" {
  type = string
  default = "VM.Standard.E3.Flex"
}
variable "shape_memory" {
  type = string
  default = "30"
}
variable "shape_ocpus" {
  type = string
  default = "8"
}
variable "shape_disk" {
  type = string
  default = "50"
}

variable "vcn_name" {
  type = string
  default = "VCN"
}
variable "subnet_name" {
  type = string
  default = "Subnet"
}
variable "internet_gateway_name" {
  type = string
  default = "Internet gateway"
}
