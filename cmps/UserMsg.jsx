import {eventBus} from '../services/eventBusService.js'
import { MsgCmp } from 'Books/MsgCmp.jsx';

export class UserMsg extends React.Component {
    state = {msg: null}
    
    componentDidMount() {
        this.unsubscribeFromEventBus = eventBus.on('show-msg', (msg)=>{
            const delay = 3000;
            this.setState({msg})
            setTimeout(()=>{
                this.setState({msg: null})
            }, delay)
        })
    }

    componentWillUnmount() {

        this.unsubscribeFromEventBus();
    }

    onRemoveMsg = () => {

        this.setState({ msg: null })
    }

    render() {
        const {msg} = this.state
        return (!msg)? '' : <MsgCmp msg={msg} onRemoveMsg={this.onRemoveMsg} />
    }
}