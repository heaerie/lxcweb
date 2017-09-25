define([], function() {

return [ '$scope' , 'toaster','dashboardService','$state','$window',function($scope,toaster,dashboardService,$state, $window) {
  $scope.usrId    =     $window.sessionStorage.getItem("usrId"  );
  $scope.grpId    =     $window.sessionStorage.getItem("grpId"  );

  $scope.getContainer= function() {

      dashboardService.list({}, function (resp) {
 //toaster.pop('success','this', JSON.stringify(resp));

        $scope.containers=resp.containers;
       });
  }

  $scope.$watch('$viewContentLoaded', function(){
    $scope.containers=[];
    $scope.getContainer();

});

/* $scope.$on('$viewChangeSuccess', function(){
//Here your view content is fully loaded !!
alert('on viewContentLoaded');
//$scope.getUserDetail();
});*/

  angular.element(document).ready(function () {
 //   alert('page loading completed');
  });
}];

});

/*[

 toasterService.pop('success', "title", "text");
      var url = "/authorize"; 
      var config =  { 
          headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIZWFlcmllIEdTTCIsImF1ZCI6Ind3dy5teXJvb21leHBlbnNlLmNvbSIsImlhdCI6IjYwbXMifQ.G37Yj8ljUjbOf-kSyc4j3-YAlbseb1KET9CMBgbJfaE"
           ,'Authorization': 'Basic dGVzdDp0ZXN0'
            ,      'Content-Type': 'application/x-www-form-urlencoded'
            ,'Access-Control-Allow-Origin': false

            
        }
      };
      var dataJson = 
      {
        "email" : "durai145@live.in"
        ,"password" : "1qaz2wsx"
        ,"grantType": "password"
            ,"clientId" : "CLIENTSP"
            ,"scope" : "GSA"
            ,"redirectURI" :"http://localhost:5000"
      };

    /*
    $.post(url , dataJson , function (resp,status,xhr){

        alert("resp" + status);

    },dataType);


  $http.post(url,dataJson,config).then(function (response) 
    { 
     // alert("resp");
      console.log(response);
      alert(JSON.stringify(response));
    },function(data){

      if(data.status == 302)
      {

        alert("Invalid request");
      }
     });
    };

]*/
