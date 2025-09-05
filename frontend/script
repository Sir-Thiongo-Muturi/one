const API = "http://localhost:5000"; // change to your backend URL when deployed

// Registration
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = {
    username: document.getElementById("regUser").value,
    password: document.getElementById("regPass").value,
    age: document.getElementById("regAge").value,
    gender: document.getElementById("regGender").value,
    citizenship: document.getElementById("regCitizen").value,
  };
  let res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
  });
  alert((await res.json()).message);
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = {
    username: document.getElementById("logUser").value,
    password: document.getElementById("logPass").value,
  };
  let res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
  });
  let data = await res.json();
  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
});

// Show dashboard
if (window.location.pathname.endsWith("dashboard.html")) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("userDetails").innerText = JSON.stringify(user, null, 2);
  } else {
    document.getElementById("userDetails").innerText = "Not logged in";
  }
}

// Show admin list
if (window.location.pathname.endsWith("admin.html")) {
  fetch(`${API}/admin/users`)
    .then(res => res.json())
    .then(users => {
      let list = document.getElementById("userList");
      users.forEach(u => {
        let li = document.createElement("li");
        li.innerText = `${u.username} | Age: ${u.age}, Gender: ${u.gender}, Citizenship: ${u.citizenship}`;
        list.appendChild(li);
      });
    });
}
