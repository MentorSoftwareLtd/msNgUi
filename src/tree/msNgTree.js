angular.module('ms.NgUi.tree',[])
    .directive('msTree', function() {
        return {
            template: '<node ng-repeat="node in tree"></node>',
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
                select : "&onSelect"
            }
        };
    }).factory(
).directive('node', function($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'tree/tree.tpl.html',

            link: function(scope, elm, attrs, controller) {
                var options = {};
                options.folderType = attrs.folderType || "folder" ;
                options.fileType = attrs.fileType || "file" ;
                console.log("node", attrs, scope.classCollapsed, scope.$parent.classCollapsed);

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
                    return attrs.classFile;
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
                    if (angular.isDefined(attrs.folderType)) {
                        childNodeAttr+=' data-folder-type="' + attrs.folderType + '"';
                    }
                    if (angular.isDefined(attrs.fileType)) {
                        childNodeAttr+=' data-file-type="' + attrs.fileType + '"';
                    }
                    if (angular.isDefined(attrs.classExpanded)) {
                        console.log('expanded');
                        childNodeAttr+=' data-class-expanded="' + attrs.classExpanded + '"';
                    }
                    if (angular.isDefined(attrs.classCollapsed)) {
                        console.log('expanded');
                        childNodeAttr+=' data-class-collapsed="' + attrs.classCollapsed + '"';
                    }
                    if (angular.isDefined(attrs.classFile)) {

                        childNodeAttr+=' data-class-file="' + attrs.classFile + '"';
                    }

                    var childNode = $compile('<ul><ms-tree ng-model="node.nodes"' + childNodeAttr+'></ms-tree></ul>')(scope)

                    elm.append(childNode);
                }
            }
        };
    });