import emailService from '../../services/emailService.js'


export class EmailDetails extends React.Component {
    state = {
        email: null,
        star: false
    }

    componentDidMount() {
        this.loadEmail();
    }

    loadEmail() {
        const id = this.props.match.params.emailId;
        emailService.getById(id)
            .then(email => {
                this.setState({ email })
            })
    }


    onToggleStar = () => {
        this.setState((prevState) => {
            return {
                star: !prevState.star
            }
        })
        console.log(this.state.star);
        emailService.isStar(this.state.email.id,this.state.star);
    }

    checkClassName() {
        if (this.state.star) {
            return 'far fa-star'
        }
        return 'fas fa-star'
    }

    removeEmail = () => {
        emailService.remove(this.state.email.id)
            .then(() => {
                this.props.history.push('/email')
            })
            .catch(err => {
                alert('OOPs, try again');
                console.log('ERR:', err);
            })
    }



    render() {
        const { email } = this.state
        const loading = <p>Loading...</p>

        return (
            (!email) ? loading : <div className="email-details-container">
                <div className="email-details">
                    <section className="top-buttons">
                        <button >
                            <i className="fas fa-reply"></i>
                        </button>
                        <button className={this.checkClassName()} onClick={() => {
                            // emailService.isMarked(email.id)
                            this.onToggleStar();
                        }}>
                        </button>
                        <button onClick={this.removeEmail}>
                            <i className="fas fa-trash"></i>
                        </button>
                        <button onClick={() =>
                            emailService.onExpand(email.id)}>
                            <i className="fas fa-expand-arrows-alt"></i>
                        </button>
                    </section>
                    <h2> {email.sentBy} </h2>
                    <p>{email.subject}</p>
                    <p>{email.body}</p>
                </div>
            </div >
        )
    }
}
