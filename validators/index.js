const fs = require('fs');
const { validationResult } = require('express-validator');

exports.bootstrap = _ => {
    global['validate'] = [];

    readAndLoadValidators = (container, directory) => {
        fs.readdirSync(directory).forEach(file => {
            if (file === 'index.js') {
                return;
            } 
    
            const stats = fs.lstatSync(`${directory}/${file}`);
    
            if (stats.isDirectory()) {
                container[file] = [];

                return readAndLoadValidators(container[file], `${directory}/${file}`)
            }

            return container[file.split('.')[0]] = [
                require(`${directory}/${file}`),
                (req, res, next) => {
                    const result = validationResult(req);
                    
                    if (!result.isEmpty()) {
                        return res.status(422).json({ errors: result.array() });
                    }
    
                    next();
                }
            ]
        });
    }
    
    readAndLoadValidators(global['validate'], __dirname);
}