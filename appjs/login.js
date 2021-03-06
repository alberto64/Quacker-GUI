angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope', '$location', '$route',
    function($http, $log, $scope, $location, $route) {
        var thisCtrl = this;

        $scope.loginForm = {};


        console.log("Got inside the js")
        $scope.login = function(){
            var form = $scope.loginForm
            var url = "http://quacker-pr.herokuapp.com/login/credentials";
            console.log("Got inside the function")

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.post(url, form).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.
                console.log("response: " + JSON.stringify(response));
                if (response.data.hasOwnProperty('Error')) {
                    alert("Wrong Username and password");
                    $route.reload();
                }
                else {
                    $location.path("/chatlist/" + response.data.User[0]);
                    console.log($location);
                }
            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                console.log(status)
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){
                    alert("No se encontro la informacion solicitada.");
                }
                else {
                    alert("Error interno del sistema.");
                }
            });
        };

        $scope.signup = function(){
            var form = $scope.loginForm
            var url = "http://quacker-pr.herokuapp.com/users";
            console.log("Got inside the function")

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.post(url, form).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.
                console.log("response: " + JSON.stringify(response));
                if (response.data.hasOwnProperty('Error')) {
                    alert("Something went wrong");
                    $route.reload();
                }
                else {
                    $location.path("/chatlist/" + response.data.User.uID);
                }
            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                console.log(status)
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){
                    alert("No se encontro la informacion solicitada.");
                }
                else if(status == 500){
                    alert("Something wrong in api")
                }
                else {
                    alert("Error interno del sistema.");
                }
            });
        };
}]);
