//console.log("script.js");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const todo_list_id = "todos_list_div";


//AJAX -xmlhttprequest oblect
//make request to server
//without reloading the page
//asynchronously

//read window.onload && document.onload

window.onload = getTodosAJAX();

function addTodoElements(id, todos_data_json) {
    var todos = JSON.parse(todos_data_json);

    var parent = document.getElementById(id);
    var deletedTodosDiv = document.getElementById("deletedTodos");
    var completeTodosDiv = document.getElementById("completeTodos");
    //parent.innerText = todos_data_json;

    parent.innerText = "";
    deletedTodosDiv.innerText = "";
    completeTodosDiv.innerText = "";

    if (parent) {
        Object.keys(todos).forEach(
            function (key) {
                var todo_element = createTodoElement(key, todos[key]);
                var status = todo_element.getAttribute("status");
                console.log(status);

                if (status == "DELETED") {
                    console.log("In Deleted");
                    //document.getElementById("dletedTodosLink").style.visibility="visible";
                    //var xchild = document.createElement("button");
                    deletedTodosDiv.appendChild(todo_element);
                }
                else if (status == "COMPLETE") {
                    console.log("In Deleted");
                    //var xchild = document.createElement("button");
                    completeTodosDiv.appendChild(todo_element);
                }
                else {
                    parent.appendChild(todo_element);
                }
            }
        )
    }
}

function createTodoElement(id, todo_object) {
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute("status", todo_object.status);
    todo_element.setAttribute("class","test")

    if (todo_object.status != "DELETED") {
        console.log("checkbox testing")
        var newCheckBox = document.createElement("input");
        newCheckBox.type = 'checkbox';
        newCheckBox.setAttribute("id", id);
        if (todo_object.status == "COMPLETE") {
            newCheckBox.checked = 'true';
        }

        newCheckBox.setAttribute("onclick", "completeTodoAjax(this.id)");
        todo_element.appendChild(newCheckBox);
        var newButton = document.createElement("button");
        newButton.innerText = "X";
        newButton.setAttribute("class", "deletebutton");
        newButton.setAttribute("id", id);
        newButton.setAttribute("onclick", "deleteTodoAJAX(this.id)");
        todo_element.appendChild(newButton);
    }
    return todo_element;
}

function getTodosAJAX() {
    console.log("AJAX");

    //defination of AJAX request
    var xhr = new XMLHttpRequest();
    //object.open("method","url",asynchronously or not);
    xhr.open("GET", "/api/todos", true);

    //define callback
    xhr.onreadystatechange = function () {
        //executes after response

        if (xhr.readyState == RESPONSE_DONE) {
            //IS RESPONSE OK I.E 200

            if (xhr.status == STATUS_OK) {
                //xhr.response || xhr,responseText
                //console.log(xhr.response);
                addTodoElements(todo_list_id, xhr.responseText);
            }
        }
    }//end callback


    //making request
    xhr.send(data = null);
}

function addTodoAJAX() {
    var title = document.getElementById("newTodo").value;
    console.log(title);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    //data in body will be of this request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "todo_title=" + encodeURI(title);

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(todo_list_id, xhr.responseText);
            }
        }
    }

    xhr.send(data);
}

function deleteTodoAJAX(id) {
    console.log("Delete buttuon activated :" + id);

    var xhr = new XMLHttpRequest();

    xhr.open("DELETE", "/api/todos/" + id, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //var data = "id="+id;

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                //console.log(xhr.responseText);
                addTodoElements(todo_list_id, xhr.responseText);
            }
        }

    }

    xhr.send(data = null);
}

function completeTodoAjax(id) {
    //console.log("CheckBox clicked :" + checked);

    var xhr = new XMLHttpRequest();

    xhr.open("PUT", "/api/todos/complete/" + id, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                //console.log(xhr.responseText);
                addTodoElements(todo_list_id, xhr.responseText);
            }
        }
    }

    xhr.send(data = null);

}

function toggleComplete(id) {
    var status = document.getElementById(id);
    if(status.innerText.charAt(0)=='H'){
        document.getElementById("completeTodos").style.display="none";
        status.innerText="Show Complete Todos";
    }else{
        document.getElementById("completeTodos").style.display="block";
        status.innerText="Hide Complete Todos";
    }
}

function toggleDeleted(id) {
    var status = document.getElementById(id);
    if(status.innerText.charAt(0)=='H'){
        document.getElementById("deletedTodos").style.display="none";
        status.innerText="Show Deleted Todos";
    }else{
        document.getElementById("deletedTodos").style.display="block";
        status.innerText="Hide Deleted Todos";
    }
}

