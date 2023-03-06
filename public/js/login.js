const sendLoginRequest = async (e) => {
  e.preventDefault();

  const email = document.getElementById("email-field").value.trim();
  const password = document.getElementById("password-field").value.trim();

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};
// fetch("/api/dashboard/login", {
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({email, password})
// }).then(response => response.json())
// .then(data => {
//     location.replace("/dashboard")
// })

document
  .getElementById("login-form")
  .addEventListener("submit", sendLoginRequest);
