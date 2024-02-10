#!/bin/bash
. ./variables.sh

#All files

echo ${dev_public_ec2_ip}
echo ${dev_private_ec2_ip}
ssh -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem ubuntu@${dev_public_ec2_ip} "sudo rm -r schema/"
scp -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -r /home/marte/bod-projects/company/company-data-warehouse/CubeJS/schema/ ubuntu@${dev_public_ec2_ip}:~/
ssh -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -tt ubuntu@${dev_public_ec2_ip} ssh -i cube-dev.pem ubuntu@${dev_private_ec2_ip} "sudo rm -r -f schema/"
ssh -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -tt ubuntu@${dev_public_ec2_ip} ssh -i cube-dev.pem ubuntu@${dev_private_ec2_ip} "sudo rm -r -f efs-mount-point/schema/"
ssh -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -tt ubuntu@${dev_public_ec2_ip} scp -i cube-dev.pem -r schema/ ubuntu@${dev_private_ec2_ip}:~/
ssh -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -tt ubuntu@${dev_public_ec2_ip} ssh -i cube-dev.pem ubuntu@${dev_private_ec2_ip} sudo cp -r schema/ efs-mount-point/
# kubectl delete --all pods --namespace=cube --context=company-eks-data-dev

#One file

# file_name=pmsAccounting.js
# file_location=raw
 
# echo ${dev_public_ec2_ip}
# echo ${dev_private_ec2_ip}
# scp -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -r /home/marte/bod-projects/company/company-data-warehouse/CubeJS/schema/${file_location}/${file_name} ubuntu@${dev_public_ec2_ip}:~/
# ssh -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -tt ubuntu@${dev_public_ec2_ip} ssh -i cube-dev.pem ubuntu@${dev_private_ec2_ip} "sudo rm -r -f schema/"${file_location}/${file_name}
# ssh -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -tt ubuntu@${dev_public_ec2_ip} ssh -i cube-dev.pem ubuntu@${dev_private_ec2_ip} "sudo rm -r -f efs-mount-point/schema/"${file_location}/${file_name}
# ssh -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -tt ubuntu@${dev_public_ec2_ip} scp -i cube-dev.pem -r ${file_name} ubuntu@${dev_private_ec2_ip}:~/
# ssh -i /home/marte/bod-projects/company/company-data-terraform-hub/projects/cube-volume/terraform/key-pairs/cube-dev.pem -tt ubuntu@${dev_public_ec2_ip} ssh -i cube-dev.pem ubuntu@${dev_private_ec2_ip} sudo cp -r ${file_name} efs-mount-point/schema/${file_location}/${file_name}
# kubectl delete --all pods --namespace=cube --context=company-eks-data-dev