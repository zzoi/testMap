(function() {
  'use strict';
  angular
    .module('mapDataScanaduApp')
    .directive("tooltipTemplate", tooltipTemplate);

  tooltipTemplate.$inject = ['$compile'];

  function tooltipTemplate($compile) {
    var contentContainer;
    return {
      restrict: "A",
      scope: {
        tooltipTemplate: "@",
        name: '@',
        value: '@'
      },
      link: function(scope, element, attrs){
        var templateUrl = attrs.tooltipTemplate;
        console.log('Tooltop activated');

        scope.hidden = true;

        var tooltipElement = angular.element("<div ng-hide='hidden' class='tooltip'>asd</div>");
        tooltipElement.append('<div ng-include=/"' + templateUrl + '/">ABC: {{value}} </div>');

        element.parent().append(tooltipElement);
        element
          .on('mouseenter', function(event){
            scope.hidden = false;
            scope.$digest();
            element.on('mousemove', function(event) {

              tooltipElement.css('position', 'absolute');
              tooltipElement.css('top', (10 + event.pageY) + 'px');
              tooltipElement.css('left', (10 + event.pageX) + 'px');
              console.log(tooltipElement);
            });
            console.log(event);
          } )
          .on('mouseleave', function(){scope.hidden = true; scope.$digest();
            element.off('mousemove');

          });

        var toolTipScope = scope.$new(true);
        angular.extend(toolTipScope, scope.myTooltipScope);
        $compile(tooltipElement.contents())(toolTipScope);
        $compile(tooltipElement)(scope);
      }
    };
  }
})();
