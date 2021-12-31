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

    function resetInputField() {
        setInput("");
        var e = document.querySelector('input');
        e.value = "";
    };

    async function addItem() {
        try {
            const docRef = await addDoc(collection(props.firebase.db, "todo"), {
                task: input
            });
            console.log("Document written with ID: ", docRef.id);
            setTasks((tasks) => [...tasks, {id: input, name: input}])
            resetInputField();
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
            setTasks([]);
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
            <div className="itemList">
                <input className="taskInput" id="newItemInput" onChange={handleChange} maxLength="10"></input>
                <button className="addBtn" onClick={addItem}>Add Item</button>
            </div>
            <div>{taskList}</div>
        </div>
    );
}

export default List;