To install Loki properly, do the following:

`helm upgrade grafana grafana/loki-stack -n $NAMESPACE --set prometheus.enabled=true --set grafana.enabled=true --set loki.persistence.enabled=true --set grafana.persistence.enabled=true`