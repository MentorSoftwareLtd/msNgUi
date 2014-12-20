/**
 * msngui
 * @version v0.0.3 - 2014-12-20
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
                model: '=ngModel',
                fields: '=?'
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
                console.log('template', templateElement.children(), tAttrs);

            },
            link: function (scope, elm, attrs, controller) {
                console.log("Ctrl 2",controller, attrs);
                var tBody=angular.element("<tbody></tbody>");

                angular.forEach(scope.fields, function(value,key) {
                    tBody.append("<th>"+value+"</th>");
                });
                elm.append(tBody);
                angular.forEach(scope.model, function(key,value) {
                    tBody.append("<tr></tr>");
                    console.log(value, key);

                });

                //add thead
            }
        };
    }).directive('treeGridRow', function() {
        return {
            restrict: 'E',
            require: "^treeGrid",
            template: "<tr></tr>",
            link: function (scope, elm, attrs, controller) {
                console.log("Treegrid row",scope);

            }
        }
    });