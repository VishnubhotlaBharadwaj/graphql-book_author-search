const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://Vissu:6262@book-author.wocoemb.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('Connected to DataBase..');
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});