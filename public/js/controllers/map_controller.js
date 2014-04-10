crimeSpotter.controller('MapController', ['$scope', 'crimesService', 'leafletBoundsHelpers', function($scope, crimesService, leafletBoundsHelpers) {

	//This variable is to ignore the first load of the map bounds
	var first_load = true;

	var bounds = leafletBoundsHelpers.createBoundsFromArray([
        [ 18.465719, -66.117001 ],
        [ 18.465719, -66.117001 ]
    ]);

  angular.extend($scope, {
    center: {},
    bounds: bounds,
    markers: {},
    defaults: {
      tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
      maxZoom: 18
  	}
	});

  $scope.$watch("bounds", function() {
  	if (first_load) {
  		first_load = false;
  		return;
  	}
  	else{
  		var northEast = '['+[$scope.bounds['northEast']['lng']+','+$scope.bounds['northEast']['lat']]+']';
  		var northWest = '['+[$scope.bounds['southWest']['lng']+','+$scope.bounds['northEast']['lat']]+']';
  		var southWest = '['+[$scope.bounds['southWest']['lng']+','+$scope.bounds['southWest']['lat']]+']';
  		var southEast = '['+[$scope.bounds['northEast']['lng']+','+$scope.bounds['southWest']['lat']]+']';
  		var polygon = '['+northEast+','+northWest+','+southWest+','+southEast+']';
  		var request = 'http://crimenes-api.herokuapp.com/crimes?polygon='+polygon+'&from_date=2013-01-01&to_date=2014-12-22';
      
  		crimesService.fetch_crimes(request, function(results) {
        $scope.geojson= {
                data: results,
                style: {
                    fillColor: "green",
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                }
            }
			});
  	}

  });


}]);

//http://crimenes-api.herokuapp.com/crimes?polygon=[[-67.9809077,18.4054882],[-66.1122969,18.359121],[-66.0583415,18.3848264]]&from_date=2013-03-01&to_date=2014-12-22

//http://crimenes-api.herokuapp.com/crimes?polygon=[[-66.1136144399643,18.467245231902236],[-66.12038433551788,18.464192298680235]]&from_date=2013-03-01&to_date=2014-12-22

//http://crimenes-api.herokuapp.com/crimes?polygon=[[-66.1136144399643,18.467245231902236],[-66.12038433551788,18.464192298680235]]&from_date=2013-03-01&to_date=2014-12-22