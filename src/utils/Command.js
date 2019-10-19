// dependencies
const Promise = require('bluebird');
const Error = require('./RequestError');
const exec = require('child_process').exec;

class Command {
    logging = false;

    constructor(logging = false) {
        this.logging = logging
    }

    executeCommand(cmd) {
        if (this.logging)
            console.log('cmd:', cmd, '\n');

        return new Promise((resolve, reject) => {
            exec(cmd, (err, stdout, stderr) => {
                if (!stdout) {
                    reject(new Error('No content returned', 500));
                    return;
                }

                if (err && err !== null) {
                    console.error('err:', err);
                    console.error('stderr:', stderr);
                    reject(new Error('Error returned from process execution', 500));
                    return;
                } else if (stdout.includes('Error 401')) {
                    reject(new Error('Unauthorised', 401));
                    return;
                } else if (stdout.includes('Error 403')) {
                    console.error('stdout:', stdout);
                    reject(new Error('Incorrect authentication details', 403));
                    return;
                }

                // try {
                //     let data = JSON.parse(stdout);

                //     // TODO: status code handling needs work...
                //     if (data.statusCode >= 400)
                //         reject(new Error(data.message, data.status));
                // } catch {
                //     // helm API 'helpfully' returns an HTML error page...
                //     console.error('stdout:', stdout);
                //     reject(new Error('Unknown error encountered parsing stdout', 500));
                // }

                resolve(stdout);
            });
        });
    }
}

module.exports = Command;