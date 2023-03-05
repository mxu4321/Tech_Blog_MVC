function sendLoginRequest (e) {
    e.preventDefault()

    const email = document.getElementById("email-field").value
    const password = document.getElementById("password-field").value

    const obj = {
        email, 
        password
    }

    fetch("/api/dashboard/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
    .then(data => {
        location.replace("/dashboard")
    })
}

document.getElementById("login-form").addEventListener("submit", sendLoginRequest)