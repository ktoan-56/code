// Đăng ký
document.querySelector(".sign-up form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  if (!name || !email || !password) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Đăng ký thất bại');
    }

    alert(`${data.message}\nChào mừng ${data.user.name}!`);
    container.classList.remove('active');
    
    // Reset form
    e.target.reset();
    
  } catch (error) {
    console.error('Registration error:', error);
    alert(`Lỗi: ${error.message}`);
  }
});