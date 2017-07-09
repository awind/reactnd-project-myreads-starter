import React, {Component} from 'react'
import SelectMenu from './SelectMenu'

class ListBook extends Component {

    // constructor(props) {
    //     super(props)
    //     this.refresh = this.refresh.bind(this)
    // }

    // refresh(book, shelf) {
    //     this.props.callbackToParent(book, shelf)
    //     console.log('refresh listbook')
    // }

    render() {
        const books = this.props.books
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => 
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <SelectMenu book={book} updateShelf={(book, shelf) => this.props.callbackToParent(book, shelf)} />
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