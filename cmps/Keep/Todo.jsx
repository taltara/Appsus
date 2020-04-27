export class Todo extends React.Component {

    constructor() {
        super();

    }

    state = {

    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    handleChange = ({ target }) => {
        console.log(target);
        const field = target.name
        const value = target.value;

        this.setState(({  [field]: value } ), () => {

        })
    }

    render() {
        const { todo } = this.props;
        console.log(todo);
        return (
            <li className="todo"><input type="text" value={todo.txt} onChange={this.handleChange}/></li>
        )
    }
};