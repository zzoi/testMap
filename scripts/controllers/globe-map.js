'use strict';

/**
 * @ngdoc function
 * @name mapDataScanaduApp.controller:GlobeCtrl
 * @description
 * # GlobeCtrl
 * Controller of the mapDataScanaduApp
 */
angular.module('mapDataScanaduApp')
  .constant('ORBITAL', ORBITAL)
  .controller('GlobeCtrl', ['$scope', '$interval', '$q', 'mapFactory',  function ($scope, $interval, $q, mapFactory) {

    var _this = this;
    _this.dataMap = [];
    _this.container = $('#container-canvas');
    _this.globe = new ORBITAL.Globe(_this.container);
    _this.globe.animate();
    _this.lastTenTotal = {};
    _this.scanLocations = [];

    var timeIntervalInSec = 15; //Call the Server every 15 sec for updated Data
    // Ready with promise
    function ready() {
      return $q.when(true);
    }

    //getData
    function getData() {
      //Globe Data
      mapFactory.loadGlobeData()
        .then(function (data) {
          _this.dataMap = data;
          update();
        })
        .catch(function (reason) {
          console.log('failed: ' + reason);
        });
      //Top Ten Scans Places and total
      mapFactory.loadGlobeTopTen()
        .then(function (data) {
          _this.lastTenTotal = data;
          updateScanLocations();
          updateTotalScans();
        })
        .catch(function (reason) {
          console.log('failed: ' + reason);
        })
    }

    ready()
      .then(function() {
        getData();
        $interval(getData, 1000 * timeIntervalInSec);
      });



    //Fill up the Globe with Data
    function update() {
      for (var i = 0; i < _this.dataMap.length; i++) {
        _this.globe.addPoint(_this.dataMap[i].lat, _this.dataMap[i].lon, _this.dataMap[i].mag * 10);
      }
    }

    function updateScanLocations() {
      _this.scanLocations = _this.lastTenTotal.locations;
    }

    function updateTotalScans(){
      var totalDataPoints = _this.lastTenTotal.scancount;
      var odometer = new Odometer({ el: $('.odometer')[0], value: totalDataPoints, theme: 'train-station' });
      odometer.render();
    }
    return _this;
  }]);
