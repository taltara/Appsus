export function MicroMsg(props) {

    const { msg } = props;
    console.log('mounterd');
    return (
    <p className="saved-message">{msg.txt}</p>

    );
};