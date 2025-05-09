const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
document.querySelector(".sign-up form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Đăng ký thành công! Chuyển qua đăng nhập.");
    container.classList.remove('active'); // Chuyển về Sign In
  });
  