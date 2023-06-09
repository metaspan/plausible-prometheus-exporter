# plausible-prometheus-exporter

A prometheus exporter for plausible (api) implemented in nodejs

# get started

```bash
git clone https://github.com/metaspan/plausible-prometheus-exporter
cd plausible-prometheus-exporter
npm install
cp .env.sample .env
```

Edit .env file as required

```env
SITE_ID=<your site id>
API_KEY=<your api key>
PROTOCOL=http
HOST=localhost
PORT=80
PREFIX=plausible
```

```bash
# run
node prometheus-exporter.js
```

## results

Open this link
http://localhost:9100/metrics/<site_id>

## sample output

```prometheus
plausible_realtime_visitors{site_id="metaspan.io"} 0
plausible_stats_aggregate{site_id="metaspan.io", key="bounce_rate"} 50
plausible_stats_aggregate{site_id="metaspan.io", key="events"} 9
plausible_stats_aggregate{site_id="metaspan.io", key="pageviews"} 9
plausible_stats_aggregate{site_id="metaspan.io", key="visit_duration"} 46
plausible_stats_aggregate{site_id="metaspan.io", key="visitors"} 4
plausible_stats_aggregate{site_id="metaspan.io", key="visits"} 4
plausible_up{site_id="metaspan.io"} 1
```

## configure prometheus

```yml
  - job_name: "plausible"
    scrape_interval: 60s
    metrics_path: "/metrics/<site_id>"
    static_configs:
    - targets: ["10.10.10.10:9100"]

```

# PM2

Launch the process with pm2

```bash
pm2 start --name plausible-prometheus-exporter prometheus-exporter.js
pm2 list
```

# refs

- https://plausible.io/docs/stats-api

# Kudos, inspiration

- https://github.com/riesinger/plausible-exporter
