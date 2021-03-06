angular.module('ms.NgUi.tree',[])
    .service('msTreeService',function() {
        console.log('msTreeService');
        var selectedElement = {};
        var msTreeService={};
        msTreeService.select = function(element, id) {
            console.log(id);

            if (selectedElement[id]) {
                selectedElement[id].removeClass('selected');
            }
            selectedElement[id]=element;
            selectedElement[id].addClass('selected');
        }
        return msTreeService;
    })
    .directive('msTree', function() {

        return {
            template: '<tree-node-element ng-repeat="node in tree"></tree-node-element>',
            replace: true,
            transclude: true,
            restrict: 'EA',
            scope: {
                treeId: "=",
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
).directive('treeNodeElement', function($compile, msTreeService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'tree/tree.tpl.html',

            link: function(scope, elm, attrs, controller) {
                var options = {};
                console.log(scope, elm, attrs);
                options.folderType = attrs.folderType || "folder" ;
                options.fileType = attrs.fileType || "file" ;
                options.onSelect=attrs.onSelect;
                options.treeId=attrs.treeId;
                scope.classCollapsed=scope.$parent.classCollapsed;
                scope.classFile=scope.$parent.classFile;
                scope.classExpanded=scope.$parent.classExpanded;
                scope.classParent=scope.$parent.classParent;
                scope.classLeaf=scope.$parent.classLeaf;
                scope.expanded = true;
                var parentEl="";
                    (function(node) {
                        elm.on('click', function (e) {
                            var children = elm.find('li');
                            if (children) {
                                children.toggleClass('ng-hide');
                            }
                            if (node.type==options.fileType) {
                                var elemLeaf = elm.find('span');
                                msTreeService.select(elemLeaf, options.treeId);
                            }
                            e.stopPropagation();
                        });
                    })(scope.node);

                scope.nodeClicked = function($event,node) {

                    scope.expanded=!scope.expanded;
                    if (node.type==options.fileType) {
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
                    if (angular.isDefined(options.treeId)) {
                        childNodeAttr+=' data-tree-id="' + options.treeId + '"';
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
    });