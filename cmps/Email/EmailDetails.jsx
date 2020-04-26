import emailService from '../../services/emailService.js' 


export class EmailDetails extends React.Component {
    state = {
        email: null
    }

    componentDidMount(){
        // this.setState({email:this.props})
    }



    render() {
        const { email } = this.props
        console.log('meshi');

        return (
            <tr className="email-details-container">
                <td className="email-details">
                    <section className="top-buttons">
                        <button >
                            <i className="fas fa-reply"></i>
                        </button>
                        <button onClick={()=>emailService.isMarked(email.id)}>
                            <i className="far fa-star"></i>
                        </button>
                        <button onClick={()=>emailService.onRemove(email.id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                        <button onClick={()=>
                            emailService.onExpand(email.id)}>
                            <i className="fas fa-expand-arrows-alt"></i>
                        </button>
                    </section>
                    <h2> {email.sentBy} </h2>
                    <p>{email.subject}</p>
                    <p>{email.body}</p>
                </td>
            </tr >
        )
    }

}
