import React, {Component} from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBook from './ListBook'
import DebounceInput from 'react-debounce-input';

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            books: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({query: event.target.value})
        BooksAPI.search(this.state.query).then((books) => {
            console.log(books)
            this.setState({books: books})
        })
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
                    <ListBook books={this.state.books} />
                </div>
              </div>
          </div>
          )
    }
}

export default SearchBar