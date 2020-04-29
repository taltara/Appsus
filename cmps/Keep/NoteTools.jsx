export class NoteTools extends React.Component {

    constructor() {
        super();

    }

    state = {
        style: {

            backgroundColor: "#3A3B3E",
        },
        inFocus: false,
        label: '',
    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    addLabel = () => {
        console.log(event.keyCode);
        console.log(this.state.label);
        if(event.keyCode === 13) {

            this.props.updateFromTools(this.state.label, 'label');
            this.setState({ label: '' });
        }
    }

    handleChange = () => {
        console.log(event);
        console.log(event.target);
        const field = event.target.name
        const value = event.target.value;

        if(field === 'label') {

            this.setState({ [field]: value });
        } else {

            this.setState(({
                style:
                    { [field]: value }
            }), () => {
                console.log(this.state.label);
    
    
                    console.log(this.state);
                    this.props.updateFromTools(this.state.style, 'style');
                
            });
        }
    }

    onFocusToggle = () => {
        this.props.avoidClickPropagation();
        this.setState(({ inFocus }) => ({

            inFocus: !inFocus
        }));
    }

    render() {
        const { backgroundColor } = this.state.style;
        const { hovering, onRemoveNote, avoidClickPropagation, updateLabels } = this.props;
        const { inFocus, label } = this.state;

        const addLabelClass = (inFocus) ? 'label-section-focus' : 'label-section-unfocus';
        return (
            <footer className="note-tools flex align-center space-between">
                <img src="../../assets/img/keep/todo-remove.png" onClick={onRemoveNote}
                    className={`delete-note tool ${(hovering) ? 'show-tool' : ''}`} />
                <input type="text" name="label" onBlur={this.onFocusToggle} onFocus={this.onFocusToggle} maxLength="30"
                    className={`label-input ${addLabelClass} ${(hovering) ? 'show-tool' : ''}`} 
                    placeholder="Add Label" value={label} onChange={this.handleChange} onKeyPress={this.addLabel}/>
                <span className="other-tools">
                    <input type="color" name="backgroundColor" className={`tool color-picker ${(hovering) ? 'show-tool' : ''}`}
                        defaultValue={backgroundColor} onChange={this.handleChange} onClick={() => { avoidClickPropagation() }} />
                </span>
            </footer>
        )
    }
};