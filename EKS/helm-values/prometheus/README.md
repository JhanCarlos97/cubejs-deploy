To install prometheus properly, run the following commands:

1 - 
`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`

2 -
`helm install prometheus prometheus-community/prometheus -n $NAMESPACE`

Finally, add the Prometheus datasource in Grafana using the following url: `http://prometheus-server.grafana-loki.svc.cluster.local`. It's also important to install prometheus under the same namespace as grafana for networking reasons.
