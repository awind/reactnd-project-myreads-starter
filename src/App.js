import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar'
import BookShelf from './BookShelf'
import OpenSearch from './OpenSearch'

class BooksApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      read: [],
      currentlyReading: [],
      wantToRead: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const read = books.filter((book) => book.shelf === 'read')
      const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
      const wantToRead = books.filter((book) => book.shelf === 'wantToRead')
      this.setState({
        read: read,
        currentlyReading: currentlyReading,
        wantToRead: wantToRead
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf title="Currently Reading" books={this.state.currentlyReading} />
                  <BookShelf title="Want To Read" books={this.state.wantToRead} />
                  <BookShelf title="Read" books={this.state.read} />
                </div>
              </div>
              <OpenSearch onOpenSearchPage={this.openSearchPage} />
            </div>
        )}>
        </Route>

        <Route exact path='/search' render={() => (
          <SearchBar />
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
