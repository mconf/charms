output "node_ip" {
  value = oci_core_instance.instance[*].public_ip
}

output "subnet_ocid" {
  value = oci_core_subnet.public_subnet.id
}
