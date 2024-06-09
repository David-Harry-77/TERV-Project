document.getElementById('create-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const role = document.getElementById('user-role').value;
    const adminId = document.getElementById('admin-id').value;
  
    const userData = { email, password, role };
    if (role === 'student') {
      userData.adminId = adminId;
    }
  
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      body: JSON.stringify(userData)
    });
  
    if (response.ok) {
      alert('User created successfully');
    } else {
      alert('Failed to create user');
    }
  });
  