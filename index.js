var lxd = require("node-lxd");
 
var client = lxd();
console.log(client); 
client.info(function(err, info) {
  console.log(info);
});

client.containers(true, function(err, containers) {
  for (var i = 0; i < containers.length; i++) {
    console.log(containers[i]); // containers are just names
  }
});

client.create("durai", "ubuntu-alias", function(err, container) {
  if (err) {
    console.error(err.getMessage());
  } else {
    console.log(container.name() + " created!");
  }
});

