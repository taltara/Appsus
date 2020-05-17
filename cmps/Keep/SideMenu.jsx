export class SideMenu extends React.Component {

    constructor() {
        super();
        this.labels;
    }

    state = {
        showMenu: false,
        activeTab: 0
    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    onLabelChange = (idx) => {

        if(!this.state.showMenu) return;
        if (this.state.activeTab === idx) return;
        console.log('here');
        this.setState({ activeTab: idx }, () => {
            let labelValue;
            if(!idx) labelValue = [];
            else if (idx === -1) labelValue = { archived: true };
            else if (idx === -2) labelValue = { deleted: true };
            else labelValue = this.labels[idx - 1][0];
 
            this.props.onSearch('', labelValue);
        });
    }

    onHover = () => {

        setTimeout(() => {

            this.setState(({ showMenu }) => ({

                showMenu: !showMenu
            }));

        }, 200);
    }

    render() {
        const { showMenu, activeTab } = this.state;
        const { labels } = this.props;
        // const labels = Object.keys(this.props.labels);
        var sortLabels = [];

        for (var label in labels) {
            sortLabels.push([label, labels[label]]);
        }
        
        // sortLabels.sort(function(a, b) {
        //     return a[1] - b[1];
        // });

        this.labels = sortLabels;

        return (
            <aside className={`side-menu ${(showMenu) ? 'show-menu' : ''}`} onMouseEnter={this.onHover} onMouseLeave={this.onHover}>
                <ul className="labels-list flex column">
                    <span onClick={() => this.onLabelChange(0)} className={`label-span main-label flex align-center ${(!activeTab) ? 'active-navbar' : ''}`}>
                        <li>Notes</li><img className="notes-menu-logo" src="../assets/img/Keep/notes-tag.svg" alt="" /></span>
                    <span className="other-labels flex column align-center space-center">
                    {
                        // sortLabels.slice(0, 5).map((label, i) => {
                        sortLabels.map((label, i) => {

                            return <span key={`${label[0].slice(0, 5) + i}`} onClick={() => this.onLabelChange(i + 1)}
                                className={`label-span label-label flex align-center ${(activeTab === i + 1) ? 'active-navbar': ''}`}><li key={`${label[0].slice(0, 5) + i}`}>{label[0]}</li>
                                <img src="../assets/img/Keep/tag-white.svg" /></span>;
                        })
                    }
                    </span>
                    <span onClick={() => this.onLabelChange(-1)} className={`label-span main-label flex align-center ${(activeTab === -1) ? 'active-navbar' : ''}`}>
                        <li>Archived</li><img className="notes-menu-archived" src="../assets/img/Keep/archive.png" alt="" /></span>
                    <span onClick={() => this.onLabelChange(-2)} className={`label-span main-label flex align-center ${(activeTab === -2) ? 'active-navbar' : ''}`}>
                        <li>Deleted</li><img className="notes-menu-deleted" src="../assets/img/Keep/trash.png" alt="" /></span>
                </ul>

            </aside>
        )
    }
};
