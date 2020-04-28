import { Todo } from './Todo.jsx';

export class NoteTodos extends React.Component {

    constructor() {
        super();
        this.savingTimeout = null;
    }

    state = {

        label: '',
        todos: [],
        isPinned: null,
        opacityClass: '',
        saving: false
    };

    componentDidMount() {
        // console.log(this.props.note);
        this.setState({ 
            label: this.props.note.info.label,
            todos: this.props.note.info.todos,
            isPinned: this.props.note.isPinned
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

    handleUpdateTimeout = () => {

        this.savingTimeout = setTimeout(() => {
            let note = { ...this.props.note };
            note.isPinned = this.state.isPinned;
            note.info.label = this.state.label;
            note.info.todos = this.state.todos;

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


    render() {
        const { label, todos, opacityClass } = this.state;
        const { toggleView, note, addClass } = this.props;
        return ( 
            <div className={`note note-todo flex column align-center space-center ${addClass} ${opacityClass}`} onClick={() => toggleView(note.id, note.isPinned)}>
                <input type="text" name="label" className="label" defaultValue={label} onChange={this.handleChange} />
                <ul className="todos-section flex column align-center space-start">
                    {
                        todos.map((todo, i) => {
                            // console.log(`todo-${note.id}-${i}`);
                            return <Todo todo={todo} key={`todo-${note.id}-${i}`}/>
                        })

                    }
                </ul>
            </div>
        )
    }
};