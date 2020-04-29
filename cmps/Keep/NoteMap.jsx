import { NoteTools } from 'NoteTools.jsx';

export class NoteMap extends React.Component {

    constructor() {
        super();
        this.map = React.createRef();
        this.savingTimeout = null;
        this.transitionTimeout = null;
        this.transition = false;
    }

    state = {
        title: '',
        searchValue: '',
        isPinned: '',
        opacityClass: '',
        saving: false,
        hovering: false,
        labels: [],
        style: { backgroundColor: "#3A3B3E" },
        toDelete: false,
    };

    componentDidMount() {
        // console.log(this.props.note);

        var searchValue = this.props.note.info.mapSearch;
        this.getLocationData(searchValue);

        this.setState({
            title: this.props.note.info.title,
            imgUrl: this.props.note.info.searchValue,
            isPinned: this.props.note.isPinned,
            toDelete: this.props.note.toDelete,
            labels: this.props.note.labels
        });

    }

    componentDidUpdate() {

        // if (this.state.opacityClass === '' && this.props.addClass != '') {
        //     setTimeout(() => {
        //         this.setState({ opacityClass: 'show-note' });

        //     }, 150);
        // } else if (this.state.opacityClass != '' && this.props.addClass === '') {

        //     setTimeout(() => {
        //         this.setState({ opacityClass: '' });

        //     }, 50);
        // }
    }

    componentWillUnmount() {

        clearTimeout(this.transitionTimeout);
    }

    getLocationData(searchValue) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=AIzaSyC5ayRzgQ3VwMWHFPVa8iRTCJhuEx3Onwo`)
            .then(res => { return res.json() })
            .then(res => { return (res.results[0]) ? res.results[0].geometry.location : { lat: null, lng: null } })
            .then(res => { this.initMap(res.lat, res.lng) })
            .catch(error => { console.log(error) })
    }


    handleUpdateTimeout = (delay = 2000) => {

        this.savingTimeout = setTimeout(() => {
            let note = { ...this.props.note };
            note.isPinned = this.state.isPinned;
            note.info.title = this.state.title;
            note.info.mapSearch = this.state.searchValue;
            note.style = this.state.style;
            note.toDelete = this.state.toDelete;
            note.labels = this.state.labels;

            this.props.saveNote(note);
            this.setState({ saving: false });
            // this.state.saving = false;
        }, delay);
    }

    onRemoveNote = () => {
        this.avoidClickPropagation();
        if (this.state.toDelete) {
            this.props.deleteNote(this.props.note);
        } else {
            console.log('here');
            this.handleTools('delete');
        }
    }

    onSaveNote = (delay = 2000) => {

        if (this.state.saving) {

            clearInterval(this.savingTimeout);
            this.handleUpdateTimeout(delay);

        } else {

            this.setState({ saving: true }, () => {

                this.handleUpdateTimeout(delay);
            })
        }
    }

    handleChange = ({ target }) => {

        console.log(target);
        const field = target.name
        const value = target.value;
        this.setState(({ [field]: value }), () => {

            this.onSaveNote();
        });

    }

    initMap(lat = null, lng = null) {

        var centerOn;
        if (!lat || !lng) {
            // Secret
            centerOn = { lat: 32.088119, lng: 34.803056 };
        } else {

            centerOn = { lat, lng };
        }
        // var elMap = document.querySelector('#map');

        var options = { center: centerOn, zoom: 15, gestureHandling: 'greedy' };
        var map = new google.maps.Map(this.map.current, options);
        var marker = new google.maps.Marker({ position: centerOn, map: map });
    }

    handleTools = (action) => {

        if (action === 'pin') {
            console.log(this.state);
            this.transition = true;
            this.setState(({ isPinned }) => ({ isPinned: !isPinned }),
                () => {
                    this.onSaveNote(0);
                });
            this.transitionTimeout = setTimeout(() => {
                this.transition = false;
            }, 200);

        } else if (action === 'delete') {

            this.transition = true;
            this.setState({ toDelete: true }, () => {
                console.log(this.state);
                this.onSaveNote(0)
            });
            this.transitionTimeout = setTimeout(() => {
                this.transition = false;
            }, 200);
        }
    }

    onHover = () => {

        this.setState(({ hovering }) => ({ hovering: !hovering }));
    }

    onClick = () => {
        if (this.transition) return;
        if(this.state.toDelete) {

            this.setState({ toDelete: false }, () => {

                this.onSaveNote(0);
            });

        } else {

            this.props.toggleView(this.props.note.id, this.props.note.isPinned);
        }
    }

    updateFromTools = (update, type) => {
        console.log(update);

        if(type === 'style') {

            this.setState(({ style }) => ({ style: { ...style, ...update} }), () => {
                console.log(this.state.style);
                this.onSaveNote(0);
            });
        } else if (type === 'label') {

            let labels = this.state.labels;
            labels.push(update);
            console.log(labels);
            this.setState(({ labels: labels }), () => {
                console.log(this.state.labels);
                this.onSaveNote(0);
            });
        }
    }

    avoidClickPropagation = () => {
        
        if(!this.transition) {

            this.transition = true;
            this.transitionTimeout = setTimeout(() => {
                this.transition = false;
            }, 200);
        }
        
    }

    render() {
        const { opacityClass, title, hovering, style } = this.state;
        const { addClass } = this.props;
        return (
            <div className={`note note-map flex column align-center space-center ${addClass} ${opacityClass}`}
                onClick={() => this.onClick()} onMouseEnter={this.onHover} onMouseLeave={this.onHover} style={style}>
                <span className="note-header flex align-center space-center">
                    <input type="text" name="title" className="title" defaultValue={title} 
                    onChange={this.handleChange} placeholder="Title" />
                    <img src="../assets/img/keep/pin.png" className={`tool-pin tool ${(hovering) ? 'show-tool' : ''}`} onClick={() => this.handleTools('pin')} />
                </span>
                <span className="map-span">
                    <div className="map" ref={this.map}></div>
                </span>
                <NoteTools hovering={hovering} updateFromTools={this.updateFromTools} 
                avoidClickPropagation={this.avoidClickPropagation} onRemoveNote={this.onRemoveNote} />
            </div>
        )
    }
};