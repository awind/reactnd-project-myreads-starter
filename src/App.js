import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import OpenSearch from './OpenSearch'

class BooksApp extends Component {

  constructor(props) {
    super(props)
    this.state = {books: []}
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  refresh(book, shelf) {
    console.log(book)
    console.log(shelf)
    // console.log(this.state.books)
    BooksAPI.update(book, shelf)
      .then(() => 
        this.setState(state => {
          const newBooks = state.books.map(item => {
              item.shelf = item.id === book.id ? shelf : item.shelf
              return item
            }
            )
          console.log(newBooks)
          return {
            books: newBooks
          }
        })
    )
  }

  render() {
    const read = this.state.books.filter((book) => book.shelf === 'read')
    const currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
    const none = this.state.books.filter((book) => book.shelf === 'none')
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf title="Currently Reading" books={currentlyReading} updateShelf={(book, shelf) => this.refresh(book, shelf)} />
                  <BookShelf title="Want To Read" books={wantToRead} updateShelf={(book, shelf) => this.refresh(book, shelf)} />
                  <BookShelf title="Read" books={read} updateShelf={(book, shelf) => this.refresh(book, shelf)} />
                  <BookShelf title="None" books={none} updateShelf={(book, shelf) => this.refresh(book, shelf)} />
                </div>
              </div>
              <OpenSearch onOpenSearchPage={this.openSearchPage} />
            </div>
        )}>
        </Route>

        <Route exact path='/search' render={() => (
          <SearchPage />
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
