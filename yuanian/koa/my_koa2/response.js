import getType from 'cache-content-type'

export default {
  set (field, val) {
    if (this.headerSent) return

    if (arguments.length === 2) {
      if (Array.isArray(val)) val = val.map(v => typeof v === 'string' ? v : String(v))
      else if (typeof val !== 'string') val = String(val)
      // this.res.setHeader(field, val)
    } else {
      for (const key in field) {
        this.set(key, field[key])
      }
    }
  },

  remove (field) {
    if (this.headerSent) return

    this.res.removeHeader(field)
  },

  has (field) {
    return typeof this.res.hasHeader === 'function'
      ? this.res.hasHeader(field)
      // Node < 7.7
      : field.toLowerCase() in this.headers
  },

  set body (val) {
    const original = this._body
    this._body = val
    console.log(val);
    // no content
    if (val == null) {
      if (!statuses.empty[this.status]) {
        if (this.type === 'application/json') {
          this._body = 'null'
          return
        }
        this.status = 204
      }
      if (val === null) this._explicitNullBody = true
      this.remove('Content-Type')
      this.remove('Content-Length')
      this.remove('Transfer-Encoding')
      return
    }

    // set the status
    if (!this._explicitStatus) this.status = 200

    // set the content-type only if not yet set
    // const setType = !this.has('Content-Type')

    // string
    if (typeof val === 'string') {
      this.type =  'html' 
      this.length = Buffer.byteLength(val)
      return
    }

    // buffer
    if (Buffer.isBuffer(val)) {
      this.type = 'bin'
      this.length = val.length
      return
    }

    // stream
    if (val instanceof Stream) {
      onFinish(this.res, destroy.bind(null, val))
      if (original !== val) {
        val.once('error', err => this.ctx.onerror(err))
        // overwriting
        if (original != null) this.remove('Content-Length')
      }

      this.type = 'bin'
      return
    }

    // json
    this.remove('Content-Length')
    this.type = 'json'
  },

  set type (type) {
    type = getType(type)
    if (type) {
      this.set('Content-Type', type)
    } else {
      this.remove('Content-Type')
    }
  }
}