resource "oci_core_vcn" "vcn" {
  cidr_blocks = [ "10.0.0.0/16" ]
  compartment_id = var.oci_compartment_ocid
  display_name = var.vcn_name
  is_ipv6enabled = true
}

resource "oci_core_subnet" "public_subnet" {
  cidr_block = "10.0.0.0/16"
  compartment_id = var.oci_compartment_ocid
  vcn_id = oci_core_vcn.vcn.id
  display_name = var.subnet_name
  ipv6cidr_block = cidrsubnet(oci_core_vcn.vcn.ipv6cidr_blocks[0], 8, 0)
}

resource "oci_core_internet_gateway" "internet_gateway" {
  compartment_id = var.oci_compartment_ocid
  vcn_id = oci_core_vcn.vcn.id
  display_name = var.internet_gateway_name
}

resource "oci_core_default_route_table" "route_table" {
  manage_default_resource_id = oci_core_vcn.vcn.default_route_table_id

  route_rules {
    network_entity_id = oci_core_internet_gateway.internet_gateway.id
    destination = "0.0.0.0/0"
    destination_type = "CIDR_BLOCK"
  }

  route_rules {
    network_entity_id = oci_core_internet_gateway.internet_gateway.id
    destination = "::/0"
    destination_type = "CIDR_BLOCK"
  }
}

resource "oci_core_route_table_attachment" "route_table_attachment" {
  subnet_id = oci_core_subnet.public_subnet.id
  route_table_id = oci_core_default_route_table.route_table.id
}

resource "oci_core_default_security_list" "default_security_list" {
  manage_default_resource_id = oci_core_vcn.vcn.default_security_list_id

  egress_security_rules {
    destination = "0.0.0.0/0"
    protocol = "all"
    stateless = false
  }
  egress_security_rules {
    destination = "::/0"
    protocol = "all"
    stateless = false
  }

  ingress_security_rules {
    source = "0.0.0.0/0"
    protocol = 6
    stateless = false
    tcp_options {
      max = 22
      min = 22
    }
  }
  ingress_security_rules {
    source = "::/0"
    protocol = 6
    stateless = false
    tcp_options {
      max = 22
      min = 22
    }
  }
  ingress_security_rules {
    source = "10.0.0.0/16"
    protocol = 1
    stateless = false
    icmp_options {
      code = -1
      type = 3
    }
  }
  ingress_security_rules {
    source = "::/0"
    protocol = 58
    stateless = false
    icmp_options {
      code = 0
      type = 2
    }
  }
  ingress_security_rules {
    source = "0.0.0.0/0"
    protocol = 1
    stateless = false
    icmp_options {
      code = 4
      type = 3
    }
  }
}
