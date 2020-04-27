import emailService from '../../services/emailService.js'


export class EmailDetails extends React.Component {
    state = {
        email: null
    }

    componentDidMount() {
        this.loadEmail();
    }

    loadEmail() {
        console.log('loadEmail props',this.props);
        
        const id = this.props.match.params.emailId;
        emailService.getById(id)
            .then(email => {
                this.setState({ email })
            })
    }

    onToggleStar = () => {
        emailService.toggleIsImportant(this.state.email.id )
        .then((email) => {
            console.log('from component', this.state.star);
            this.setState({email})
        })
    }

    checkClassName() {
        if (this.state.star) {
            return 'fas fa-star'
        }
        return 'far fa-star'
    }

    removeEmail = () => {
        emailService.remove(this.state.email.id)
            .then(() => {
                this.props.history.push('/email')
            })
            .catch(err => {
                alert('OOPs, try again');
            })
    }
    onCloseEmail = () => {
        this.props.history.push('/email')
    }

    showSentAtAsDate = (sentAt) => {
        let date = new Date(sentAt)
        if (date.getDate() === new Date().getDate()) return `${date.getHours()}:${date.getMinutes()}`
        return `${date.getDate()}/${date.getMonth() + 1}`
    }


    render() {
        const { email } = this.state
        const loading = <p>Loading...</p>
        if (email) console.log('when load email.isImportant', email.isImportant);

        return (
            (!email) ? loading : <div className="email-details-container">
                <div className="top-buttons-container">
                    <section className="top-buttons">
                        <button >
                            <i className="fas fa-reply"></i>
                        </button>
                        <button className={(email.isImportant) ? 'fas fa-star' : 'far fa-star'} onClick={() => {
                            this.onToggleStar();


                        }}>
                        </button>
                        <button onClick={this.removeEmail}>
                            <i className="fas fa-trash"></i>
                        </button>
                        <button onClick={this.onCloseEmail}>
                            <i className="fas fa-times-circle"></i>
                        </button>
                    </section>
                </div>
                <div className="email-body">
                    <h2> sent by:{email.sentBy} </h2>
                    <h1>subject: {email.subject}</h1>
                    <p>{email.body}</p>
                    <p>date: {this.showSentAtAsDate(email.sentAt)}</p>
                </div>
            </div>
        )
    }
}
