import React, {Component} from 'react'
import ListBook from './ListBook'

class BookShelf extends Component {

    render() {
        const books = this.props.books
        if (books.length > 0) {
            return (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.title}</h2>
                    <ListBook books={this.props.books} callbackToParent={(book, shelf) => this.props.updateShelf(book, shelf)} />
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
        
    }
}

export default BookShelf