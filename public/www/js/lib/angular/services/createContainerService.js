define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/api/container/:action', null,
    {
         create : { method:'POST', params:{"action"  : "create"}      }
         , images : { method:'POST', params:{"action"  : "images"}      }
    });
	
}
];

});
