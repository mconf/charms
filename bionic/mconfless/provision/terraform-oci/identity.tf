data "oci_identity_availability_domain" "availability_domain" {
  compartment_id = var.oci_compartment_ocid
  ad_number = "1"
}
