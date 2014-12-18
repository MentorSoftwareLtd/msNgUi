/**
 * msngui
 * @version v0.0.3 - 2014-12-17
 * @link https://github.com/MentorSoftwareLtd/msNgUi
 * @author Miroslaw Dylag (miroslaw.dylag@mentorsoftwareltd.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
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