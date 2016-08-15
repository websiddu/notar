import { Injectable } from '@angular/core';

declare var _;
declare var unescape;

@Injectable()
export class UtilService {

  /**
   * Parses the query parameters to this page and returns them as an object.
   * @function
  */
  getParams() {
    let params = {};
    let queryString = window.location.search;
    if (queryString) {
      // split up the query string and store in an object
      var paramStrs = queryString.slice(1).split('&');
      for (var i = 0; i < paramStrs.length; i++) {
        var paramStr = paramStrs[i].split('=');
        params[paramStr[0]] = JSON.parse(unescape(paramStr[1]));
      }
    }
    return params;
  }

}
