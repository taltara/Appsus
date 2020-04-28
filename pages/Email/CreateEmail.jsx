import { eventBus } from '../../services/eventBusService.js'
import  emailService  from '../../services/emailService.js'

export class CreateEmail extends React.Component {
    state = {
        emailReplay: {
            to: '',
            cc: '',
            subject: '',
            body: ''
        },
        isShowen: false
    }

    componentDidMount() {
        // console.log(this.props.match);
        
        // var email = emailService.getById(this.props.match.params.emailId);
        // if(!email) email = this.state.email;
        this.unsubscribeFromEventBus = eventBus.on('create-email', (email) => {
            // if(!email) email = this.state.emailReplay
            console.log(email);
            this.setState({ isShowen: true, to: email.sentBy, cc: null, subject: 'replay for' + email.subject, body: null })
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromEventBus();
    }

    handleChange = ({ target }) => {
        const field = target.name

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }))
    }

    onChange(ev) {
        ev.preventDefault();
    }

    render() {
        const { emailReplay, isShowen } = this.state   
        console.log(emailReplay);
             
        return (
            (!isShowen) ? '' : <div className="modal-wrapper">
                <div className="modal-content">
                    <form className="flex column new-mail-form" action="" method="post" onSubmit={this.onChange}>
                        <div className="new-mail-form-title">Send New Mail</div>
                        <span>
                            <label htmlFor="new-mail-subject">To: {emailReplay.to}</label>
                            <input type="email" id="new-mail-to"  name="to" placeholder={emailReplay.to} required="" value="" onChange={this.handleChange}/>
                        </span>
                        <span>
                            <label htmlFor="new-mail-cc">Cc:</label>
                            <input type="text" id="new-mail-cc" name="cc" placeholder="Copies to" value="" onChange={this.handleChange}/>
                        </span>
                        <span><label htmlFor="new-mail-subject">Subject: {emailReplay.subject}</label>
                            <input type="text" id="new-mail-subject" name="subject" placeholder="Mail Subject" required="" value="" onChange={this.handleChange}/>
                        </span>
                        <textarea name="body" placeholder="Your mail: " required="" onChange={this.handleChange}>
                        </textarea>
                        <div className="new-mail-form-buttons flex space-between align-center">
                            <button className="dismiss normal-trans"><i className="fas fa-times"></i></button>
                            <button className="send normal-trans"><i className="fas fa-paper-plane"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}