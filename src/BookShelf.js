import React, {Component} from 'react'
import ListBook from './ListBook'

class BookShelf extends Component {

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <ListBook books={this.props.books} />
            </div>
        )
    }
}

export default BookShelf