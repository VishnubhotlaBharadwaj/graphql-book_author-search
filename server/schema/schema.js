const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// var books = [
//     {id: "1", name: "Name of the wind", genre: 'Fantasy', authorId: "1"},
//     {id: "2", name: "The Final Empire", genre: 'Fantasy', authorId: "2"},
//     {id: "3", name: "The Long Earth", genre: 'Sci-Fi', authorId: "3"},
//     {id: "4", name: "The Hero of Ages", genre: 'Fantasy', authorId: "2"},
//     {id: "5", name: "The Color of Magic", genre: 'Fantasy', authorId: "3"},
//     {id: "6", name: "The List Fantastic", genre: 'Fantasy', authorId: "3"}
// ];

// var authors = [
//     {id: "1", name: "Hari", age: 36},
//     {id: "2", name: "Ram", age: 42},
//     {id: "3", name: "krish", age: 54},
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parentValue, args){
                //return _.find(authors, {id: parentValue.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
              type: new GraphQLList(BookType),
              resolve(parentValue, args){
                //return _.filter(books, {authorId: parentValue.id});
              }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, args){
                // code to get data from db/ other source
                //return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, args){
                //return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args){
                //return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parentValue, args){
                //return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});