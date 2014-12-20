/**
 * msngui
 * @version v0.0.3 - 2014-12-19
 * @link https://github.com/MentorSoftwareLtd/msNgUi
 * @author Miroslaw Dylag (miroslaw.dylag@mentorsoftwareltd.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var TreeGridController = (function() {
    var GridController = {};
})();
angular.module('ms.NgUi.treeGrid',[])
    .directive('msTreeGrid', function() {
        return {
            //replace: true,
            restrict: 'A',
            scope: {
                tree: '=ngModel'
            },
            controller: ["$scope","$compile", "$parse", "$timeout", "$templateCache", function($scope, $compile, $parse, $timeout, $templateCache) {
                this.$compile = $compile;
                this.$parse = $parse;
                this.$timeout = $timeout;
                this.addRow = function() {
                    console.log();
                }
                console.log("Ctrl",this, $scope);
            }],
            template : function(templateElement, tAttrs) {
                console.log('template', templateElement, tAttrs.fields);

            },
            link: function (scope, elm, attrs, controller) {
                console.log("Ctrl 2",controller, attrs.fields[0]);

            }
        };
    }).directive('treeGridTh', function() {
        return {
            restrict: 'A',
            require: "^treeGrid",
            link: function (scope, elm, attrs, controller) {
                console.log("Ctrl 2",controller);

            }
        }
    });