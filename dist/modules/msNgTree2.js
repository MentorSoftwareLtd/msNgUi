/**
 * msngui
 * @version v0.0.3 - 2014-12-19
 * @link https://github.com/MentorSoftwareLtd/msNgUi
 * @author Miroslaw Dylag (miroslaw.dylag@mentorsoftwareltd.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('ms.NgUi.tree2',[])
    .directive('tree2', ["$compile", function($compile) {
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
        controler: function(scope) {

        },
        link: function(scope, elem, attrs, controller) {
            //get child node
            var childNode = $compile('<ul><ms-node2 ng-model="node.nodes"' + childNodeAttr+'></ms-node2></ul>')(scope)
            elm.append(childNode);
        }
    };
}]).directive('msNode2',function() {
    return {
        link: function(scope, elem, attrs, controller) {
            //get child node
            var childNode = $compile('<ul><ms-node2 ng-model="node.nodes"' + childNodeAttr+'></ms-node2></ul>')(scope)
            elm.append(childNode);
        }

    }
});