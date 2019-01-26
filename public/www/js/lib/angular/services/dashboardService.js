define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/api/dashboard/:action', null,
    {
         start    : { method:'POST', params:{"action" : "start"}      }
        ,stop    : { method:'POST', params:{"action" : "stop"}      }
        ,list    : { method:'POST', params:{"action" : "list"}      }
        ,del    : { method:'POST', params:{"action" : "del"}      }
        ,getCardDetail    : { method:'POST', params:{"action" : "getCardDetail"}     }
        ,getStmtDescDb    : { method:'POST', params:{"action" : "getStmtDescDb"}     }
        ,resetPassword : {method: 'POST', params: {"action" : "resetPassword"}}
    });
	
}
];

});