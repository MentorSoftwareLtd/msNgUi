var TreeGridController = (function() {
    var GridController = {};
})();
angular.module('ms.NgUi.treeGrid',[])
    .directive('treeGrid', function() {
        return {
            //replace: true,
            restrict: 'A',
            scope: {
                tree: '=ngModel',
                folderType:"=",
                fileType:"=",
                select : "&onSelect"
            },
            controller: ["$compile", "$parse", "$timeout", "$templateCache", function($compile, $parse, $timeout, $templateCache) {
                this.$compile = $compile;
                this.$parse = $parse;
                this.$timeout = $timeout;
                console.log(this);
            }],
            template : function(templateElement, tAttrs) {
                console.log('template', templateElement, tAttrs);

                //Add the default class
                angular.forEach(templateElement.children(), function (childElement) {
                    childElement = angular.element(childElement);
                    console.log('childElement', childElement);
                    childElement.attr("ng-non-bindable", "");
                });

            },
            compile: function (templateElement, tAttrs) {
                return {
                    pre: function (isolatedScope, instanceElement, tAttrs, controller) {
                        //controller.discoverTemplates(instanceElement);
                    },
                    post: function (isolatedScope, instanceElement, tAttrs, controller, transcludeFn) {
                        //var gridScope = controller.setupScope(isolatedScope, instanceElement, tAttrs);
                        //controller.configureTableStructure(gridScope, instanceElement);
                        //controller.setupDisplayItemsArray(gridScope);
                    }
                };
            }
        };

    }).factory(
).directive('nodeTreeGrid', function($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/msng/treeGrid.html',

            link: function(scope, elm, attrs, controller) {
                console.log("nodeTreeGrid",scope.node);
                var options = {};
                options.folderType = attrs.folderType || "folder" ;
                options.fileType = attrs.fileType || "file" ;
                options.cssFolderExpanded="fa";
                options.cssFolderCollapsed="fa";
                options.cssFile="fa";

                scope.expanded=true;
                elm.on('click', function(e) {
                    var children = elm.find('li');
                    children.toggleClass('ng-hide');
                    e.stopPropagation();
                })

                scope.nodeClicked = function(node) {

                    scope.expanded=!scope.expanded;

                    function toggleChildren(child) {
                        angular.forEach(child.nodes, function(child) {
                            child.hide=!child.hide;
                            toggleChildren(child);
                        });


                    }
                    toggleChildren(node);
                };

                scope.isFolder = function(node) {
                    console.log('Node clicked', node, options);
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


                scope.isLeaf = function(_data) {
                    if (_data.nodes && _data.nodes.length == 0) {
                        return true;
                    }
                    return false;
                };

                if (scope.node && scope.node.nodes &&  scope.node.nodes.length > 0) {
                    var childNodeAttr="";
                    if (angular.isDefined(attrs.folderType)) {
                        childNodeAttr=' data-folder-type="' + attrs.folderType + '"';
                    }
                    if (angular.isDefined(attrs.fileType)) {
                        childNodeAttr=' data-file-type="' + attrs.fileType + '"';
                    }

                    var childNode = $compile('<tree-grid ng-model="node.nodes"' + childNodeAttr+'></tree-grid>')(scope)
                    elm.append(childNode);
                }
            }
        };
    });