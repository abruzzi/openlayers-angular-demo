var app = angular.module('OpenLayersApp', []);

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

    var template = "<div><span>{{data.time}}</span> / <span>{{data.text}}</span></div>";

    $scope.showPopup = function() {
        var content = $compile(template)($scope);

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
