(function() {
  'use strict';

  angular
    .module('mapDataScanaduApp')
    .directive('suExploreMap', suExploreMap);

  suExploreMap.$inject = ['$compile', '$http', '$timeout'];

  function suExploreMap($compile, $http, $timeout) {
    return {
      scope : {
        suWorldData : '=',
        suStates : '=',
        whenClicked : '&'
      },
      restrict : 'E',
      link : function(scope, element, attrs) {
        scope.map = '';
        scope.usa = '';
        scope.supportedMaps = ['GBR', 'usa', 'AUS', 'CAN', 'NLD'];
        scope.mapContainer = element[0];
        scope.worldMap = document.createElement('div');
        scope.usaMap = document.createElement('div');

        function drawMap() {
          console.log('Draw Map World');
          data: scope.suWorldData,
          scope.map = new Datamap({
            element: scope.worldMap,
            width:1000, // TODO: Set width and height to configurable values or take
            height:600, // TODO: ...then from parent.
            projection: 'mercator',
            geographyConfig: {
              'highlightFillColor': '#096CC4',
              'highlightBorderColor': '#efefef',
              'borderColor': '#dbdbdb',
              'popupTemplate': function (geography, data) {
                console.log(data);
                var value = (data) ? '</br>' + data.scans + ' : average ' : '';
                return '<div class="hoverinfo"><h2>'+ geography.properties.name + '</br>'+ value + '</h2></br>' +
                  '<span class="tooltip-span tooltip-green">N</span>20%'+
                  '<span class="tooltip-span tooltip-yellow">N</span>20%'+
                  '<span class="tooltip-span tooltip-orange">N</span>50%'+
                  '<span class="tooltip-span tooltip-red">N</span>10%</br><hr>' +
                  '<span class="tooltip-span tooltip-green">N</span>BP'+
                  '<span class="tooltip-span tooltip-green">N</span>HR'+
                  '<span class="tooltip-span tooltip-orange">N</span>Temp'+
                  '<span class="tooltip-span tooltip-green">N</span>SpO2' +
                  '     </div>';
              }
            },
            fills: {
              'RED': '#F62255',
              'GREEN': '#07D311',
              'YELLOW': '#F6EA16',
              'ORANGE': '#F6B216',
              'UNKNOWN': 'rgb(0,0,0)',
              'defaultFill': '#f4f4f4'
            },
            done: function(datamap) {
              datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                if (geography.id === 'USA') {
                  cleanNode(scope.usaMap);
                  scope.usa = new Datamap({
                    scope: 'usa',
                    element: scope.usaMap,
                    width:1000, // TODO: Set width and height to configurable values or take
                    height:600, // TODO: ...then from parent.
                    projection: 'mercator',
                    data : scope.suStates.USA,
                    geographyConfig: {
                      'highlightFillColor': '#2aa5a5',
                      'highlightBorderColor': '#efefef',
                      'borderColor': '#dbdbdb',
                      'popupTemplate': function (geography, data) {
                        var value = (data) ? data.scans + ': Scans in </br>' : '';
                        return '<div class="hoverinfo"><h2>' + value + geography.properties.name + '</h2></div>';
                      }
                    },
                    fills: {
                      'RED': '#F62255',
                      'GREEN': '#07D311',
                      'YELLOW': '#F6EA16',
                      'ORANGE': '#F6B216',
                      'UNKNOWN': 'rgb(0,0,0)',
                      'defaultFill': '#f4f4f4'
                    }
                  });
                  switchMap('usa');
                } else {
                  switchMap(geography.id);
                }
              });
            }
          });
          switchMap('world');
        }

        function updatedData() {
          scope.map.updateChoropleth(scope.suWorldData);
          //scope.usa.updateChoropleth(scope.suStates);
          switchMap('world');
        }

        function switchMap(map) {
          if (map === 'world' || map === 'usa') {
            cleanNode(scope.mapContainer);
            scope.mapContainer.appendChild(scope[map + 'Map']);
          } else if (scope.supportedMaps.indexOf(map) > -1) {
            var url = 'maps/' + angular.lowercase(map) + '.svg';
            $http.get(url)
              .then(function(response){
                if (response && response.status === 200) {
                  scope.mapContainer.innerHTML = response.data;
                  $timeout(function() {
                    attachMapEvents(map);
                  }, 0);
                }
              });
          }
        }

        drawMap();

        function cleanNode(node) {
          while (node.firstChild) {
            node.removeChild(node.firstChild);
          }
        }

        function attachMapEvents(map) {
          var currentState;
          console.log(scope.mapContainer);
          angular.forEach(scope.suStates[map], function(value, key) {
            currentState = $('#' + key, scope.mapContainer);

            currentState.attr('class', 'state-' + value.fillKey.toLowerCase());
            currentState.attr('tooltip-template', 'scripts/directives/tooltip.html');
            currentState.attr('value', value.scans);
            console.log(key);
            console.log(value);

          });
          var newScope = scope.$new(true);
            $compile(element.contents())(scope);
        }

        scope.$watch(function (scope) {
          return scope.suWorldData;
        }, function(val) {
          console.log('Watch');
          if (scope.suWorldData) {
            updatedData();
          }
        });
      }
    }
  }
})();
