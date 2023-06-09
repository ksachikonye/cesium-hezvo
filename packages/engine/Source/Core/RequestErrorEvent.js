import defined from "./defined.js";
import parseResponseHeaders from "./parseResponseHeaders.js";

/**
 * An event that is raised when a request encounters an error.
 *
 * @constructor
 * @alias RequestErrorEvent
 *
 * @param {number} [statusCode] The HTTP error status code, such as 404.
 * @param {object} [response] The response included along with the error.
 * @param {string|object} [responseHeaders] The response headers, represented either as an object literal or as a
 *                        string in the format returned by XMLHttpRequest's getAllResponseHeaders() function.
 */
function RequestErrorEvent(statusCode, response, responseHeaders) {
  /**
   * The HTTP error status code, such as 404.  If the error does not have a particular
   * HTTP code, this property will be undefined.
   *
   * @type {number}
   */
  this.statusCode = statusCode;

  /**
   * The response included along with the error.  If the error does not include a response,
   * this property will be undefined.
   *
   * @type {object}
   */
  this.response = response;

  /**
   * The headers included in the response, represented as an object literal of key/value pairs.
   * If the error does not include any headers, this property will be undefined.
   *
   * @type {object}
   */
  this.responseHeaders = responseHeaders;

  if (typeof this.responseHeaders === "string") {
    this.responseHeaders = parseResponseHeaders(this.responseHeaders);
  }
}

/**
 * Creates a string representing this RequestErrorEvent.
 * @memberof RequestErrorEvent
 *
 * @returns {string} A string representing the provided RequestErrorEvent.
 */
RequestErrorEvent.prototype.toString = function () {
  let str = "Request has failed.";
  if (defined(this.statusCode)) {
    str += ` Status Code: ${this.statusCode}`;
  }
  return str;
};
export default RequestErrorEvent;
