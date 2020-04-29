import emailService from '../../services/emailService.js'
import CreateEmail from './CreateEmail.jsx'
import {eventBus} from '../../services/eventBusService.js'


export class EmailDetails extends React.Component {
    state = {
        email: null
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
        emailService.toggleIsImportant(this.state.email.id )
        .then((email) => {
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

    // showSentAtAsDate = (sentAt) => {
    //     let date = new Date(sentAt)
    //     if (date.getDate() === new Date().getDate()) return `${date.getHours()}:${date.getMinutes()}`
    //     return `${date.getDate()}/${date.getMonth() + 1}`
    // }

    reply(email){
        // console.log(email);
        
        eventBus.emit('create-email', email)
    }

   


    render() {
        const { email } = this.state
        const loading = <p>Loading...</p>

        return (
            (!email) ? loading :
             <div className="email-details-container">
                <div className="top-buttons-container">
                    <section className="top-buttons">
                        <button onClick={()=>
                           this.reply(email)
                        }>
                            <i className="fas fa-reply"></i>
                        </button>
                        <button className={(email.isImportant) ? 'fas fa-star' : 'far fa-star'} onClick={this.onToggleStar}>
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
                    <p className="date-details detail">Sent at: {email.sentAt}</p>
                    <h1 className="send-by-details detail"> Sent by: {email.sentBy} </h1>
                    <h1 className="subject-details detail">Subject: {email.subject}</h1>
                    <p className="body-details detail">{email.body}</p>
                    {email.url && <div className="img-detail"><img src={`${email.url}`}></img></div>}
                </div>
            </div>
        )
    }
}
