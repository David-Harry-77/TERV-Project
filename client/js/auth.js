document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      const { role } = JSON.parse(atob(data.token.split('.')[1]));
      if (role === 'superadmin') {
        window.location.href = 'superadmin.html';
      } else if (role === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'student.html';
      }
    } else {
      alert('Login failed');
    }
  });
  