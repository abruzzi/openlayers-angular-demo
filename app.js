var app = angular.module('OpenLayersApp', []);

app.controller('EventController', 
        ['$scope', '$compile', function($scope, $compile) {

    var map = new OpenLayers.Map("map",{projection:"EPSG:3857"});
    var osm = new OpenLayers.Layer.OSM();
    var toMercator = OpenLayers.Projection.transforms['EPSG:4326']['EPSG:3857'];
    var center = toMercator({x:-0.05,y:51.5});

    map.addLayers([osm]);
    map.setCenter(new OpenLayers.LonLat(center.x,center.y), 13);

    $scope.time = new Date();
    $scope.text = "Sun Mansi";

    var template = "<div><span>{{time}}</span> / <span>{{text}}</span></div>";
    var content = $compile(template)($scope);

    $scope.showPopup = function() {
        var popup = new OpenLayers.Popup.FramedCloud("popup",
            OpenLayers.LonLat.fromString("-5694.06868525478, 6708925.0877411375"),
            null,
            content.html(),
            null,
            true
        );  
        map.addPopup(popup);    
    };
}]);
