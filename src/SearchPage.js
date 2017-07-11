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
        this.setState({query: query})
        if (query) {
            BooksAPI.search(query).then((books) => {
                if (!books.error) {
                    console.log(books)
                    this.setState({books: books})
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
                        <BookShelf title="Currently Reading" books={this.state.books.filter((book) => book.shelf === 'currentlyReading')} updateShelf={(book, shelf) => this.props.addShelf(book, shelf)} />
                        <BookShelf title="Want To Read" books={this.state.books.filter((book) => book.shelf === 'wantToRead')} updateShelf={(book, shelf) => this.props.addShelf(book, shelf)} />
                        <BookShelf title="Read" books={this.state.books.filter((book) => book.shelf === 'read')} updateShelf={(book, shelf) => this.props.addShelf(book, shelf)} />
                        <BookShelf title="None" books={this.state.books.filter((book) => book.shelf === 'none')} updateShelf={(book, shelf) => this.props.addShelf(book, shelf)} />
                    </div>
                </div>

          </div>
          )
    }
}

export default SearchPage