import React, {Component} from "react";
import {gql} from 'apollo-boost';
import { graphql } from "react-apollo";

const getauthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

class AddBook extends Component{

    render(){
        return (
            <form id=""add-book>

    <div className="field">
        <label>
            Book name:
        </label>
        <input type="text" />
    </div>

    <div className="field">
        <label>
            Genre:
        </label>
        <input type="text" />
    </div>

    <div className="field">
        <label>
            Author:
        </label>
        <select>
            <option>
                Select author
            </option>
        </select>
    </div>

</form>
        );
    }
}
 
export default graphql(getauthorsQuery)(AddBook);