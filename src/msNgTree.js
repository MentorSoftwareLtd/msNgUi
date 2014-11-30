angular.module('ms.NgUi.tree',[])
    .directive('nodeTr', function() {
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
            select : "&onSelect"
        }
    };
}).factory(
).directive('node', function($compile) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/msng/tree.html',

        link: function(scope, elm, attrs, controller) {
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

                    var childNode = $compile('<ul><node-tr ng-model="node.nodes"' + childNodeAttr+'></node-tr></ul>')(scope)
                    elm.append(childNode);
            }
        }
    };
});