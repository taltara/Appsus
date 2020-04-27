import { Todo } from './Todo.jsx';

export class NoteTodos extends React.Component {

    constructor() {
        super();
    }

    state = {

        label: '',
        todos: [],
        opacityClass: ''
    };

    componentDidMount() {
        console.log(this.props.note);
        this.setState({ 
            label: this.props.note.info.label,
            todos: this.props.note.info.todos,
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


    render() {
        const { label, todos, opacityClass } = this.state;
        const { toggleView, note, addClass } = this.props;
        return ( 
            <div className={`note note-todo flex column align-center space-center ${addClass} ${opacityClass}`} onClick={() => toggleView(note.id)}>
                <input type="text" className="label" defaultValue={label} onChange={this.handleChange} />
                <ul className="todos-section flex column align-center space-start">
                    {
                        todos.map((todo, i) => {
                            console.log(`todo-${note.id}-${i}`);
                            return <Todo todo={todo} key={`todo-${note.id}-${i}`}/>
                        })

                    }
                </ul>
            </div>
        )
    }
};