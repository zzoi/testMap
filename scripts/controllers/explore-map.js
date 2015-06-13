(function() {
  'use strict';
  angular
    .module('mapDataScanaduApp')
    .controller('ExploreMap', ExploreMap);

  ExploreMap.$injet = ['$http', '$q', '$interval', '$window', 'mapFactory'];

  function ExploreMap($http, $q, $interval, $window, mapFactory) {
    var _this = this;
    _this.colorDataMap = {};
    _this.worldDataHR = {};
    _this.worldDataTemperature = {};
    _this.worldDataBlood = {};
    _this.worldDataSpO2 = {};
    _this.states = {};
    _this.statesBlood = {};
    _this.statesSpO2 = {};
    _this.statesTem = {};
    _this.statesHr = {};
    _this.titleMap = 'Heart Rate';
    _this.tableData = [
      {
        'title': '',
        'col1' : '',
        'col2' : '< 45',
        'color' : 'red'

      },
      {
        'title': 'Low',
        'col1' : '45',
        'col2' : '49',
        'color' : 'orange'

      },
       {
        'title': '',
        'col1' : '50',
        'col2' : '59',
        'color' : 'yellow'

      },
       {
        'title': 'Normal',
        'col1' : '60',
        'col2' : '99',
        'color' : 'green'

      },
      {
        'title': '',
        'col1' : '100',
        'col2' : '109',
        'color' : 'yellow'

      },
      {
        'title': 'High',
        'col1' : '110',
        'col2' : '119',
        'color' : 'orange'

      },
      {
        'title': '',
        'col1' : '',
        'col2' : '> 120',
        'color' : 'red'

      }
    ];


    // Ready with promise
    function ready() {
      return $q.when(true);
    }

    ready()
      .then(function() {
       //Hr
        mapFactory.loadWorldDataHr()
            .then(function(data) {
              _this.colorDataMap = data; //Initial load HR
              _this.worldDataHR =  data;
            })
            .catch(function(reason) {
              console.log('failed: ' + reason);
            });
       //Temperature
        mapFactory.loadWorldDataTemperature()
            .then(function(data) {
              _this.worldDataTemperature  = data;
            })
            .catch(function(reason) {
              console.log('failed: ' + reason);
            });
        //Blood
        mapFactory.loadWorldDataBlood()
            .then(function(data) {
              _this.worldDataBlood  = data;
            })
            .catch(function(reason) {
              console.log('failed: ' + reason);
            });
        //SpO2
        mapFactory.loadWorldDataSpO()
            .then(function(data) {
              _this.worldDataSpO2  = data;
            })
            .catch(function(reason) {
              console.log('failed: ' + reason);
            });

        //Country hr
        mapFactory.loadCountryDataHr()
           .then(function(data) {
              _this.states = data;
              _this.statesHr = data;
            })
            .catch(function(reason) {
              console.log('failed: ' + reason);
            });

        //Country Blood
        mapFactory.loadCountryDataBlood()
          .then(function(data) {
              _this.statesBlood = data;
            })
            .catch(function(reason) {
              console.log('failed: ' + reason);
            });

        //Country SpO2
        mapFactory.loadCountryDataSpO2()
            .then(function(data) {
              _this.statesSpO2 = data;
            })
            .catch(function(reason) {
              console.log('failed: ' + reason);
            });

        //Country temperature
        mapFactory.loadCountryDataTemperature()
            .then(function(data) {
              _this.statesTem = data;
            })
            .catch(function(reason) {
              console.log('failed: ' + reason);
            });

      });

    _this.changeDataSpo2 = function() {
      _this.colorDataMap = _this.worldDataSpO2;
      _this.states = _this.statesSpO2;
      _this.titleMap = 'SpO2';
      _this.tableData = [
        {
          'title': 'Normal',
          'col1' : '96',
          'col2' : '100',
          'color' : 'green'

        },
        {
          'title': 'Low',
          'col1' : '92',
          'col2' : '95.9',
          'color' : 'orange'

        },
         {
          'title': '',
          'col1' : '< 92',
          'col2' : '',
          'color' : 'red'

        }
      ];
    };

    _this.changeDataTemperature = function() {
      _this.colorDataMap = _this.worldDataTemperature;
      _this.states = _this.statesTem;
      _this.titleMap = 'Temperature';
      _this.tableData = [
        {
          'title': '',
          'col1' : '< 96.0 (< 35.5)',
          'col2' : '',
          'color' : 'red'

        },
        {
          'title': 'Low',
          'col1' : '96.0 (35.5)',
          'col2' : '96.8 (36.0)',
          'color' : 'orange'

        },
         {
          'title': '',
          'col1' : '96.9 (36.1)',
          'col2' : '97.5 (36.4)',
          'color' : 'yellow'

        },
         {
          'title': 'Normal',
          'col1' : '97.6 (36.4)',
          'col2' : '99.5 (37.5)',
          'color' : 'green'

        },
        {
          'title': '',
          'col1' : '99.6 (37.6)',
          'col2' : '100.3 (37.9)',
          'color' : 'yellow'

        },
        {
          'title': 'High',
          'col1' : '100.4 (38.0)',
          'col2' : '103.0 (39.4)',
          'color' : 'orange'

        },
        {
          'title': '',
          'col1' : '> 103.1 (> 39.4)',
          'col2' : '',
          'color' : 'red'

        }
      ];
    };

    _this.changeDataHeart = function() {
      _this.colorDataMap = _this.worldDataHR;
      _this.states = _this.statesHr;
      _this.titleMap = 'Heart Rate';
      _this.tableData = [
        {
          'title': '',
          'col1' : '',
          'col2' : '< 45',
          'color' : 'red'

        },
        {
          'title': 'Low',
          'col1' : '45',
          'col2' : '49',
          'color' : 'orange'

        },
         {
          'title': '',
          'col1' : '50',
          'col2' : '59',
          'color' : 'yellow'

        },
         {
          'title': 'Normal',
          'col1' : '60',
          'col2' : '99',
          'color' : 'green'

        },
        {
          'title': '',
          'col1' : '100',
          'col2' : '109',
          'color' : 'yellow'

        },
        {
          'title': 'High',
          'col1' : '110',
          'col2' : '119',
          'color' : 'orange'

        },
        {
          'title': '',
          'col1' : '',
          'col2' : '> 120',
          'color' : 'red'

        }
      ];
    };

    _this.changeDataPressure = function() {
      _this.colorDataMap = _this.worldDataBlood;
      _this.states = _this.statesBlood;
      _this.titleMap = 'Blood Pressure  (JNC 7)';
      _this.tableData = [
      {
        'title': 'Low',
        'col1' : '< 90',
        'col2' : '< 60',
        'color' : 'red'

      },
      {
        'title': 'Normal',
        'col1' : '90 - 119',
        'col2' : '60 - 79',
        'color' : 'green'

      },
       {
        'title': 'Prehypertension',
        'col1' : '120 - 139',
        'col2' : '80 - 89',
        'color' : 'yellow'

      },
       {
        'title': 'Hypertension (stage 1)',
        'col1' : '140 - 159',
        'col2' : '90 - 99',
        'color' : 'orange'

      },
      {
        'title': 'Hypertension (stage 2)',
        'col1' : '> 160',
        'col2' : '> 100',
        'color' : 'red'

      }
    ];
    };
  }
})();
