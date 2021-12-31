function ListItem(props) {

    function deleteItem(id) {
      props.deleteItem(id);
    }

    return (
        <div className="listContainer">
            <p className="itemText">{props.name}</p>
            <button className="deleteBtn" onClick={() => deleteItem(props.id)}>Delete</button>
        </div>
    );
}

export default ListItem;