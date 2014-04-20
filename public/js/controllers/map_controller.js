crimeSpotter.controller('MapController', ['$scope', 'crimesService', 'generalSetupService', 'coordinatesService','leafletBoundsHelpers',function($scope, crimesService, generalSetupService, coordinatesService, leafletBoundsHelpers) {

  generalSetupService.initialize()

  $scope.start_date = '2013/01/01'

  $scope.end_date = moment().format('YYYY/MM/DD')

  //Default location
  $scope.geocomplete = 'San Juan, Puerto Rico'

    //This function look for coordinates given an address
  $scope.geocode = function(address) {
    coordinatesService.get_coordinates(address,function(result){
      $scope.center = {
            lat: result['results'][0]['locations'][0]['latLng']['lat'],
            lng: result['results'][0]['locations'][0]['latLng']['lng'],
            zoom: 16
        };
    });
  };

  $scope.geocode($scope.geocomplete)

	//This variable is to ignore the first load of the map bounds
	var first_load = true;

  angular.extend($scope, {
    center: {},
    bounds: [],
    markers: {},
    layers: {
      baselayers: {
        osm: {
          name: 'OpenStreetMap',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          type: 'xyz'
        },
        cloudmade2: {
          name: 'Cloudmade Tourist',
          type: 'xyz',
          url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
          layerParams: {
            key: '007b9471b4c74da4a6ec7ff43552b16f',
            styleId: 7
          }
        }
      },
      overlays: {
        hillshade: {
            name: 'Hillshade Europa',
            type: 'wms',
            url: 'http://129.206.228.72/cached/hillshade',
            visible: true,
            layerOptions: {
                layers: 'europe_wms:hs_srtm_europa',
                format: 'image/png',
                opacity: 0.25,
                attribution: 'Hillshade layer by GIScience http://www.osm-wms.de',
                crs: L.CRS.EPSG900913
            }
        },
        fire: {
            name: 'OpenFireMap',
            type: 'xyz',
            url: 'http://openfiremap.org/hytiles/{z}/{x}/{y}.png',
            layerOptions: {
                attribution: '© OpenFireMap contributors - © OpenStreetMap contributors',
                continuousWorld: true
            }
        }
    }

    },
    defaults: {
      maxZoom: 18,
      scrollWheelZoom: false
  	}
	});

  /*
  $scope.$watch("center.zoom", function(zoom) {
    $scope.tiles.url = (zoom > 14) ? "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            : "http://{s}.tile.cloudmade.com/ad132e106cd246ec961bbdfbe0228fe8/997/256/{z}/{x}/{y}.png";
  });
*/

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
      var from_date = $scope.start_date.replace(/\//g,'-')
      var to_date = $scope.end_date.replace(/\//g,'-')

  		var request = 'http://crimenes-api.herokuapp.com/crimes?polygon='+polygon+'&from_date='+from_date+'&to_date='+to_date;
      
      
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
  
 $scope.autocomplete_options = {
    country: 'pr',
    types: '(regions)',
    watchEnter: true
  }; 

}]);

//http://crimenes-api.herokuapp.com/crimes?polygon=[[-67.9809077,18.4054882],[-66.1122969,18.359121],[-66.0583415,18.3848264]]&from_date=2013-03-01&to_date=2014-12-22

//http://crimenes-api.herokuapp.com/crimes?polygon=[[-66.1136144399643,18.467245231902236],[-66.12038433551788,18.464192298680235]]&from_date=2013-03-01&to_date=2014-12-22

//http://crimenes-api.herokuapp.com/crimes?polygon=[[-66.1136144399643,18.467245231902236],[-66.12038433551788,18.464192298680235]]&from_date=2013-03-01&to_date=2014-12-22