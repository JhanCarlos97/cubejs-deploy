# Description

This folder has the helm charts utilized to deploy the 0.33 version of Cube. Since both Cube and Cubestore have their docker images (and charts), there is a folder for each one. 

# How to install and make it run on stg/production

1. Do the proper kubectl configuration.
2. Install helm.
3. Change any specific variable in the `values.yaml` files.
4. Run `helm install -f cube/values.yaml <cube-release-name> cube/  -n <namespace>` and `helm install -f cubestore/values.yaml <cubestore-release-name> cubestore/  -n <namespace>`
5. Add the following variable to the `cube-api` and `cube-api-worker` deployment: 
   

6. Change the selector on the service that communicates with the back-end (called `cube-api-np`):

```yaml
...
  selector:
    service: <cube-release-name>
...

```