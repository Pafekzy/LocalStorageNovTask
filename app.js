 const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');

 let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

 function renderTasks() {
  taskList.innerHTML = '';  

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

     
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));

     
    const taskName = document.createElement('span');
    taskName.classList.add('name');
    taskName.textContent = task.name;
    if (task.completed) {
      taskName.classList.add('completed');  
    }

     const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));

     taskItem.appendChild(checkbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);

     taskList.appendChild(taskItem);
  });
}

 function addTask(event) {
  event.preventDefault();  

  const taskName = taskInput.value.trim();
  if (taskName) {
    const newTask = {
      name: taskName,
      completed: false,
    };
    tasks.push(newTask);  
    taskInput.value = '';  
    saveTasks();  
    renderTasks();  
  } else {
    alert('Please enter a valid task!');
  }
}


function deleteTask(index) {
  tasks.splice(index, 1);  
  saveTasks();  
  renderTasks();  
}

 function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();  
  renderTasks();  
}

 function searchTasks(event) {
  const query = event.target.value.toLowerCase();

  const filteredTasks = tasks.filter(task => {
    return task.name.toLowerCase().includes(query);
  });

  renderFilteredTasks(filteredTasks);  
}

 function renderFilteredTasks(filteredTasks) {
  taskList.innerHTML = '';  
  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    
     const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));
    
     const taskName = document.createElement('span');
    taskName.classList.add('name');
    taskName.textContent = task.name;
    if (task.completed) {
      taskName.classList.add('completed');  
    }

    // Create delete button
    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));

     taskItem.appendChild(checkbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);

     taskList.appendChild(taskItem);
  });
}

 function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

 addTaskButton.addEventListener('click', addTask);
searchInput.addEventListener('input', searchTasks);

 renderTasks();
