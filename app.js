// requires 
var express = require("express");
var lxd = require("node-lxd");
var client = lxd();
var app = express();
var bodyParser = require('body-parser');
var requestIp = require('request-ip');
var useragent = require('useragent');
var geoip = require('geoip-lite');
var cookieParser = require('cookie-parser');
var config = require('./config.json');

var containers = {};

/*
    it has dependant with bodyparse json
*/
function addCoreFunction(req, callback) {

    req.getHeader = function (arg) {

        var retVal = "";
        try {
            retVal = req.headers[arg]
        } catch (e) {

            retVal = "";
        }
        return retVal;

    }

    req.setHeader = function (arg, value) {


        try {
            req.headers[arg] = value;
        } catch (e) {

            retVal = "";
        }
        //return retVal;

    }


    req.getParam = function (arg) {
        var retVal = "";
        if (req.method == "POST") {
            try {
                retVal = req.params[arg] || req.body[arg];
            } catch (e) {
                retVal = "";
            }

        } else if (req.method == "GET") {

            try {
                retVal = req.query[arg] || req.body[arg];
            } catch (e) {
                retVal = "";
            }

        }
        return retVal;
    }

    callback(req);
}

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(bodyParser.json());


app.get("/api/dashboard/list", function (req, res) {
    client.containers(function (err, containers) {
        if (err) {
            res.json({
                success: false,
                message: err.getMessage()
            });
        } else {
            var out = [];
            containers.forEach(function (obj) {
                out.push({
                    name: obj.name(),
                    ipv4: obj.ipv4(),
                    ipv6: obj.ipv6(),
                    state: obj.state(),
                    server: config.host

                });
            });
            res.json({
                success: true,
                "containers": out,
                "server": config.host
            });
        }
    });

});

app.post("/api/dashboard/list", function (req, res) {

    client.containers(function (err, containers) {
        if (err) {
            res.json({
                success: false,
                message: err.getMessage()
            });
        } else {
            var out = [];
            containers.forEach(function (obj) {
                out.push({
                    name: obj.name(),
                    ipv4: obj.ipv4(),
                    ipv6: obj.ipv6(),
                    state: obj.state(),
                    server: config.host
                });
            });
            res.json({
                success: true,
                "containers": out
            });
        }
    });

});

/*
app.post("/api/dashboard/resetPassword", function (req, res) {
    console.log("in R:001 ### resetPassword");
    addCoreFunction(req, function (req) {

        console.log("in R:001 ###");
        console.log("req name:" + req.getParam("name"));
        client.container(req.getParam("name"), function (err, container) {
            if (err) {
                return res.json({
                    success: false,
                    "error": err
                });
            }
            console.log("in R:002 ###");
            console.log("container's state: " + container.state());
            state = container.state();
            if (state.status == "Running") {
                console.log("in R:002 ###");
                const cmd = "echo \"This is test\"";
                console.log("in R:004 ###:" + cmd);

                container.exec(["sudo passwd ubuntu\n@india123\n@india123"], function (err, stdOut, stdErr) {
                    console.log("in R:004.001 ###:" + err + "|" + stdErr + "|" + stdOut);
                    if (err) {
                        res.json({
                            success: false,
                            "error": err
                        });
                    } else if (stdErr)  {
                        res.json({
                            success: false,
                            "error": stdErr
                        });
                    } else {
                        res.json({
                            success: true,
                            "error": stdOut
                        });
                    }
                });

            } else {
                console.log("in R:003 ###");
                return res.json({
                    success: false,
                    "error": "Container is not in Running state"
                });
            }

        });
    });

});
*/


app.post("/api/dashboard/start", function (req, res) {

    addCoreFunction(req, function (req) {
        console.log("req name:" + req.getParam("name"));
        client.container(req.getParam("name"), function (err, container) {
            if (err) {
                return res.json({
                    success: false,
                    "error": err
                });
            }
            console.log("container's ip: " + container.state());
            state = container.state();
            if (state.status == "Stopped") {
                container.start(function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            "error": err
                        });
                    }

                    res.json({
                        success: true,
                        "state": container.state()
                    });

                });
            } else {
                return res.json({
                    success: false,
                    "error": "Container is not in  Stopped state"
                });
            }

        });
    });

});
app.post("/api/dashboard/stop", function (req, res) {

    addCoreFunction(req, function (req) {
        console.log("req name:" + req.getParam("name"));
        client.container(req.getParam("name"), function (err, container) {
            if (err) {
                return res.json({
                    success: false,
                    "error": err
                });
            }
            console.log("container's ip: " + container.state());
            state = container.state();
            if (state.status == "Running") {
                container.stop(function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            "error": err
                        });
                    }

                    res.json({
                        success: true,
                        "state": container.state()
                    });

                });
            } else {
                return res.json({
                    success: false,
                    "error": "Container is not in Running state"
                });
            }

        });
    });

});
app.post("/api/dashboard/del", function (req, res) {

    addCoreFunction(req, function (req) {
        console.log("req name:" + req.getParam("name"));
        client.container(req.getParam("name"), function (err, container) {
            if (err) {
                return res.json({
                    success: false,
                    "error": err
                });
            }
            console.log("container's ip: " + container.state());
            state = container.state();
            if (state.status == "Stopped") {
                container.delete(function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            "error": err
                        });
                    }

                    res.json({
                        success: true,
                        "state": container.state()
                    });

                });
            } else {
                return res.json({
                    success: false,
                    "error": "Container is not in Running state"
                });
            }

        });
    });

});


app.get("/api/container/create", function (req, res) {
    console.log("in create");
    addCoreFunction(req, function (req) {

        client.create(req.query.name, req.query.alias, function (err, container) {
            console.log(req.query);
            if (err) {
                res.json({
                    success: false,
                    message: err.getMessage()
                });
            } else {
                res.json({
                    success: true,
                    message: req.query.name + " created."
                });
            }
        });
    });
});

app.post("/api/container/create", function (req, res) {

    console.log("in create");
    addCoreFunction(req, function (req) {

        client.create(req.getParam("name"), req.getParam("alias"), function (err, container) {
            console.log(req.query);
            if (err) {
                res.json({
                    success: false,
                    message: err.getMessage()
                });
            } else {
                res.json({
                    success: true,
                    message: req.getParam("name") + " created."
                });
            }
        });
    });

});

app.post("/api/container/images", function (req, res) {
    addCoreFunction(req, function (req) {
        client.images(function (err, images) {
            if (err) {
                res.json({
                    success: false,
                    message: err.getMessage()
                });
            } else {
                res.json({
                    success: true,
                    images: images
                });
            }
        });
    });
});

app.get("/api/dashboard/start", function (req, res) {

    client.container(req.query.name, function (err, container) {
        if (err) {
            return res.json({
                success: false,
                "error": err
            });
        }
        console.log("container's ip: " + container.state());
        state = container.state();
        if (state.status == "Stopped") {
            container.start(function (err) {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        "error": err
                    });
                }

                res.json({
                    success: true,
                    "state": container.state()
                });

            });
        } else {
            return res.json({
                success: false,
                "error": "Container is not Stopped state"
            });
        }

    });


});

app.use(express.static(__dirname + '/public'));

app.listen(80, function (err) {
    if (!err)
        console.log("listening on port 80");
});