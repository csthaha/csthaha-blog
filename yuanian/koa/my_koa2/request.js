export default {
    // 大部分都是get set一些方法和属性
/**
   * Return request header.
   *
   * @return {Object}
   * @api public
   */
  get header () {
    return this.req.headers
  },
  /**
   * Set request header.
   *
   * @api public
   */
  set header (val) {
    this.req.headers = val
  },
  /**
   * Return request header, alias as request.header
   *
   * @return {Object}
   * @api public
   */
  get headers () {
    return this.req.headers
  },

  /**
   * Set request header, alias as request.header
   *
   * @api public
   */

  set headers (val) {
    this.req.headers = val
  }

}