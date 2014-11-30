(function(module) {
try { module = angular.module("ms.NgUi.tpl"); }
catch(err) { module = angular.module("ms.NgUi.tpl", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/msng/tree.html",
    "<li class=\"parent_li\">\n" +
    "    <span class=\"leaf\" ng-click=\"nodeClicked(node);select(node);\">\n" +
    "        <i class=\"fa fa-fw fa-folder-open\" ng-show=\"isFolder(node) && isExpanded(node) && hasChildren(node)\"></i>\n" +
    "        <i class=\"fa fa-fw fa-folder\" ng-show=\"isFolder(node) && (!isExpanded(node) || !hasChildren(node))\"></i>\n" +
    "        <i class=\"fa fa-fw fa-file\" ng-show=\"isFile(node)\"></i>\n" +
    "            {{node.name}} {{node.hide}} {{$index}} {{node}} {{isExpanded(node)}}\n" +
    "    </span>\n" +
    "</li>\n" +
    "                      ");
}]);
})();

(function(module) {
try { module = angular.module("ms.NgUi.tpl"); }
catch(err) { module = angular.module("ms.NgUi.tpl", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/msng/treeGrid.html",
    "<tr>\n" +
    "    <td>ala</td>\n" +
    "</tr>");
}]);
})();

(function(module) {
try { module = angular.module("ms.NgUi.tpl"); }
catch(err) { module = angular.module("ms.NgUi.tpl", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/msng/treeGridNode.html",
    "<tr>\n" +
    "    <td>{{treeNode.name}}\n" +
    "    </td>\n" +
    "</tr>\n" +
    "");
}]);
})();
