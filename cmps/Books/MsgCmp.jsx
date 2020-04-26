export function MsgCmp(props) {

    const { onRemoveMsg, msg } = props;
    return (
        <section className="user-msg flex column">
            <span className="msg-header flex align-center space-between">
                <span className="flex column"><p className="new-book-txt">{msg.txt}</p><p className="new-book-additive">was added to your collection!</p></span>
                <button className="remove-msg" onClick={onRemoveMsg}>x</button>
            </span>
            <a className="new-book-link" href={msg.url}>Check it Out</a>
        </section>
    );
};