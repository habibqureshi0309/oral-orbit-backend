const fs = require('fs');

function wrapAsync(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(e => {
            console.log(e.stack);
            next(e)
        });
    };
}

exports.bootstrap = _ => {
    global['action'] = [];

    readAndLoadActions = (container, directory) => {
        fs.readdirSync(directory).forEach(file => {
            if (file === 'index.js') {
                return;
            }

            const stats = fs.lstatSync(`${directory}/${file}`);

            if (stats.isDirectory()) {
                container[file] = [];

                return readAndLoadActions(container[file], `${directory}/${file}`)
            }

            const action = require(`${directory}/${file}`);

            if (action.constructor.name === "AsyncFunction") {
                return container[file.split('.')[0]] = wrapAsync(action);
            }

            return container[file.split('.')[0]] = action;
        });
    }

    readAndLoadActions(global['action'], __dirname);
}
