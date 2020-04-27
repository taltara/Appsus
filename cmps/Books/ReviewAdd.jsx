import utilService from '../../services/utilService.js';

export class ReviewAdd extends React.Component {

    constructor() {
        super();
        this.firstInput = React.createRef();
    }

    state = {


    }
    
    componentDidMount() {
        
        this.firstInput.current.focus()
    }
    
    createReview = ({ target }) => {
        event.preventDefault()
        
        let reviewer = target[0].value;
        let rating = target[1].value;
        let text = target[2].value;
        let currDate = Date.now();
        this.props.onAddReview(this.props.book.id, { id: utilService.makeId(), reviewer, rating, text, currDate });

        this.props.onShowReviewForm();
    }
    
    render() {
        
        const { onShowReviewForm } = this.props;
        
        return (
            <React.Fragment>
                <p className="review-title can-press" onClick={onShowReviewForm}>Review</p>
                <form onSubmit={this.createReview} className="review-form flex column space-between">
                    <label htmlFor="">Name:</label>
                    <input type="text" name="reviewer" placeholder="Name" ref={this.firstInput}/>
                    <label htmlFor="">Rating:</label>
                    <select className="set-rating btn" name="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label htmlFor="">Review:</label>
                    <textarea name="text" className="review-text" placeholder="Thoughts?" rows="5"></textarea>
                    <button className="review-submit-btn btn">Review!</button>
                </form>
            </React.Fragment>
        );
    }
}