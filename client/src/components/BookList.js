import React, {Component} from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

class BookList extends Component{
    displayBooks(){
        const {data} = this.props;
        if(data.loading){
            return(<div>
                Loading Books..!
            </div>);
        } else {
            return data.books.map(book => {
                return(
                    <li key={book.id}>
                        {book.name}
                    </li>
                );
            })
        }
    }
    render(){
        console.log(this.props);
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
            </div>
        );
    }
}
 
export default graphql(getBooksQuery)(BookList);
  