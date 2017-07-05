import React, {Component} from 'react'
import SelectMenu from './SelectMenu'

class Book extends Component {

    render() {
        
        return (
            <li key={this.props.item.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.props.item.imageLinks.thumbnail})` }}></div>
                    <SelectMenu />
                    </div>
                    <div className="book-title">{this.props.item.title}</div>
                    <div className="book-authors">{this.props.item.authors.reduce((prev, cur) => `${prev}, ${cur}` )}</div>
                </div>
            </li>
        )
    }
}

export default Book