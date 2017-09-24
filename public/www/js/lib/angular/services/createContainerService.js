define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/api/createContainer/:action', null,
    {
         add    : { method:'POST', params:{"action"  : "post"}      }
    });
	
}
];

});
