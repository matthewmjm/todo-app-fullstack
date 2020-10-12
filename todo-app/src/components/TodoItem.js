import React from 'react';

function TodoItem({ id, title, content, deleteTodo }) {
    const handleClick = (event) => deleteTodo(id)
    return (
        <>
            <li className="todo-item">
                <h2>{title}</h2>
                <h3>{content}</h3>
                <button onClick={handleClick} className="delete-button">DELETE</button>
            </li>
        </>
    )
}

export default TodoItem;
