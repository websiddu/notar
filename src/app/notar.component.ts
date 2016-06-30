import { Component } from '@angular/core';
// import { Routes , ROUTER_DIRECTIVES} from '@angular/router';
import { DocComponent } from './+doc';
import { LoginComponent } from './+login';

import { ROUTER_DIRECTIVES }  from '@angular/router';

const CLIENT_ID = '155734877039-ftadpu31p6i79iied572licad72ji4bt.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
declare var gapi: any;

@Component({
  moduleId: module.id,
  selector: 'notar-app',
  templateUrl: 'notar.component.html',
  styleUrls: ['notar.component.css'], 
  directives: [LoginComponent, DocComponent, ROUTER_DIRECTIVES],

})

// @Routes([
//   {path: '/', component: LoginComponent},
//   {path: '/login', component: LoginComponent},
//   {path: '/doc', component: DocComponent},
//   {path: '/login', component: LoginComponent}
// ])

export class NotarAppComponent {
  title = 'notar works!';

  constructor() {

  }


  checkAuth() {
    console.log(gapi)
  }

  callScriptFunction() {

    var scriptId = "1585tQzTyZ0DXBT_X0K1mHgUFx0hG_EQNAyEvkLAR9jSXMAZrQ4tpyMQP";

        // Create an execution request object.
        var request = {
            'function': 'doPost'
            };

        // Make the API request.
        var op = gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + scriptId + ':run',
            'method': 'POST',
            'body': request
        });

        op.execute(function(resp) {
          if (resp.error && resp.error.status) {
            // The API encountered a problem before the script
            // started executing.
            this.appendPre('Error calling API:');
            this.appendPre(JSON.stringify(resp, null, 2));
          } else if (resp.error) {
            // The API executed, but the script returned an error.

            // Extract the first (and only) set of error details.
            // The values of this object are the script's 'errorMessage' and
            // 'errorType', and an array of stack trace elements.
            var error = resp.error.details[0];
            this.appendPre('Script error message: ' + error.errorMessage);

            if (error.scriptStackTraceElements) {
              // There may not be a stacktrace if the script didn't start
              // executing.
              this.appendPre('Script error stacktrace:');
              for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
                var trace = error.scriptStackTraceElements[i];
                this.appendPre('\t' + trace.function + ':' + trace.lineNumber);
              }
            }
          } else {
            // The structure of the result will depend upon what the Apps
            // Script function returns. Here, the function returns an Apps
            // Script Object with String keys and values, and so the result
            // is treated as a JavaScript object (folderSet).
            var folderSet = resp.response.result;
            if (Object.keys(folderSet).length == 0) {
                this.appendPre('No folders returned!');
            } else {
              this.appendPre('Folders under your root folder:');
              Object.keys(folderSet).forEach(function(id){
                this.appendPre('\t' + folderSet[id] + ' (' + id  + ')');
              });
            }
          }
        });


  }

  appendPre(message) {
    console.log(message)
  }

  handleAuthResult(authResult) {
    console.log(this);

    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      console.log(authResult)
      this.callScriptFunction(); 
       
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
    }
  }

  login() {
    this.checkAuth(); 
  }

  createDoc() {

  }



}
