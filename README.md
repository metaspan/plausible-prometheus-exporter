# plausible-prometheus-exporter

# get started

```bash
git clone https://github.com/metaspan/plausible-prometheus-exporter
cd plausible-prometheus-exporter
npm install
cp .env.sample .env
```

Edit .env file as required

```bash
# run
node prometheus-exporter.js
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
