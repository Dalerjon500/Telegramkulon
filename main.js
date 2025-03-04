axios({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "get"
}).then((res) => {
    draw(res.data);
});


function draw(users) {
    let s = "";
    users.forEach(user => {
        s += `
        <div onclick="selectUser(${user.id})" class="form-control">
            <span>${user.id}</span> ${user.name}
        </div>`;
    });
    document.getElementById("card").innerHTML = s;
}


function searchUser(e) {
    if (e.keyCode === 13) {
        let query = e.target.value.toLowerCase();
        axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
            let filteredUsers = res.data.filter(user => 
                user.name.toLowerCase().includes(query)
            );
            draw(filteredUsers);
        });
    }
}

function selectUser(userId) {
    currentUserId = userId; 
    let postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

    axios.get(postsUrl).then((res) => {
        drawPosts(res.data, userId);
    });
}


function drawPosts(posts, userId) {
    let s = `<h3>User Posts</h3> <hr>
    <input onkeydown="searchPost(event)" class="form-control" id="searchPost" placeholder="search..." type="search"> <hr>
    <button class="btn btn-danger" onclick="defaultPost(${userId})">Posts</button>
    <button class="btn btn-success" onclick="changeTodo(${userId})">To Do</button>`;
    
    posts.forEach(post => {
        s += `
        <div class="post">
            <h4>${post.title}</h4>
            <p>${post.body}</p>
        </div>`;
    });
    let d =`<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
</nav>`
    document.getElementById("posts").innerHTML = s + d;
}


function changeTodo(userId) {
    let todosUrl = `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;
    axios.get(todosUrl).then((res) => {
        drawTodos(res.data, userId);
    });
}


function drawTodos(todos, userId) {
    let s = `<h3>User To-Do List</h3> <hr>
    <input onkeydown="searchPost(event)" class="form-control" id="searchPost" placeholder="search..." type="search"> <hr>
    <button class="btn btn-success" onclick="defaultPost(${userId})">Posts</button>
    <button class="btn btn-danger" onclick="changeTodo(${userId})">To Do</button>`;
    
    todos.forEach(todo => {
        s += `
        <div class="todo ${todo.completed ? 'completed' : ''}">
            <input class="checkbox" type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
            <span>${todo.title}</span>
        </div>`;
    });
    document.getElementById("posts").innerHTML = s;
}

function defaultPost(userId) {
    let postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    axios.get(postsUrl).then((res) => {
        drawPosts(res.data, userId);
    });
}


function searchPost(e) {
    if (e.keyCode === 13 && currentUserId) {
        let query = e.target.value.toLowerCase();
        let searchUrl = `https://jsonplaceholder.typicode.com/posts?userId=${currentUserId}`;

        axios.get(searchUrl).then((res) => {
            let filteredPosts = res.data.filter(post => 
                post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query)
            );
            drawPosts(filteredPosts, currentUserId);
        }); 
    }
}

