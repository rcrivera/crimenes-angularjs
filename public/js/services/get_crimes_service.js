crimeSpotter.factory('crimesService', function($http) {
  return {
    fetch_crimes: function(request,callback) {
      $http.get(request).success(callback);
    }
  };
});