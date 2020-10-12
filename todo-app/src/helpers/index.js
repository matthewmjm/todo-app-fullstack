const baseURL = `http://localhost:4000/todos/`

export function patchTodo(updatedTodo) {
    fetch(`${baseURL}${updatedTodo.id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({todo: updatedTodo})
    })
}

export function postTodo(newTodo) {
    fetch(baseURL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({todo: newTodo})
    })
    window.location.reload();
}

export function destroyTodo(id) {
    fetch(`${baseURL}${id}`, {method: "DELETE"})
}