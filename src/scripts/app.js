var app = angular.module('currencyApp', []);

app.controller('CurrencyController', function ($scope, $http) {
    $scope.convertedAmount1 = 0;

    $scope.fromCurrency = "USD";
    $scope.toCurrency = "EUR";

    // Fetch exchange rates
    $scope.getExchangeRates = function () {
        $http.get('https://api.exchangeratesapi.io/v1/latest?access_key=621c14661e8d581f4bc38e975b7333f0')
            .then(function (response) {
                if (response.data.success) {
                    $scope.rates = response.data.rates;
                    console.log($scope.rates);
                } else {
                    console.error("Error fetching rates:", response.data.error);
                }
            })
            .catch(function (error) {
                console.error("API request failed:", error);
            });
    };

    // Call the function when the app loads
    $scope.getExchangeRates();

    // Convert currency function
    $scope.convertCurrency = function () {
        if ($scope.amount1 > 0) {
            let fromRate = $scope.rates[$scope.fromCurrency.toUpperCase()];
            let toRate = $scope.rates[$scope.toCurrency.toUpperCase()];





            if (fromRate && toRate) {
                let eurAmount = $scope.amount1 / fromRate; // Convert to EUR
                $scope.convertedAmount1 = (eurAmount * toRate).toFixed(2); // Convert to target currency

            } else {
                $scope.convertedAmount1 = "Invalid currency selection!";
            }
        }
        else {
            $scope.convertedAmount1 = "Please enter amount and select currencies!";
        }
    };
});