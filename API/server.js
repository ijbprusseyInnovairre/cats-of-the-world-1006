const { spawn } = require('child_process');

// commands list
const commands = [
    {
        name: 'Auth',
        command: 'start nodemon auth.js'
    },
    {
        name: 'Cats',
        command: 'start nodemon cats.js'
    }
];

// run command test
function runCommand(command, name, callback) {
    var child = spawn(command, {
        shell: true
    }, function (error, stdout, stderr) {
        if (stderr) {
            callback(stderr, null);
        } else {
            callback(null, `Successfully started ${name} ...`);
        }
    });
}

 async function main() {
    try {
        commands.forEach(element => {
            runCommand(element.command, element.name, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(res);
                }
            });
        });
    } catch {
      throw new Error('Failed');
    }
}

// call main
main();