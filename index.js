const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();

app.listen(3000, () => {
    console.log('Listening...');
})