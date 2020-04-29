export class Todo extends React.Component {

    constructor() {
        super();
        this.savingTimeout = null;
        this.isUnmounting = false;
    }

    state = {
        doneAt: null,
        txt: '',
        showDelete: false,
    };

    componentDidMount() {
        console.log(this.props.todo);
        this.setState({
            doneAt: this.props.todo.doneAt,
            txt: this.props.todo.txt,
        });
    }
    componentDidUpdate(prevState) {
        
    }

    componentWillUnmount() {

        this.isUnmounting = true;
        clearTimeout(this.savingTimeout);
    }
 
    handleChange = ({ target }) => {

        console.log(target);
        const field = target.name
        const value = target.value;
        this.setState(({ [field]: value }), () => {

            let txt = this.state.txt;
            let doneAt = this.state.doneAt;
            let todo = { txt, doneAt };
            this.props.handleTodoChange(todo, this.props.todoIdx);
        });

    }

    onTodoDelete = () => {
        this.props.avoidClickPropagation();
        this.props.onRemoveTodo(this.props.todoIdx)
        .then(() => {
            // this.savingTimeout = setTimeout(() => {
                if(!this.isUnmounting) {

                    this.setState({
                        doneAt: this.props.todo.doneAt,
                        txt: this.props.todo.txt,
                    }, () => {
                        this.savingTimeout = null;
                    });
                }
            // }, 100);
        });
        
    }

    onTodoDone = () => {
        this.props.avoidClickPropagation();
        let doneAt = (this.state.doneAt) ? null : Date.now();
        this.setState({ doneAt: doneAt }, () => {

            let txt = this.state.txt;
            let doneAt = this.state.doneAt;
            let todo = { txt, doneAt };
            this.props.handleTodoChange(todo, this.props.todoIdx);
        });

    }

    onHover = () => {

        this.setState(({ showDelete }) => ({

            showDelete: !showDelete
        }));

    }

    render() {
        const { txt, showDelete, doneAt } = this.state;
        const { avoidClickPropagation, todo } = this.props;
        // console.log(todo);
        return (
            <li className="todo flex align-center space-start" onMouseEnter={this.onHover} onMouseLeave={this.onHover}>
                <img className={`${(showDelete) ? 'todo-slide' : ''}`} src="../../assets/img/keep/todo-remove.png"
                    onClick={this.onTodoDelete} />
                <img src="../../assets/img/keep/todo-done.png" onClick={this.onTodoDone} />
                <input type="text" value={todo.txt} name="txt" onChange={this.handleChange} placeholder={`To Do #${this.props.todoIdx + 1}`}
                    className={`${(doneAt) ? 'todo-done' : ''}`} onClick={avoidClickPropagation} /></li>
        )
    }
};