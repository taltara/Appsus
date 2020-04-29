import { NoteTools } from 'NoteTools.jsx';
import { Todo } from './Todo.jsx';

export class NoteTodos extends React.Component {

    constructor() {
        super();
        this.savingTimeout = null;
        this.transitionTimeout = null;
        this.transition = false;
    }

    state = {

        label: '',
        todos: [],
        isPinned: null,
        opacityClass: '',
        saving: false,
        hovering: false,
        labels: [],
        style: { backgroundColor: "#3A3B3E" },
        toDelete: false,
        isArchived: false,
    };

    componentDidMount() {

        this.setState({
            label: this.props.note.info.label,
            todos: this.props.note.info.todos,
            isPinned: this.props.note.isPinned,
            toDelete: this.props.note.toDelete,
            isArchived: this.props.note.isArchived,
            labels: this.props.note.labels
        });
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

        clearTimeout(this.transitionTimeout);
    }

    handleUpdateTimeout = (delay = 2000) => {

        this.savingTimeout = setTimeout(() => {
            let note = { ...this.props.note };
            note.isPinned = this.state.isPinned;
            note.info.label = this.state.label;
            note.info.todos = this.state.todos;
            note.style = this.state.style;
            note.toDelete = this.state.toDelete;
            note.isArchived = this.state.isArchived;
            note.labels = this.state.labels;
            this.props.saveNote(note);
            this.setState({ saving: false });

        }, delay);
    }

    onRemoveTodo = (idx) => {
        console.log(idx);
        let todos = this.state.todos;
        console.log(todos);
        todos.splice(idx, 1);
        this.setState({ todos: todos }, () => {
            console.log(this.state.todos);
            this.onSaveNote();
            
        });
        return Promise.resolve();
    }

    onArchiveNote = () => {
        this.avoidClickPropagation();
        console.log('here');
        this.handleTools('archived');
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

    handleTodoChange = (todo, idx) => {

        let todos = this.state.todos;

        if(todo) {

            todos[idx] = todo;
        }

        this.setState({ todos: todos }, () => {

            this.onSaveNote();
        });
    }

    handleChange = ({ target }) => {

        console.log(target);
        const field = target.name
        const value = target.value;
        this.setState(({ [field]: value }), () => {

            this.onSaveNote();
        });

    }

    handleTools = (action) => {

        if (action === 'pin') {
            console.log(this.state);
            this.transition = true;
            this.setState(({ isPinned }) => ({ isPinned: !isPinned }),
                () => {
                    this.onSaveNote(0)
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
        } else if (action === 'archived') {

            this.transition = true;
            this.setState(({ isArchived }) => ({ isArchived: !isArchived }), () => {
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

        if (!this.transition) {

            this.transition = true;
            this.transitionTimeout = setTimeout(() => {
                this.transition = false;
            }, 200);
        }

    }

    onAddTodo = () => {
        if(this.state.todos[this.state.todos.length - 1].txt === '') return;
        this.avoidClickPropagation();
        let newTodo = { txt: '', doneAt: null };
        let todos = this.state.todos;
        todos.push(newTodo);

        this.setState({ todos: todos });
    }

    render() {
        const { label, todos, opacityClass, hovering, style, labels } = this.state;
        const { note, addClass } = this.props;
        return (
            <div className={`note note-todo flex column align-center space-center ${addClass} ${opacityClass}`}
                onClick={() => this.onClick()} onMouseEnter={this.onHover} onMouseLeave={this.onHover} style={style}>
                <span className="note-header flex align-center space-center">
                    <input type="text" name="label" className="label" defaultValue={label} 
                    onChange={this.handleChange} placeholder="Label" />
                    <img src="../assets/img/keep/pin.png" className={`tool-pin tool ${(hovering) ? 'show-tool' : ''}`}
                        onClick={() => this.handleTools('pin')} />
                </span>

                <ul className="todos-section flex column align-center space-start">
                    {
                        todos.map((todo, i) => {
                            // console.log(todo);
                            return <Todo todoIdx={i} todo={todo} key={`todo-${note.id}-${i}`} onRemoveTodo={this.onRemoveTodo}
                             handleTodoChange={this.handleTodoChange} avoidClickPropagation={this.avoidClickPropagation}/>
                        })

                    }
                </ul>
                <img src="../../assets/img/keep/add.png" onClick={this.onAddTodo} className="add-input" />
                <NoteTools hovering={hovering} updateFromTools={this.updateFromTools} onArchiveNote={this.onArchiveNote}
                avoidClickPropagation={this.avoidClickPropagation} onRemoveNote={this.onRemoveNote}  labels={labels} />
            </div>
        )
    }
};