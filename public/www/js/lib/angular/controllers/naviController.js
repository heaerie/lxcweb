define([],
function()
{

	return [ '$scope' , 'toaster','$state' ,'$window',function($scope,
		toaster,
		$state,
		$window) {

		$scope.firstName  =       $window.sessionStorage.getItem("firstName" );
		$scope.grpName    =       $window.sessionStorage.getItem("grpName"   );
		$scope.lastName    =     $window.sessionStorage.getItem("lastName"   );
		$scope.prodVersion    =     $window.sessionStorage.getItem("prodVersion");
		$scope.prtlName    =     $window.sessionStorage.getItem("prtlName"  );
		$scope.prodName    =     $window.sessionStorage.getItem("prodName"  );

	treeNodeOnclick=function(objId) {
		alert("alert" + objId);
		 $("."+objId).toggle(400);

	}

	$scope.$watch('$viewContentLoaded', function(){
		alert('I am in navi');

		GenTreeView(eval($window.sessionStorage.getItem("treeViewJson")), 'dashboard');
  
	});
    
    
	}];
	
});


GenTreeView=function(jsonInput, activeState) {
	var rtString="";
	var child=createTreeView(jsonInput,'root');

	document.getElementById('treeBase1').appendChild(child);
	return  rtString;
} 

createTreeView =function(jsonInput, parent) {
	var rtDiv = document.createElement("div")

	for(var i=0; i< jsonInput.length; i++) {

		if (jsonInput[i].dataType == 'CONTAINER') {
			rtDiv.appendChild(createNodeContainer(jsonInput[i].uid, false, jsonInput[i].link, jsonInput[i].linkName ,parent));
			rtDiv.appendChild( createTreeView(jsonInput[i].child, jsonInput[i].uid));
		} else {
			rtDiv.className="TreeNodeDiv";
			rtDiv.appendChild(createNode(jsonInput[i].uid, false,  jsonInput[i].link, jsonInput[i].linkName,parent));
		}
	}

	return rtDiv;
}

createNodeContainer =function(ContainerId,activeFlag, link,linkName, parent)
{


  this.ElDiv =  document.createElement("div");
  this.ElDiv.id = parent;
  this.ElDiv.className ="TreeContainer" ;
  this.ElDiv.setAttribute("onclick","treeNodeOnclick('"+ContainerId +"')" );

  this.ElLink                 = document.createElement("a");
  if( activeFlag == true)
  {
   this.ElLink.className      = "active";
  }
  else
  {
    this.ElLink.className      = "inactive";
  }

 
  // this.ElEditButton.setAttribute("href","#notes/delete");
   //this.ElLink.setAttribute("onclick","treeNodeOnclick('"+ContainerId +"')" );
   this.ElLabel         = document.createTextNode(linkName);
   this.ElLink.appendChild(this.ElLabel);
   this.ElDiv.appendChild(this.ElLink );

   return this.ElDiv
}


createNode =function(ContainerId,activeFlag, link,linkName,parent)
{
/*
<i class="fa fa-level-up" aria-hidden="true"></i>

*/
  this.ElDiv =  document.createElement("div");
  this.ElDiv.id = parent;
  this.ElDiv.className ="TreeNode "+ parent;

  this.ElLink                 = document.createElement("a");
  if( activeFlag == true)
  {
   this.ElLink.className      = "active";
  }
  else
  {
    this.ElLink.className      = "inactive";
  }


  this.ElFontAwesome                 = document.createElement("i");

  this.ElFontAwesome.className ="fa fa-level-up fa-rotate-90"
  this.ElFontAwesome.setAttribute("aria-hidden",true);
  // this.ElEditButton.setAttribute("href","#notes/delete");
   this.ElLink.setAttribute("href","#/"+link+"/");
   this.ElLabelDiv = document.createElement("span");
   this.ElLabelDiv.className="TreeNodeText";
   this.ElLabel  = document.createTextNode(linkName);
   //this.ElLabel.className ="TreeNodeText"

   this.ElLabelDiv.appendChild(this.ElLabel);
   this.ElLink.appendChild(this.ElFontAwesome);
   this.ElLink.appendChild(this.ElLabelDiv);
   this.ElDiv.appendChild(this.ElLink );

   return this.ElDiv
}
