const { exec } = require("child_process");

exec("/bin/echo -e \"@india124\n@india123\n@india123\" | passwd ubuntu", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
