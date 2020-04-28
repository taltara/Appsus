export class NoteMap extends React.Component {

    constructor() {
        super();
        this.map = React.createRef();
        this.savingTimeout = null;
    }

    state = {
        title: '',
        searchValue: '',
        isPinned: '',
        opacityClass: '',
        saving: false
    };

    componentDidMount() {
        // console.log(this.props.note);

        var searchValue = this.props.note.info.mapSearch;
        this.getLocationData(searchValue);

        this.setState({
            title: this.props.note.info.title,
            imgUrl: this.props.note.info.searchValue,
            isPinned: this.props.note.isPinned
        });

    }

    componentDidUpdate() {

        if(this.state.opacityClass === '' && this.props.addClass != ''){
            setTimeout(() => {
                this.setState({ opacityClass: 'show-note'});
                
            }, 150);
        } else if (this.state.opacityClass != '' && this.props.addClass === ''){

            setTimeout(() => {
                this.setState({ opacityClass: ''});
                
            }, 50);
        }
    }

    getLocationData(searchValue) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=AIzaSyC5ayRzgQ3VwMWHFPVa8iRTCJhuEx3Onwo`)
            .then(res => { return res.json() })
            .then(res => { return (res.results[0]) ? res.results[0].geometry.location : {lat: null, lng: null}})
            .then(res => { this.initMap(res.lat, res.lng) })
    }


    handleUpdateTimeout = () => {

        this.savingTimeout = setTimeout(() => {
            let note = { ...this.props.note };
            note.isPinned = this.state.isPinned;
            note.info.title = this.state.title;
            note.info.mapSearch = this.state.searchValue;

            this.props.saveNote(note);
            this.state.saving = false;
        }, 2000);
    }

    onSaveNote = () => {

        if(this.state.saving) {
    
            clearInterval(this.savingTimeout);
            this.handleUpdateTimeout();
            
        } else {
            
            this.setState({ saving: true }, () => {

                this.handleUpdateTimeout();
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
        var marker = new google.maps.Marker({position: centerOn, map: map});
    }

    render() {
        const { opacityClass, title } = this.state;
        const { addClass, toggleView, note } = this.props;
        return (
            <div className={`note note-map flex column align-center space-center ${addClass} ${opacityClass}`} onClick={() => toggleView(note.id, note.isPinned)}>
                <input type="text" name="title" className="title" defaultValue={title} onChange={this.handleChange} />
                <span className="map-span">
                    <div className="map" ref={this.map}></div>
                </span>
            </div>
        )
    }
};