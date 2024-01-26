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
    GraphQLList,
    GraphQLNonNull
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
//     {id: "1", name: "Shiva", age: 40},
//     {id: "2", name: "Hari", age: 32},
//     {id: "3", name: "krish", age: 52},
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
                return Author.findById(parentValue.authorId);
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
                return Book.find({authorId: parentValue.id});
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
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, args){
                //return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args){
                //return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parentValue, args){
                //return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});