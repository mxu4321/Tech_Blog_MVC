const newPostFormHandler = async (e) => {
    e.preventDefault();
    
    const title = document.getElementById("new-post-title").value.trim();
    const content = document.getElementById("new-post-content").value.trim();

    if (title && content) {
        const response = await fetch("/api/post/create", {
            method: "POST",
            body: JSON.stringify({
                title,
                content,
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

document
    .getElementById("new-post-form")
    .addEventListener("submit", newPostFormHandler);