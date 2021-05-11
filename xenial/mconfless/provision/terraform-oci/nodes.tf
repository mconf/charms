data "oci_core_images" "images_focal" {
  compartment_id = var.oci_compartment_ocid
  operating_system = "Canonical Ubuntu"
  operating_system_version = "20.04"
  state = "AVAILABLE"
  sort_by = "DISPLAYNAME"
  sort_order = "DESC"
}

data "oci_core_images" "images_puppeteer" {
  compartment_id = var.oci_compartment_ocid
  display_name = "puppeteer-node"
  state = "AVAILABLE"
  sort_by = "TIMECREATED"
  sort_order = "DESC"
}

resource "oci_core_instance" "instance" {
  availability_domain = data.oci_identity_availability_domain.availability_domain.name
  compartment_id = var.oci_compartment_ocid
  shape = var.shape
  count = var.num_instances

  create_vnic_details {
    subnet_id = oci_core_subnet.public_subnet.id
    assign_public_ip = "true"
  }
  shape_config {
    memory_in_gbs = var.shape_memory
    ocpus = var.shape_ocpus
  }
  metadata = {
    ssh_authorized_keys = file(var.ssh_key_path)
  }
  source_details {
    source_id = data.oci_core_images.images_puppeteer.images[0].id
    source_type = "image"
    boot_volume_size_in_gbs = var.shape_disk
  }
  launch_options {
    network_type = "VFIO"
  }
}
