import {BookPreview} from '../cmps/BookPreview.jsx'
import bookService from '../services/bookService.js'

export function BookList(props) {

    return (
        <div className="book-previews flex wrap align-baseline space-evenly">
            { props.books.map(book => <BookPreview key = { book.id } book = { book } />) }
        </div>
    )
}