import { eventBus } from '../../services/eventBusService.js'

export class MessageCreateEmail extends React.Component {
    state = { msg: null }

    componentDidMount() {
        this.unsubscribeFromEventBus = eventBus.on('msg-email', (msg) => {
            const time = 3000;
            this.setState({ msg })
            setTimeout(() => {
                this.setState({ msg:null })
            }, time)
        })
    }

    componentWillUnmount() {

        this.unsubscribeFromEventBus();
    }

    onRemoveMsg = () => {

        this.setState({ msg: null })
    }

    render() {
        const { msg } = this.state
        return (!msg) ? '' : <div className="msg-email-container flex">
            <div className="msg-email">{msg}</div>
        </div>
    }
}