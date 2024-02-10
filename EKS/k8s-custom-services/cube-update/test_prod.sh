#!/bin/bash
. ./variables.sh


echo ${prod_public_ec2_ip}
echo ${prod_private_ec2_ip}
ssh -i /home/marte/${prod_kp_name}.pem ec2-user@${prod_public_ec2_ip} "sudo rm -r schema/"
scp -i /home/marte/${prod_kp_name}.pem -r /home/marte/bod-projects/company/company-data-warehouse/CubeJS/schema/ ec2-user@${prod_public_ec2_ip}:~/
ssh -i /home/marte/${prod_kp_name}.pem -tt ec2-user@${prod_public_ec2_ip} ssh -i ${prod_kp_name}.pem ec2-user@${prod_private_ec2_ip} "sudo rm -r -f schema/"
ssh -i /home/marte/${prod_kp_name}.pem -tt ec2-user@${prod_public_ec2_ip} ssh -i ${prod_kp_name}.pem ec2-user@${prod_private_ec2_ip} "sudo rm -r -f efs/schema/"
ssh -i /home/marte/${prod_kp_name}.pem -tt ec2-user@${prod_public_ec2_ip} scp -i ${prod_kp_name}.pem -r schema/ ec2-user@${prod_private_ec2_ip}:~/
ssh -i /home/marte/${prod_kp_name}.pem -tt ec2-user@${prod_public_ec2_ip} ssh -i ${prod_kp_name}.pem ec2-user@${prod_private_ec2_ip} sudo cp -r schema/ efs/
kubectl delete --all pods --namespace=cube --context=company-data-prod

# echo ${prod_public_ec2_ip}
# echo ${prod_private_ec2_ip}
# scp -i /home/marte/${prod_kp_name}.pem -r /home/marte/bod-projects/company/company-data-warehouse/cubejscopy/schema/ ec2-user@${prod_public_ec2_ip}:~/
# ssh -i /home/marte/${prod_kp_name}.pem -tt ec2-user@${prod_public_ec2_ip} scp -i ${prod_kp_name}.pem -r schema/ ec2-user@${prod_private_ec2_ip}:~/
# ssh -i /home/marte/${prod_kp_name}.pem -tt ec2-user@${prod_public_ec2_ip} ssh -i ${prod_kp_name}.pem ec2-user@${prod_private_ec2_ip} sudo cp -r schema/ efs-mount-point/
# kubectl delete --all pods --namespace=cube --context=company-data-prod