import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

function List(props) {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetchTasks();
    }, []);
    
    const [input, setInput] = useState("");

    function handleChange(e) {
        setInput(e.target.value);
    }

    async function addItem() {
        try {
            const docRef = await addDoc(collection(props.firebase.db, "todo"), {
                task: input
            });
            console.log("Document written with ID: ", docRef.id);
            setTasks((tasks) => [...tasks, {id: input, name: input}])
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function deleteItem(id) {
        try {
            const docRef = collection(props.firebase.db, "todo");

            // Create a query against the collection.
            const q = query(docRef, where("task", "==", id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((d) => {
                deleteDoc(doc(props.firebase.db, "todo", d.id));
            });
            setTasks((tasks) => (tasks.filter((task) => {
                console.log(task.id);
                console.log(id);
                return task.id !== id;
            })));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
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

    async function fetchTasks() {
        try {
            const querySnapshot = await getDocs(collection(props.firebase.db, "todo"));
            querySnapshot.forEach((d) => {
                // d.data() is never undefined for query doc snapshots
                setTasks((tasks) => ([...tasks, {id: d.data()["task"], name: d.data()["task"]}]));
            });
        } catch (e) {
            console.error("Error reading data: ", e);
        }
    }

    return (
        <div className="listContainer">
            <div>{taskList}</div>
            <div className="itemList">
                <input id="newItemInput" onChange={handleChange} maxLength="10"></input>
                <button className="btn" onClick={addItem}>Add Item</button>
            </div>
        </div>
    );
}

export default List;