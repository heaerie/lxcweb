define([], function() {

	return ['$scope', 'createContainerService', 'toaster', '$state', '$window',
		function($scope, createContainerService, toaster,  $state, $window) {

   $scope.createContainer=function(){

        $scope.inprogress = true;

      createContainerService.create({name: $scope.container.name, alias : $scope.container.image}, function (resp) {
              if (resp.success == true) {
              toaster.pop('success','Success', JSON.stringify(resp));   
              setTimeout(function(){$state.go("dashboard");},5000);
              } else {
              toaster.pop('error','Failure', JSON.stringify(resp));
              }
              $scope.inprogress = false;
             });
     $scope.inprogress = false;

   }

  $scope.$watch('$viewContentLoaded', function() {
  


    });
	
	    
	}];
	
});
