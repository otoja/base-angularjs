'use strict';

/* Filters */

angular.module('myApp.filters', []).
        filter('capitalize', function() {
            return function(txt) {
                if (txt !== null)
                    txt = txt.toLowerCase();
                return txt.substring(0, 1).toUpperCase() + txt.substring(1);
            };
        }).
        filter('ssn', function() {
            return function(txt) {
                if (txt !== null)
                    var tmp=txt.split('-');
                return '***-**-' + tmp[2];
            };
        });
