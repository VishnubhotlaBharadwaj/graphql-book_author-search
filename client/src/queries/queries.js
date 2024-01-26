import { gql } from "apollo-boost";

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

const getauthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

export {getauthorsQuery, getBooksQuery};