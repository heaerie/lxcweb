define([], function() {

	return ['$scope', 'createContainerService', 'toaster', '$state', '$window',
		function($scope, createContainerService, toaster,  $state, $window) {

   $scope.createContainer=function(){
      createContainerService.create({name: $scope.container.name, alias : $scope.container.image}, function (resp) {
            toaster.pop('success','this', JSON.stringify(resp));
         });

   }

  $scope.$watch('$viewContentLoaded', function() {
  


    });
	
	    
	}];
	
});