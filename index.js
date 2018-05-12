const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();

app.use('/graphql', expressGraphQL({
    graphiql: true
}));

const port = 3000;
app.listen(port, () => {
    console.log(`Listinging to port ${port}...`);
})