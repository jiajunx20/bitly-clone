var app = angular.module("tinyUrlApp");

app.controller("urlController", ["$scope", "$http", "routeParams", function($scope, $http, $routeParams) {
    $http.get("/api/v1/urls/" + $routeParams.shortUrl)
        .success(function(data) {
            $scope.shortUrl = data.shortUrl;
            $scope.longUrl = 'http://localhost/' + data.shortUrl;
        });

    // $http.get("/api/v1/urls/" + routeParams.shortUrl + "/totalClicks")
    //     .success(function(data) {
    //         $scope.totalClicks = data;
    //     });
    // var renderChart = function(chart, infos) {
    //     $scope[chart + 'Labels'] = [];
    //     $scope[chart + 'Data'] = [];
    //     $http.get("/api/v1/urls/" + routeParams.shortUrl + "/" + infos)
    //         .success(function(data) {
    //             data.forEach(function(info) {
    //                 $scope[chart + ]
    //             });
    //         });
    // };

}]);
