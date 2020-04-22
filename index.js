//Program Setup
const server = require('./api/server.js');

const PORT = process.env.PORT || 5555;

server.listen(PORT, () => console.log(`\n ~ Running on localhost:${PORT} ~ \n`))