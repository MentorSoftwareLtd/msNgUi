angular.module('ms.NgUi.header', [])
    .directive('msNgHeader',function() {
        return {
            restrict: 'E',
            scope : {
                logoSrc: '@',
                btnToggle: '@'
            },
            templateUrl : 'msng.html',
            link: function(scope, element, attrs) {
                console.log('Header', attrs.btnToggle);
            }
        }
    });
