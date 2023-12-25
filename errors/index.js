const fs = require('fs');

exports.bootstrap = _ => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') {
            return;
        } 

        const broken = file.split('.');
        const errorName = `${broken[0]}`;

        global[errorName] = require(`${__dirname}/${file}`);
    })
}