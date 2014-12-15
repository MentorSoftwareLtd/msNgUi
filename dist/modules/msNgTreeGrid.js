/**
 * msngui
 * @version v0.0.3 - 2014-12-15
 * @link https://github.com/MentorSoftwareLtd/msNgUi
 * @author Miroslaw Dylag (miroslaw.dylag@mentorsoftwareltd.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var TreeGridController = (function() {
    var GridController = {};
})();
angular.module('ms.NgUi.treeGrid',[])
    .directive('treeGrid', function() {

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
                console.log('template', templateElement, tAttrs);

                //Add the default class
                var theadEl=templateElement.find("thead");
                if (theadEl)
                {
                    angular.forEach(theadEl.children(), function(childEl) {

                        }
                    );
                }
                angular.forEach(templateElement.children(), function (childElement) {
                    childElement = angular.element(childElement);
                    //childElement.attr("ng-non-bindable", "");
                });

            },
            compile: function (templateElement, tAttrs) {
                return {
                    pre: function (isolatedScope, instanceElement, tAttrs, controller) {
                        //controller.discoverTemplates(instanceElement);
                    },
                    post: function (isolatedScope, instanceElement, tAttrs, controller, transcludeFn) {
                        console.log('link', controller, isolatedScope);
                        //instanceElement.append("<tr><td>Ala</td></tr>");
                        //var gridScope = controller.setupScope(isolatedScope, instanceElement, tAttrs);
                        //controller.configureTableStructure(gridScope, instanceElement);
                        //controller.setupDisplayItemsArray(gridScope);
                    }
                };
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