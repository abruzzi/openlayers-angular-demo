var app = angular.module('OpenLayersApp', []);

app.directive('mydir', function($compile) {
    return {
        restrict: "E",
        replace: true,
        template: "<div><span>{{data.time}}</span><span>{{data.text}}</span><input type='button' ng-click='func()' value='click me'/></div>",
        link: function(scope, element, attrs) {
            console.log(scope.data);
            console.log(scope.func);
        } 
    };
});

app.controller('EventController', 
        ['$scope', '$compile', '$timeout', function($scope, $compile, $timeout) {

    var map = new OpenLayers.Map("map",{projection:"EPSG:3857"});
    var osm = new OpenLayers.Layer.OSM();
    var toMercator = OpenLayers.Projection.transforms['EPSG:4326']['EPSG:3857'];
    var center = toMercator({x:-0.05,y:51.5});

    map.addLayers([osm]);
    map.setCenter(new OpenLayers.LonLat(center.x,center.y), 13);

    $scope.data = {
        text: "Sun Mansi",
        time: new Date()
    };

    $scope.func = function() {
        console.log("Hello, world");
    };

    var template = "<mydir></mydir>";

    $scope.showPopup = function() {
        var content = $compile(template)($scope);
        
        angular.element("#footer").append(content);
        var lonlat = "-5694.06868525478, 6708925.0877411375";
        $timeout(function() {
            var popup = new OpenLayers.Popup.FramedCloud("popup",
                OpenLayers.LonLat.fromString(lonlat),
                null,
                content.html(),
                null,
                true
            );

            map.addPopup(popup);

        }, 0);
    };

}]);
