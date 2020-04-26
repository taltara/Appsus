


export class LongTxt extends React.Component {

    state = {

        text: '',
        classToAdd: '',
        isLongShown: false
    }

    componentDidMount() {

        if(this.props.isLongTxtShown != undefined) return;

        let text = this.props.text;
        let classToAdd = (text.length > 100) ? 'can-press' : '';

        this.setState({ text, classToAdd });
    }
   
    componentDidUpdate() {

        if(this.props.isLongTxtShown != undefined) return;


    }

    // textToRender = (isLongTxtShown) ? text : text.slice(0, 100);
    // classToAdd = 'can-press';

    toggleText = () => {

        this.setState(({isLongShown}) => ({ isLongShown: !isLongShown }));
    }

    render() {
        const { text, isLongTxtShown, toggleDescLength } = this.props;
        const { isLongShown } = this.state;
        return (
            <div className="text-area">

                {isLongTxtShown != undefined && <p className={`description ${(text.length > 100) ? 'can-press' : ''}`} onClick={toggleDescLength}>{(isLongTxtShown) ? text : text.slice(0, 100)}</p>}
                {isLongTxtShown === undefined && <p className={`description ${this.state.classToAdd}`} onClick={this.toggleText}>{(isLongShown) ? this.state.text : this.state.text.slice(0, 100)}</p>}

            </div>

        )

    }

}