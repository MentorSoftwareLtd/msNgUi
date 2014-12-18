/**
 * msngui
 * @version v0.0.3 - 2014-12-17
 * @link https://github.com/MentorSoftwareLtd/msNgUi
 * @author Miroslaw Dylag (miroslaw.dylag@mentorsoftwareltd.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, document, undefined) {
'use strict';
// Source: module.js
angular.module('ms.NgUi', [
    'ms.NgUi.tree',
    'ms.NgUi.treeGrid'

]);
//'ms.NgUi.treeGrid',

// Source: msNgTree.js
angular.module('ms.NgUi.tree',[])
    .service('msTreeService',function() {
        console.log('msTreeService');
        var selectedElement;
        var msTreeService={};
        msTreeService.select = function(element) {
            if (selectedElement) {
                selectedElement.removeClass('selected');
            }
            selectedElement=element;
            selectedElement.addClass('selected');
        }
        return msTreeService;
    })
    .directive('msTree1', function() {

    })
    .directive('msTree', function() {

        return {
            template: '<tree-node-element ng-repeat="node in tree"></tree-node-element>',
            replace: true,
            transclude: true,
            restrict: 'EA',
            scope: {
                tree: '=ngModel',
                folderType:"=",
                fileType:"=",
                hovering: "=",//branch, leaf
                classExpanded:  "@",
                classCollapsed:  "@",
                classFile: "@",
                classParent: "@",
                classLeaf: "@",
                select : "&onSelect",
                children : "="
            }
        };
    }).factory(
).directive('treeNodeElement', ["$compile", "msTreeService", function($compile, msTreeService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'tree/tree.tpl.html',

            link: function(scope, elm, attrs, controller) {
                var options = {};

                options.folderType = attrs.folderType || "folder" ;
                options.fileType = attrs.fileType || "file" ;
                options.onSelect=attrs.onSelect;
                scope.classCollapsed=scope.$parent.classCollapsed;
                scope.classFile=scope.$parent.classFile;
                scope.classExpanded=scope.$parent.classExpanded;
                scope.classParent=scope.$parent.classParent;
                scope.classLeaf=scope.$parent.classLeaf;
                scope.expanded = true;
                var parentEl="";
                function deselectTree(elm) {
                    var parent = elm.parent();
                    if (parent[0].tagName=="UL" || parent[0].tagName=="LI") {
                        parent.children('span').removeClass('selected');
                        console.log(parent.children('span'));
                        parentEl=parent;
                        deselectTree(parent);
                    }
                    else {
                    }

                }
                elm.on('click', function(e) {
                    var children = elm.find('li');
                    if (children) {
                        children.toggleClass('ng-hide');
                    }
                    //var el=deselectTree(elm);
                    var elemLeaf=elm.find('span');
                    msTreeService.select(elemLeaf);
                    e.stopPropagation();
                    //elemLeaf.toggleClass('selected');
                })

                scope.nodeClicked = function(node) {

                    scope.expanded=!scope.expanded;
                    if (node.type==options.fileType) {
                        console.log('Node clicked', node, options,scope[options.onSelect]);
                        if (angular.isDefined(scope[options.onSelect])) {
                            scope[options.onSelect](node);
                        }

                    }

                    function toggleChildren(child) {
                        angular.forEach(child.nodes, function(child) {
                            child.hide=!child.hide;
                            toggleChildren(child);
                        });


                    }
                    toggleChildren(node);
                };

                scope.isFolder = function(node) {
                    return node.type == options.folderType;
                }
                scope.isFile = function(node) {
                    return node.type == options.fileType;
                }
                scope.isExpanded = function(node) {
                    return scope.expanded;
                }
                scope.hasChildren = function(node) {
                    return (node.nodes && node.nodes.length > 0);
                }
                scope.isClassExpanded = function() {
                    return angular.isDefined(attrs.classExpanded);
                }
                scope.isClassCollapsed = function() {
                    return angular.isDefined(options.classCollapsed);
                }
                scope.isClassFile = function() {
                    return angular.isDefined(options.classFile);
                }
                scope.getClassExpanded = function() {

                    return attrs.classExpanded;
                }
                scope.getClassCollapsed = function() {
                    return attrs.classCollapsed;
                }
                scope.getClassFile = function() {
                    return attrs.classFile;
                }


                scope.isLeaf = function(_data) {
                    if (_data.nodes && _data.nodes.length == 0) {
                        return true;
                    }
                    return false;
                };

                if (scope.node && scope.node.nodes &&  scope.node.nodes.length > 0) {
                    var childNodeAttr="";
                    if (angular.isDefined(options.onSelect)) {
                        childNodeAttr+=' data-on-select="' + options.onSelect + '"';
                    }

                    if (angular.isDefined(attrs.folderType)) {
                        childNodeAttr+=' data-folder-type="' + attrs.folderType + '"';
                    }
                    if (angular.isDefined(attrs.fileType)) {
                        childNodeAttr+=' data-file-type="' + attrs.fileType + '"';
                    }
                    if (angular.isDefined(attrs.classExpanded)) {

                        childNodeAttr+=' data-class-expanded="' + attrs.classExpanded + '"';
                    }
                    if (angular.isDefined(attrs.classCollapsed)) {

                        childNodeAttr+=' data-class-collapsed="' + attrs.classCollapsed + '"';
                    }
                    if (angular.isDefined(attrs.classFile)) {

                        childNodeAttr+=' data-class-file="' + attrs.classFile + '"';
                    }
                    if (angular.isDefined(attrs.classParent)) {

                        childNodeAttr+=' data-class-parent="' + attrs.classParent + '"';
                    }
                    if (angular.isDefined(attrs.classLeaf)) {

                        childNodeAttr+=' data-class-leaf="' + attrs.classLeaf + '"';
                    }

                    var childNode = $compile('<ul><ms-tree ng-model="node.nodes"' + childNodeAttr+'></ms-tree></ul>')(scope)

                    elm.append(childNode);
                }
            }
        };
    }]);

// Source: msNgTree2.js
angular.module('ms.NgUi.tree2',[])
    .directive('tree2', function() {
    return {
        replace: true,
        transclude: true,
        restrict: 'A',
        scope: {
            tree: '=ngModel',
            folderType:"=",
            fileType:"=",
            hovering: "=",//branch, leaf
            select : "&onSelect",
            classCollapse : "=",
            classExpand : "=",
            classFile : "=",
            classDirectory : "="
        },
        link: function(scope, elem, attrs, controller) {
            //get child node

            var childElem='<li class="ng-tree-node"><div>{{item}}</div><ul></ul></li>';
            console.log('Tree2',attrs, elem,scope,childElem);

            angular.forEach(scope.tree, function(item) {
                elem.append('');
                console.log('item',item);
            });
        }
    };
});

// Source: msNgTreeGrid.js
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

})(window, document);