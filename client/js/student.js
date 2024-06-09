async function fetchTasks() {
    const response = await fetch('/student/tasks', {
      headers: {
        'Authorization': getToken()
      }
    });
  
    const tasks = await response.json();
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';
  
    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p>`;
      container.appendChild(taskElement);
    });
  }
  
  fetchTasks();
  