document.getElementById('create-task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const studentId = document.getElementById('student-id').value;
  
    const response = await fetch('/admin/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      body: JSON.stringify({ title, description, studentId })
    });
  
    if (response.ok) {
      alert('Task created successfully');
    } else {
      alert('Failed to create task');
    }
  });
  