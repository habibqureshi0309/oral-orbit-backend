const fs = require('fs');

exports.bootstrap = _ => {
    global['service'] = [];

    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') {
            return;
        }

        const broken = file.split('.');
        const serviceName = `${broken[0]}`;

        global['service'][serviceName] = require(`${__dirname}/${file}`);
    })
}