

export class BookApiPreview extends React.Component {

    constructor() {
        super();
        this.defaultCover = '../assets/img/default-book.svg';
    }

    state = {

        className: '',
    }

    onLoadPreview = () => {
        setTimeout(() => {

            this.setState({ className: 'show' });
        }, Math.floor(Math.random() * 50));
    }

    render() {

        const { className } = this.state;
        const { res, onSelectBook, idx } = this.props;
        return (

            <div className={`result-card flex column align-center ${className}`} onClick={() => { onSelectBook(idx) }}>
                <p className="result-option">{res.volumeInfo.title}</p>
                <img src={(res.volumeInfo.imageLinks) ? res.volumeInfo.imageLinks.smallThumbnail : this.defaultCover} onLoad={this.onLoadPreview} />
            </div>

        )

    }
}