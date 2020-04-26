const { Link } = ReactRouterDOM

export class BookPreview extends React.Component {

    state = {

        className: '',
    }

    onLoadPreview = () => {
        setTimeout(() => {

            this.setState({ className: 'show' });
        }, Math.floor(Math.random() * 75));
    }

    render() {

        const { className: className } = this.state;
        const { book } = this.props;
        return (
            <Link to={`/books/${book.title}/${book.id}`}>
                <article className={`book-preview flex column align-center space-center ${className}`}>

                    <span className="title-span flex align-center wrap">{book.title}</span>
                    <img src={book.thumbnail} onLoad={this.onLoadPreview} />
                    <span className="price-span flex space-between align-center"><span className="preview-desc">Price:</span>
                        <span className="flex align-center"><p className="price-amount">{book.listPrice.amount}</p>
                            <span className="preview-currency">{book.listPrice.currencyCode}</span></span></span>
                </article>
            </Link>

        )

    }
}