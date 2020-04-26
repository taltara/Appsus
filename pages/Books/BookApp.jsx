import bookService from '../../services/bookService.js'
import storageService from '../../services/storageService.js'
import BookFilter from '../../cmps/Books/BookFilter.jsx'
import { BookAdd } from '../../cmps/Books/BookAdd.jsx'
import { BookList } from '../../cmps/Books/BookList.jsx';
import { eventBus } from "../../services/eventBusService.js";

export class BookApp extends React.Component {

    state = {
        books: null,
        filterBy: null,
        showFilter: false,
        showSearch: false,
    }

    componentDidMount() {
        this.loadBooks();
        storageService.store('currSearch', null);
    }

    loadBooks() {
        bookService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books });
            });
    }

    onNewBook = (book) => {

        console.log(book);
        bookService.add(book);
        this.loadBooks();
        eventBus.emit('show-msg', { txt: `'${book.title}'`, url: `/#/books/${book.name}/${book.id}` });
    }

    onSaveBook = (book) => {
        bookService.save(book)
        this.setState({ bookIdToEdit: null })
        this.loadBooks()
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({ filterBy: filterBy }, () => this.loadBooks());
    }

    onShowFilter = () => { this.setState(({ showFilter }) => ({ showFilter: !showFilter })) }
    onShowSearch = () => { this.setState(({ showSearch }) => ({ showSearch: !showSearch })) }


    render() {
        const { books, showFilter, showSearch } = this.state
        return (

            <main className="books-app flex column container">
                <p className="collection-header">Collection</p>
                <section className="main-section flex column">
                    <header className="tools-header flex align-center space-between">

                        <img src="../assets/img/add-book.png" title="Add Book" className={`tool-img ${(showSearch) ? 'in-use' : ''}`} onClick={this.onShowSearch} />
                        <img src="../assets/img/filter.png" title="Filter Collection" className={`tool-img ${(showFilter) ? 'in-use' : ''}`} onClick={this.onShowFilter} />

                    </header>
                    {showSearch && <BookAdd onNewBook={this.onNewBook} onShowSearch={this.onShowSearch} />}
                    {showFilter && <BookFilter onSetFilter={this.onSetFilter} onShowFilter={this.onShowFilter} isSearchShown={showSearch} />}
                    {books &&
                        <BookList books={books} loadBooks={this.loadBooks} />}
                </section>

            </main>
        )
    }
}