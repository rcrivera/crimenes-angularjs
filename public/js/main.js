var crimeSpotter = angular.module('crime-spotter', ['leaflet-directive']);

crimeSpotter.config([
  "$httpProvider", function(provider) {
    return provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);
