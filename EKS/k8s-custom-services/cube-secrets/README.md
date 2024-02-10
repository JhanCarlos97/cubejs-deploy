- Install and CSI drivers and AWS Provider
  
- Create an IAM policy and attach the rights to access the secrets ARNs
  
- Attach that IAM Policy to an IAM service account on EKS
stg - CUBE_STG_SECRET_POLICY

```
eksctl create iamserviceaccount \
>     --region="$AWS_REGION" --name "cube-secrets-sa"  \
>     --cluster "$EKS_CLUSTERNAME" \
>     --attach-policy-arn "$IAM_POLICY_ARN_SECRET" --approve \
>     --override-existing-serviceaccounts
```

- Add the secrets to a Kubernetes class called `SecretProviderClass` using its appropriate syntax

- Edit the deployment to use the env variables from the newly created secret, like this:

First, add the service account you created previously:

```
      serviceAccountName: cube-secrets-sa
      serviceAccount: cube-secrets-sa

```

Now add the volumes and volume mounts:

```
      volumes:
      - name: cube-secrets
        csi:
          driver: secrets-store.csi.k8s.io
          readOnly: true
          volumeAttributes:
            secretProviderClass: cube-secrets
```

```
      volumes:
      - name: cube-secrets
        csi:
          driver: secrets-store.csi.k8s.io
          readOnly: true
          volumeAttributes:
            secretProviderClass: cube-secrets


        volumeMounts:
        - mountPath: /cube/conf
          name: cube-api-efs
        - name: cube-secrets
          mountPath: /mnt/secrets
```

And then, make the deployment read the newly created secret as env variables:

```
          envFrom:
            - secretRef:
                name: cube-api-secrets
```

For the key-pair part, these guides were followed:

https://docs.snowflake.com/en/user-guide/key-pair-auth
https://github.com/cube-js/cube/pull/2724/files


Resources used:

https://blog.spikeseed.cloud/handling-aws-secrets-and-parameters-on-eks/