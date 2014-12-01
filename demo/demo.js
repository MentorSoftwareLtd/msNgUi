angular.module('ms.NgTest',[]).directive('msNgTreeGrid1',
    function ($compile) {

        return {
            restrict: 'E',
            //templateUrl: 'templates/msng/treeGrid.html',
            template: '<div>alaa</div>',
            link: function (scope, element, attrs) {
                console.log('Tree id', attrs.treeId);
            },
            controller: ['$scope', function( scope ) {
                console.log('controller');
            }]

        };






    });



var app=angular.module('ms.NgUi.demo', ['ms.NgTest','ms.NgUi','angularTree'], function(){
    console.log('Loaded');
});


app.controller('DemoController',function($scope){
    $scope.model = [
        {
            name: 'Item 1 Name',
            children: [
                {
                    name: 'Item 2 Name'
                }, {
                    name: 'Item 3 Name'
                }
            ]
        }
    ];
    $scope.displayTree =
        [{
            "name": "Root",
            "type": "directory",
            "nodes": [
                {"name" : "Node-1", "type" : "file"},
                {"name" : "Node-2", "type" : "directory"},
                {"name" : "N-2", "type" : "directory", "nodes" : [{"name":"sub-1", "type": "file"}]},
                {"name" : "N-2", "type" : "directory", "nodes" : [{"name":"sub-1", "type": "file"}]}
            ]
        }, {
            "name": "Root2",
            "type": "directory"

            }];

    $scope.select = function(node) {
        console.log('Controller click', node);
    }
});





