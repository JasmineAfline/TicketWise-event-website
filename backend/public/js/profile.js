const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login.html";
}

async function loadProfile() {
  const res = await fetch("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  document.getElementById("name").value = data.user.name;
  document.getElementById("email").value = data.user.email;
}

loadProfile();

document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/users/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  document.getElementById("message").textContent =
    data.message || "Profile updated successfully";
});
