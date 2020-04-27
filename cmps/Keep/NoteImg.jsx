
export class NoteImg extends React.Component {

    constructor() {
        super();
    }

    state = {

        title: '',
        imgUrl: '',
        style: {},
        opacityClass: '',
        hiddenClass: 'hidden-img'
    };

    componentDidMount() {
        console.log(this.props.note);
        this.setState({ 
            title: this.props.note.info.title,
            imgUrl: this.props.note.info.imgUrl,
            style: this.props.note.style
        });
    }

    componentDidUpdate() {

        if(this.state.opacityClass === '' && this.props.addClass != ''){
            setTimeout(() => {
                this.setState({ opacityClass: 'show-note'});
                
            }, 100);
        } else if (this.state.opacityClass != '' && this.props.addClass === ''){

            setTimeout(() => {
                this.setState({ opacityClass: ''});
                
            }, 150);
        }
    }

    handleChange = ({ target }) => {
        console.log(target);
        const field = target.name
        const value = target.value;

        this.setState(({  [field]: value } ), () => {

        })
    }

    onLoadShowImg = () => {

        this.setState({ hiddenClass: '' });
    }

    render() {
        const { title, imgUrl, opacityClass, style, hiddenClass } = this.state;
        const { toggleView, note, addClass } = this.props;
        return ( //
            <div className={`note note-img flex column align-center space-center ${hiddenClass} ${addClass} ${opacityClass}`} style={style} onClick={() => toggleView(note.id)}>
                <input type="text" className="title" defaultValue={title} onChange={this.handleChange} />
                <img src={imgUrl} alt="" onLoad={this.onLoadShowImg}/>
            </div>
        )
    }
};