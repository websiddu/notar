/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
    return new Angular2App(defaults, {
        vendorNpmFiles: [
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'zone.js/dist/*.js',
            'es6-shim/es6-shim.js',
            'reflect-metadata/*.js',
            'rxjs/**/*.js',
            '@angular/**/*.js',
            'firebase/*.js',
            'angularfire2/**/*.js',
            'ng2-ckeditor/lib/*.+(js|js.map)',
            'jquery/**/*.js',
            'ng2-select2/**/*.js',
            'moment/moment.js'
        ],
        sassCompiler: {
            "cacheExclude": [/\/_[^\/]+$/]
        }
    });
};