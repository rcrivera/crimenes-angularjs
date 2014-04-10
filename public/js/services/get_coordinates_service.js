crimeSpotter.factory('coordinatesService', function($http) {
  return {
    get_coordinates: function(address,callback) {
      $http.get('http://www.mapquestapi.com/geocoding/v1/address?key=Fmjtd|luur2qu721%2C25%3Do5-9a2wu6&inFormat=kvp&outFormat=json&location='+address+'&thumbMaps=false&maxResults=1').success(callback);
    }
  };
});