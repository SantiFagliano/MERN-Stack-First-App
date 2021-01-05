require('dotenv').config();

const app = require("./app");
require('./database');

async function main() {
    try {
        await app.listen(app.get('port'));
        console.log('Server on Port', app.get('port'));
    } catch (e) {
        console.error(e.message);
    }

}

main();
