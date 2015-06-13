'use strict';

angular.module('mapDataScanaduApp')
  .factory('mapFactory', ['$http', '$window', '$q', '$timeout', function($http, $window, $q, $timeout) {
  var service = {};
  var _countryPromiseHr = null;
  var _countryPromiseBlood = null;
  var _countryPromiseTem = null;
  var _countryPromiseSpO2 = null;
  var _worldPromise = null;
  var _worldPromiseBlood = null;
  var _worldPromiseSpO2 = null;
  var _worldPromiseHr = null;
  var _globePromiseData = null;
  var _globePromiseTopTen = null;
  var _requestTimeout = 10000;
  var urlDataGBM = {
    'globeData' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_globe.json?callback=process_globe_data',
    'globeTopTen' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_globe_topn.json?callback=process_globe_topn_data',
    'exWorldHr' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_hr_world.json?callback=process_hr_world_data',
    'exWorldBp' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_bp_world.json?callback=process_bp_world_data',
    'exWorldTem' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_bodytemp_world.json?callback=process_bodytemp_world_data',
    'exWorldSpO2' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_spo2_world.json?callback=process_spo2_world_data',
    'exCountryHr' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_hr_country.json?callback=process_hr_country_data',
    'exCountryBp' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_bp_country.json?callback=process_bp_country_data',
    'exCountryTemp' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_bodytemp_country.json?callback=process_bodytemp_country_data',
    'exCountrySpO2' : 'http://vu-ubuntu01.aws.scanadu.net/convert/vitals/data_spo2_country.json?callback=process_spo2_country_data'
  };


  /* Globe GBM Data */
    $window.process_globe_data = function(data) {
      _globePromiseData.resolve(data);
    }

    service.loadGlobeData = function() {
      _globePromiseData = makeJsonpRequest(urlDataGBM.globeData);
      return _globePromiseData.promise;
    };

  /* Globe Data Points */
    $window.process_globe_topn_data = function(data) {
      _globePromiseTopTen.resolve(data);
    }

    service.loadGlobeTopTen = function() {
      _globePromiseTopTen = makeJsonpRequest(urlDataGBM.globeTopTen);
      return _globePromiseTopTen.promise;
    };

  /* Explore GBM SVG and Country Data */
    /* Heart Rate */
    $window.process_hr_world_data = function(data) {
      _worldPromiseHr.resolve(data);
    }

    service.loadWorldDataHr = function() {
      _worldPromiseHr = makeJsonpRequest(urlDataGBM.exWorldHr);
      return _worldPromiseHr.promise;
    };

    /* World Temperature */
    $window.process_bodytemp_world_data = function(data) {
      _worldPromise.resolve(data);
    }

    service.loadWorldDataTemperature = function() {
      _worldPromise = makeJsonpRequest(urlDataGBM.exWorldTem);
      return _worldPromise.promise;
    };

    /* World Blood Pressure */
    $window.process_bp_world_data = function(data) {
      _worldPromiseBlood.resolve(data);
    }

    service.loadWorldDataBlood = function() {
      _worldPromiseBlood = makeJsonpRequest(urlDataGBM.exWorldBp);
      return _worldPromiseBlood.promise;
    };

    /* World SpO2 */
    $window.process_spo2_world_data = function(data) {
      _worldPromiseSpO2.resolve(data);
    }
    service.loadWorldDataSpO= function () {
      _worldPromiseSpO2 = makeJsonpRequest(urlDataGBM.exWorldSpO2);
      return _worldPromiseSpO2.promise;
    };

    /* HR Country */
    $window.process_hr_country_data = function(data) {
      _countryPromiseHr.resolve(data);
    }
    service.loadCountryDataHr = function() {
      _countryPromiseHr = makeJsonpRequest(urlDataGBM.exCountryHr);
      return _countryPromiseHr.promise;
    };

    /* Blood Country */
    $window.process_bp_country_data = function(data) {
      _countryPromiseBlood.resolve(data);
    }
    service.loadCountryDataBlood = function() {
      _countryPromiseBlood = makeJsonpRequest(urlDataGBM.exCountryBp);
      return _countryPromiseBlood.promise;
    };

    /* Temperature Country */
    $window.process_bodytemp_country_data = function(data) {
      _countryPromiseTem.resolve(data);
    }
    service.loadCountryDataTemperature= function() {
      _countryPromiseTem = makeJsonpRequest(urlDataGBM.exCountryTemp);
      return _countryPromiseTem.promise;
    };

    /* SpO2 Country */
    $window.process_spo2_country_data = function(data) {
      _countryPromiseSpO2.resolve(data);
    }
    service.loadCountryDataSpO2 = function() {
      _countryPromiseSpO2 = makeJsonpRequest(urlDataGBM.exCountrySpO2);
      return _countryPromiseSpO2.promise;
    };

    function makeJsonpRequest(url) {
      var deferred = $q.defer();
      $http.jsonp(url);
      $timeout(function() {
        var promiseResolved = false;
        deferred.promise.then(function() {
          promiseResolved = true;
        });
        if (!promiseResolved) {
          deferred.reject('Timeout');
        }
      }, _requestTimeout);
      return deferred;
    }

  return service;
}]);
