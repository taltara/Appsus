
export class About extends React.Component {

    constructor() {
        super();
        this.trollLink = React.createRef();
        this.trollAnimating = false;
    }


    state = {

        animationAdd: {}
    }

    componentDidMount() {
        console.log(this.trollLink);

        this.trollLink.current.focus()
    }

    trollAnimations = () => {

        if (this.trollAnimating) return;

        this.trollAnimating = true;

        var animationsBank = ['rotate', 'rotateY', 'rotateX', 'rotateZ'];
        this.setState({animationAdd: { transform: `${animationsBank[Math.floor(Math.random() * animationsBank.length)]}(${Math.floor(Math.random() * 180)}deg)` }});

        setTimeout(() => {
            this.setState({ animationAdd: { transform: ''} });
            this.trollAnimating = !this.trollAnimating;
        }, 300);
    }


    render() {
        const { animationAdd } = this.state;
        return (

            <section className="about-section container flex column align-center space-center">
                <p className="about-header">About Us</p>
                <p ref={this.trollLink} style={animationAdd} onMouseEnter={this.trollAnimations} className="about-troll">Shhhh.... It's a <a target="_blank" href="https://taltara.github.io/MineSweeper-JS/">secret</a> :)</p>

            </section>

        );

    }


}
