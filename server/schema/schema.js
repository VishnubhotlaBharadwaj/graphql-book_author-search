const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

var books = [
    {id: "1", name: "Name of the wind", genre: 'Fantasy'},
    {id: "2", name: "The Final Empire", genre: 'Fantasy'},
    {id: "3", name: "The Long Earth", genre: 'Sci-Fi'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args){
                // code to get data from db/ other source
                return _.find(books, {id: args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});