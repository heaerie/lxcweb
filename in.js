var lxc = require('lxc')({
    sshBind: ['/usr/bin/ssh', 'lxc']
});
console.log("lxc create..");
console.log(lxc);
lxc.create('example', 'ubuntu', function(error, messages){ 
	console.log("in create");
	if (error) {
		console.log('Error! '+messages)
	} else {
		console.log('Created!')
		lxc.start('example', console.log);
	}
});

