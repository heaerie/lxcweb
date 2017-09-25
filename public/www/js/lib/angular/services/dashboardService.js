define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/api/dashboard/:action', null,
    {
         getUserDetail    : { method:'POST', params:{"action" : "getUserDetail"}      }
        ,list    : { method:'POST', params:{"action" : "list"}      }
        ,GrpMember        : { method:'POST', params:{"action" : "GrpMember"} }
        ,getCardDetail    : { method:'POST', params:{"action" : "getCardDetail"}     }
        ,getStmtDescDb    : { method:'POST', params:{"action" : "getStmtDescDb"}     }
    });
	
}
];

});