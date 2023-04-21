import axios from 'axios'

export class PlausibleExporter {

  site_id = undefined
  api_key = undefined
  protocol = undefined
  host = undefined
  port = undefined
  prefix = undefined

  constructor(config={}) {
    // console.debug('PlausibleExporter', config)
    const { site_id, api_key, protocol='http', host='localhost', port=8000, prefix='plausible' } = config
    this.site_id = site_id
    this.api_key = api_key
    this.protocol = protocol
    this.host = host
    this.port = port
    this.prefix = prefix
  }

  async query (site_id) {
    const client = axios.create({
      headers: { Authorization: `Bearer ${this.api_key}`}
    })
    console.log(`query() site_id: ${site_id}`)
    var items = []
    return new Promise(async (resolve, reject) => {
      try {
        var url = `${this.protocol}://${this.host}:${this.port}/api/v1/stats/realtime/visitors?site_id=${site_id || this.site_id}`
        // console.log('url', url)
        var ret = await client.get(url)
        // console.debug('ret.data', ret.data)
        items.push(`${this.prefix}_realtime_visitors{site_id="${site_id}"} ${ret.data || 0}`)
        var url = `${this.protocol}://${this.host}:${this.port}/api/v1/stats/aggregate?site_id=${site_id || this.site_id}`
        // console.log('url', url)
        var ret = await client.get(url, { params: {
          period: 'day',
          metrics: 'visitors,visits,pageviews,bounce_rate,visit_duration,events'
        } })
        // console.debug('ret.data', ret.data)
        if (ret.data && ret.data.results) {
          for(const [key, value] of Object.entries(ret.data.results)) {
            // console.debug(key, value)
            items.push(`${this.prefix}_stats_aggregate{site_id="${site_id}", key="${key}"} ${value?.value || 0}`)
          }
        }
        items.push(`${this.prefix}_up{site_id="${site_id}"} 1`)
      } catch (err) {
        items.push(`${this.prefix}_up{site_id="${site_id}"} 0`)
        // reject(err)
        console.log(err)
      } finally {
        resolve(items.join("\n"))
      }
    })
  }
}
