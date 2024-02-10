#!/bin/bash
. ./variables.sh

#All files

echo ${stg_public_ec2_ip}
echo ${stg_private_ec2_ip}
ssh -i /home/marte/${stg_kp_name}.pem ec2-user@${stg_public_ec2_ip} "sudo rm -r schema/"
scp -i /home/marte/${stg_kp_name}.pem -r /home/marte/bod-projects/company/company-data-warehouse/CubeJS/schema/ ec2-user@${stg_public_ec2_ip}:~/
ssh -i /home/marte/${stg_kp_name}.pem -tt ec2-user@${stg_public_ec2_ip} ssh -i ${stg_kp_name}.pem ec2-user@${stg_private_ec2_ip} "sudo rm -r -f schema/"
ssh -i /home/marte/${stg_kp_name}.pem -tt ec2-user@${stg_public_ec2_ip} ssh -i ${stg_kp_name}.pem ec2-user@${stg_private_ec2_ip} "sudo rm -r -f efs-mount-point/schema/"
ssh -i /home/marte/${stg_kp_name}.pem -tt ec2-user@${stg_public_ec2_ip} scp -i ${stg_kp_name}.pem -r schema/ ec2-user@${stg_private_ec2_ip}:~/
ssh -i /home/marte/${stg_kp_name}.pem -tt ec2-user@${stg_public_ec2_ip} ssh -i ${stg_kp_name}.pem ec2-user@${stg_private_ec2_ip} sudo cp -r schema/ efs-mount-point/
kubectl delete --all pods --namespace=cube --context=company-eks-data-dev

#One file

# file_name=pmsAccounting.js
# file_location=raw
 
# echo ${stg_public_ec2_ip}
# echo ${stg_private_ec2_ip}
# scp -i /home/marte/${stg_kp_name}.pem -r /home/marte/bod-projects/company/company-data-warehouse/CubeJS/schema/${file_location}/${file_name} ec2-user@${stg_public_ec2_ip}:~/
# ssh -i /home/marte/${stg_kp_name}.pem -tt ec2-user@${stg_public_ec2_ip} ssh -i ${stg_kp_name}.pem ec2-user@${stg_private_ec2_ip} "sudo rm -r -f schema/"${file_location}/${file_name}
# ssh -i /home/marte/${stg_kp_name}.pem -tt ec2-user@${stg_public_ec2_ip} ssh -i ${stg_kp_name}.pem ec2-user@${stg_private_ec2_ip} "sudo rm -r -f efs-mount-point/schema/"${file_location}/${file_name}
# ssh -i /home/marte/${stg_kp_name}.pem -tt ec2-user@${stg_public_ec2_ip} scp -i ${stg_kp_name}.pem -r ${file_name} ec2-user@${stg_private_ec2_ip}:~/
# ssh -i /home/marte/${stg_kp_name}.pem -tt ec2-user@${stg_public_ec2_ip} ssh -i ${stg_kp_name}.pem ec2-user@${stg_private_ec2_ip} sudo cp -r ${file_name} efs-mount-point/schema/${file_location}/${file_name}
# kubectl delete --all pods --namespace=cube --context=company-eks-data-dev