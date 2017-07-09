import React, {Component} from 'react'

class SelectMenu extends Component {

    constructor(props) {
        super(props)
        this.moveShelf = this.moveShelf.bind(this)
    }

    moveShelf(event) {
        this.props.updateShelf(this.props.book, event.target.value)
    }

    render() {
        const book = this.props.book
        return (
            <div className="book-shelf-changer">
                <select value={book.shelf} onChange={(this.moveShelf)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default SelectMenu