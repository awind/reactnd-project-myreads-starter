import React, {Component} from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import DebounceInput from 'react-debounce-input';

class SearchPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            books: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const query = event.target.value.trim()
        const mainBooks = this.props.mainBooks
        this.setState({query: query})
        if (query) {
            BooksAPI.search(query).then((books) => {
                if (!books.error) {
                    const newBooks = books.map((book) => {
                        const mainBook = mainBooks.find((item) => item.id === book.id)
                        if(mainBook) {
                            book.shelf = mainBook.shelf
                        }
                        return book
                    })

                    this.setState({books: newBooks})
                }
            })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            type="text" placeholder="Search by title or author" 
                            minLength={2}
                            debounceTimeout={500}
                            onChange={this.handleChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>

                <div className="list-books-content">
                    <div>
                        <BookShelf books={this.state.books} updateShelf={(book, shelf) => this.props.addShelf(book, shelf)} />
                    </div>
                </div>

          </div>
          )
    }
}

export default SearchPage