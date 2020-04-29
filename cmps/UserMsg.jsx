import {eventBus} from '../services/eventBusService.js'
import { MsgCmp } from 'Books/MsgCmp.jsx';
import { MicroMsg } from 'Keep/microMsg.jsx';

export class UserMsg extends React.Component {
    state = {msg: null}
    
    componentDidMount() {
        let channel = (this.props.type) ? this.props.type : 'show-msg';
        this.unsubscribeFromEventBus = eventBus.on(channel, (msg)=>{
            const delay = 2000;
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
        const { msg } = this.state;
        const { savedNote } = this.props;
  
        if(msg) {
            if(savedNote) return <MicroMsg msg={msg} onRemoveMsg={this.onRemoveMsg}/>
            else return <MsgCmp msg={msg} onRemoveMsg={this.onRemoveMsg} />
        } 
        return null;
    }
}