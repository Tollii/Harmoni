const PORT = 8080; // default port to listen
const server = require('./server');

// Start server
server.listen( PORT, () => {
    console.log( `server started at http://localhost:${ PORT }` );
} );
