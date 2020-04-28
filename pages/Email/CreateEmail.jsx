import { eventBus } from '../../services/eventBusService.js'
import emailService from '../../services/emailService.js'

export class CreateEmail extends React.Component {
    state = {
        emailReply: {
            to: '',
            cc: '',
            subject: '',
            body: '',
        },
        isShowen: false
    }

    componentDidMount() {
        // console.log(this.props.match.emailId);

        // var email = emailService.getById(this.props.match.params.emailId);
        // if(!email) email = this.state.email;
        this.unsubscribeFromEventBus = eventBus.on('create-email', (email) => {
            // if (!email) email = this.state.emailReplay
            console.log(email);
            
            this.setState({
                isShowen: true,
                emailReply: {
                    to: email? email.sentBy : '',
                    cc: null,
                    subject: email? 'replay for ' + email.subject : '',
                    body: null
                }
            }, () => {
                console.log(this.state.emailReply);

            })
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromEventBus();
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }))
    }

    onChange(ev) {
        ev.preventDefault();
    }
    onClose = () => {
        this.setState({ isShowen: false });
    }

    onSend = ()=>{
        emailService.sendEmail(this.state.emailReply);
        this.onClose();
        eventBus.emit('msg-email', 'email sent!')
    }

    render() {
        const { emailReply, isShowen } = this.state

        return (
            (!isShowen) ? '' : <div className="modal-wrapper">
                <div className="modal-content">
                    <form className="flex column new-mail-form" action="" method="post" onSubmit={this.onChange}>
                        <div className="new-mail-form-title">Send New Mail</div>
                        <span>
                            <label htmlFor="new-mail-subject">To: {emailReply.to}</label>
                            <input type="email" id="new-mail-to" name="to" placeholder={(emailReply.to) ? '' : 'E.g shalom@gmail.com'} required="" onChange={this.handleChange} />
                        </span>
                        <span>
                            <label htmlFor="new-mail-cc">Cc:</label>
                            <input type="text" id="new-mail-cc" name="cc" placeholder="Copies to" onChange={this.handleChange} />
                        </span>
                        <span><label htmlFor="new-mail-subject">Subject: {emailReply.subject}</label>
                            <input type="text" id="new-mail-subject" name="subject" placeholder={(emailReply.subject) ? '' : 'Mail Subject'} required="" onChange={this.handleChange} />
                        </span>
                        <textarea name="body" placeholder="Your mail: " required="" onChange={this.handleChange}>
                        </textarea>
                        <div className="new-mail-form-buttons flex space-between align-center">
                            <button className="dismiss normal-trans" onClick={this.onClose}><i className="fas fa-times"></i></button>
                            <button className="send normal-trans" onClick={this.onSend}><i className="fas fa-paper-plane"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}