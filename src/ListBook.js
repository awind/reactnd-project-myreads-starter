import React, {Component} from 'react'
import SelectMenu from './SelectMenu'

class ListBook extends Component {

    render() {
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map((book) => 
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <SelectMenu />
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors && (book.authors.reduce((prev, cur) => `${prev}, ${cur}`))}</div>
                            </div>
                        </li>
                    )}
                </ol>
            </div>
        )
    }
}

export default ListBook