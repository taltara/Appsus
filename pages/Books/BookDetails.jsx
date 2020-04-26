import { LongTxt } from '../../cmps/Books/LongTxt.jsx';
import bookService from '../../services/bookService.js';
import { ReviewAdd } from '../../cmps/Books/ReviewAdd.jsx'
const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {

    state = {

        book: null,
        addClass: '',
        isLongTxtShown: undefined,
        bookDesc: '',
        showAddReview: false,
    }

    onDelete = (bookId) => {
        bookService.remove(bookId);
        // this.onClearSelected();
        this.props.history.goBack();
    }


    onClearSelected = () => {
        this.setState({ selectedBook: null })
    }

    loadBook(id) {
        console.log(id);
        bookService.getById(id)
            .then(book => {
                console.log(book);

                let bookDesc = book.description;
                let isLongTxtShown = (bookDesc.length > 100) ? false : undefined;
                this.setState({ bookDesc, isLongTxtShown, book });
            }),
            (error) => {
                console.error(error);
            }
    }

    componentDidMount() {

        const id = this.props.match.params.bookId;
        this.loadBook(id);
        console.log(id);


        this.prevNext = bookService.getNextPrevCars(id);
    }

    componentDidUpdate(prevProps) {

        const id = this.props.match.params.bookId;


        this.prevNext = bookService.getNextPrevCars(id);
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            console.log('Route changed, so we should load the new car');
            this.loadBook(this.props.match.params.bookId);
            this.setState({ addClass: '' });
        }
    }

    onRemoveReview = (bookId, reviewId) => {

        bookService.getById(bookId)
            .then(book => {
                // console.log(book, review);
                let reviews = book.reviews.slice();
                let reviewIdx = reviews.findIndex(review => {

                    return review.id === reviewId;
                })
                reviews.splice(reviewIdx, 1);
                book.reviews = [...reviews];
                bookService.save(book);

                this.setState({ book: book });
            });
    }

    onAddReview = (bookId, review) => {

        bookService.getById(bookId)
            .then(book => {
                console.log(book, review);

                (book.reviews) ? book.reviews.push(review) : book.reviews = [review];
                bookService.save(book);

                this.setState({ book: book });
            });
    }

    onShowReviewForm = () => {
        console.log('here');

        this.setState(({ showAddReview }) => ({ showAddReview: !showAddReview }));
    }

    toggleDescLength = () => {

        if (this.state.isLongTxtShown === undefined) return;

        this.setState(({ isLongTxtShown }) => ({ isLongTxtShown: !isLongTxtShown }));
    }

    onLoadShowImg = () => {

        this.setState({ addClass: 'show' });
    }

    render() {

        const Loading = <p>Loading...</p>
        const { history } = this.props
        const { bookDesc, book, showAddReview, addClass } = this.state
        // const { prev, next } = this.prevNext;

        if (book) {

            var lengthNote;
            var ageNote;
            var priceClassAdd;
            var isOnSale = book.listPrice.isOnSale;

            let pageCount = +book.pageCount;
            let publishedDate = +book.publishedDate;
            let priceAmount = +book.listPrice.amount;

            let currDate = new Date();
            let yearDiff = currDate.getFullYear() - publishedDate;

            if (pageCount > 500) lengthNote = 'Long Reading';
            else if (pageCount > 200) lengthNote = 'Decent Reading';
            else lengthNote = 'Light Reading';

            if (yearDiff > 10) ageNote = 'Veteren Book';
            else if (yearDiff <= 1) ageNote = 'New!';
            else ageNote = null;

            if (priceAmount > 150) priceClassAdd = 'red-title';
            else if (priceAmount < 20) priceClassAdd = 'green-title';
            else priceClassAdd = null;
        }


        return (
            ((!book) ? Loading : <div className="container details-container">
                <div className="upper-controls flex space-between">


                </div>
                <div className="book-details-grid grid">

                    <main className="book-details flex column align-center">
                        <span className="book-description-header flex space-between align-center"><button onClick={() => history.goBack()} className="back-btn btn">Back</button>
                            <p className={`book-title ${priceClassAdd}`}>{book.title}</p>
                            <span className="on-sale-span">{isOnSale && <img src="../assets/img/sale.png" className="sale-icon" />}</span>
                        </span>
                        <p className="book-subtitle">{book.subtitle}</p>
                        <div className="book-authors flex space-evenly">
                            {
                                book.authors.map((author, idx) =>

                                    <p className="book-author" key={idx}>{author}</p>
                                )
                            }
                        </div>
                        {ageNote && <p className="date-note note">-{ageNote}-</p>}
                        <img src={book.thumbnail} className={`book-img ${addClass}`} onLoad={this.onLoadShowImg} />
                        {lengthNote && <p className="length-note note">-{lengthNote}-</p>}
                        <div className="book-categories flex space-evenly">
                            {
                                book.categories.map((category, idx, array) =>

                                    <p className="book-category" key={idx}>{category}{((idx + 1) === array.length) ? '' : ','}</p>
                                )
                            }
                        </div>

                        <span className="flex align-center"><p className="price-amount">{book.listPrice.amount}</p><span className="preview-currency">{book.listPrice.currencyCode}</span></span>

                        <LongTxt text={bookDesc} isLongTxtShown={this.state.isLongTxtShown} toggleDescLength={this.toggleDescLength} update={this.onShowReviewForm} />
                        <button onClick={() => this.onDelete(book.id)} className="btn">Delete</button>
                        <p className="book-id">[ Id:  {book.id} ]</p>
                        <span className="nav-books grid">

                            <Link to={`/books/${this.prevNext.prev.prevTitle}/${this.prevNext.prev.prevId}`} className="can-press">Prev</Link>
                            <Link to={`/books/${this.prevNext.next.nextTitle}/${this.prevNext.next.nextId}`} className="can-press">Next</Link>
                        </span>
                    </main>
                    <div className="book-reviews flex column align-center">

                        {!showAddReview && <p className="review-title can-press" onClick={this.onShowReviewForm}>Click To Review</p>}
                        {showAddReview && <ReviewAdd book={book} onAddReview={this.onAddReview} onShowReviewForm={this.onShowReviewForm} />}
                        {
                            book.reviews.map((review, idx) =>
                                <div className={`book-review flex column review-${(idx % 2) ? 'odd' : 'even'} ${(!showAddReview && !idx) ? 'top-el' : ''}`} key={idx}>
                                    <span className="review-head flex space-between"><p className="review-name">{review.reviewer}</p>
                                        <span className="remove-review flex space-center align-center" onClick={() => { this.onRemoveReview(book.id, review.id) }}>X</span></span>
                                    <span className="flex align-center"><label htmlFor="" className="muted rating-label">Rating:</label><span className="review-rating">{review.rating}</span></span>
                                    <span className="flex align-center column">
                                        <label htmlFor="" className="muted review-label">Review:</label>
                                        <LongTxt text={review.text} className="review-text" />
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>)
        )
    }
}