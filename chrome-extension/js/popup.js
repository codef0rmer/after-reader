var App = angular.module('after-reader', []);

App.controller('MainCtrl', ['$scope', '$timeout', 'Store', function($scope, $timeout, Store) {
  
  $scope.addnew = false;

  $scope.feeds = [
    {name: 'Feedly.com', url: 'http://www.feedly.com/home', chosen: true},
    {name: 'GetPrismatic.com', url: 'http://getprismatic.com/news/home', chosen: false},
    {name: 'TheOldReader.com', url: 'http://theoldreader.com/', chosen: false},
    {name: 'Newsblur.com', url: 'http://www.newsblur.com/', chosen: false},
    {name: 'Pulse.me', url: 'https://www.pulse.me/', chosen: false},
    {name: 'Digg Reader', url: 'http://digg.com/reader', chosen: false},
    {name: 'AOL Reader', url: 'http://reader.aol.com/', chosen: false}
  ];
  $scope.totalSample = $scope.feeds.length - 1;

  $scope.addNewReader = function() {
    $scope.addnew = true;
  };

  $scope.saveNewReader = function() {
    var readers = Store.get();

    readers.push({
      name   : $scope.readerName,
      url    : $scope.readerUrl,
      chosen : false
    });

    Store.put(readers);
    $scope.addnew = false;

    localStorage.setItem('defaultReader', $scope.readerName);
    localStorage.setItem('defaultUrl', $scope.readerUrl);

    $scope.updateFeed();
  };

  $scope.setDefault = function(feedIndex) {
    $scope.feeds.forEach(function(feed) {
      feed.chosen = false;
    });
    $scope.feeds[feedIndex].chosen = true;

    localStorage.setItem('defaultReader', $scope.feeds[feedIndex].name);
    localStorage.setItem('defaultUrl', $scope.feeds[feedIndex].url);
  };

  $scope.updateFeed = function() {
    var defaultReader = localStorage.getItem('defaultReader'),
        defaultUrl = localStorage.getItem('defaultUrl'),
        arrStore = Store.get();

    if ($scope.feeds.length - 1 > $scope.totalSample) {
      $scope.feeds.splice($scope.totalSample);      
    }

    if (arrStore.length > 0) {
      arrStore.forEach(function(feed) {
        $scope.feeds.push({
          name   : feed.name,
          url    : feed.url,
          chosen : feed.chosen
        });
      });
    }

    if (defaultReader !== null && defaultUrl !== null) {
      $scope.feeds.forEach(function(feed) {
        if (feed.name === localStorage.getItem('defaultReader') &&
            feed.url === localStorage.getItem('defaultUrl')
        ) {
          feed.chosen = true;
        } else {
          feed.chosen = false;
        }
      });
    }
  };

  $scope.updateFeed();
}]);

App.factory('Store', function() {
  var STORAGE_ID = 'readers';

  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function(data) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(data));
    }
  };
})