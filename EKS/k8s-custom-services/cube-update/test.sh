#!/bin/bash
. ./variables.sh


for i in "${prod_public_ec2_ip} ${prod_private_ec2_ip} ${prod_kp_name}" "${stg_public_ec2_ip} ${stg_private_ec2_ip} ${stg_kp_name}"; do ip=( $i );
    echo ${ip[0]}
    echo ${ip[1]}
    ssh -i /home/marte/${ip[2]}.pem ec2-user@${ip[0]} "sudo rm -r schema/"
    scp -i /home/marte/${ip[2]}.pem -r /home/marte/bod-projects/company/company-data-warehouse/CubeJS/schema/ ec2-user@${ip[0]}:~/
    ssh -i /home/marte/${ip[2]}.pem -tt ec2-user@${ip[0]} ssh -i ${ip[2]}.pem ec2-user@${ip[1]} "sudo rm -r -f schema/; sudo rm -r -f efs-mount-point/schema/"
    ssh -i /home/marte/${ip[2]}.pem -tt ec2-user@${ip[0]} scp -i ${ip[2]}.pem -r schema/ ec2-user@${ip[1]}:~/
    ssh -i /home/marte/${ip[2]}.pem -tt ec2-user@${ip[0]} ssh -i ${ip[2]}.pem ec2-user@${ip[1]} sudo cp -r schema/ efs-mount-point/
done

