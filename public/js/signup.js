const sendSignupRequest = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username-signup").value;
    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;

    if (username && email && password) {
        const response = await fetch("/api/user/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById("signup-form").addEventListener("submit", sendSignupRequest)