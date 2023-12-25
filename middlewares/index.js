const fs = require('fs');

exports.bootstrap = _ => {
    global['middleware'] = [];
    
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') {
            return;
        } 

        const broken = file.split('.');
        const middlewareName = `${broken[0]}`;

        global['middleware'][middlewareName] = require(`${__dirname}/${file}`);
    })
}