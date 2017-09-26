// requires 
var express = require("express");
var lxd = require("node-lxd");
var client = lxd();
var app = express();
 
var containers = {};
 
app.get("/api/dashboard/list", function(req, res) {
	client.containers(function(err, containers) {
		if (err) {
			res.json({success: false, message: err.getMessage()});
		} else {
			var out = [];
			containers.forEach(function(obj) {
				out.push({ 
                    name :obj.name()
				    , ipv4 :obj.ipv4()
				    , ipv6 :obj.ipv6()
                    , state : obj.state()
				});
			});
			res.json({success: true, "containers": out, "server" : "localhost"});
		}
	});

});

app.post("/api/dashboard/list", function(req, res) {
    client.containers(function(err, containers) {
        if (err) {
            res.json({success: false, message: err.getMessage()});
        } else {
            var out = [];
            containers.forEach(function(obj) {
                out.push({ 
                    name :obj.name()
                    , ipv4 :obj.ipv4()
                    , ipv6 :obj.ipv6()
                    , state : obj.state()
                });
            });
            res.json({success: true, "containers": out});
        }
    });

});

app.get("/create", function(req, res) {
    console.log("in create");
    client.create(req.query.name, req.query.alias, function(err, container) {
        console.log(req.query);
       if (err) {
            res.json({success: false, message: err.getMessage()});
        } else {
            res.json({success: true, message: req.query.name + " created."});
        }
    });
    
    /*client.launch(req.query.name, function(err, container) {
        if (err) res.json({success: false, message: err.getMessage()});
        else {
            containers[req.query.name] = container;
            res.json({success: true, message: "Container launched"});
        }
    });
*/

});
 
app.get("/run", function(req, res) {
	console.log(containers);	
   if (!containers.hasOwnProperty(req.query.name)) {
        res.json({success: false, message: req.query.name +  " Container does not exist"});
        return;
    }
 
    containers[req.query.name].run(req.query.cmd.split(" "), function(err, stdOut, stdErr) {
        if (err) res.json({success: false, message: err.getMessage()});
        else if (stdErr.length > 0) res.json({success: false, message: stdErr});
        else {
            res.json({success: true, message: stdOut});
        }
    });
});

app.use(express.static(__dirname+'/public'));
 
app.listen(3000, function(err) {
    if (!err)
        console.log( "listening on port 3000");
});
