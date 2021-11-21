function ListItem(props) {

    function deleteItem(id) {
      props.deleteItem(id);
    }

    return (
        <div>
            <p>{props.name}</p>
            <button onClick={() => deleteItem(props.id)}>Delete</button>
        </div>
    );
}

export default ListItem;