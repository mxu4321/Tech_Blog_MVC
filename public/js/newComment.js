const newCommentFormHandler = async (e) => {
  e.preventDefault();

  const comment_text = document.getElementById("new-comment-text").value.trim();

  if (comment_text) {
    const response = await fetch("/api/comment/create", {
      method: "POST",
      body: JSON.stringify({
        comment_text,
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
  .getElementById("new-comment-form")
  .addEventListener("submit", newCommentFormHandler);
