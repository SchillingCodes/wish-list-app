import React, { useState } from 'react';
import ListItem from './ListItem';

function List(props) {
  // Declare a new state variable, which we'll call "count"
    const [tasks, setTasks] = useState([]);

    const [i, setI] = useState(0);
    
    const [input, setInput] = useState("");

    function handleChange(e) {
        setInput(e.target.value);
    }

    function addItem() {
        setTasks(state => [...state, {id: "todo-" + i, name: input, completed: false}]);
        setI(i + 1);
    }

    function deleteItem(id) {
        setTasks(tasks.filter(item => item.id !== id));
    }

    const taskList = tasks.map(task => {
        return (
            <ListItem
            key={task.id}
            id={task.id}
            name={task.name}
            deleteItem={deleteItem} />
        );
    });

    return (
        <div>
            <div>{taskList}</div>
            <input id="newItemInput" onChange={handleChange}></input>
            <button onClick={addItem}>Add Item</button>
        </div>
    );
}

export default List;