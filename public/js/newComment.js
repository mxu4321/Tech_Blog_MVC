const newCommentFormHandler = async (e) => {
  e.preventDefault();

  const comment_text = document.getElementById("new-comment-text").value.trim();
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (comment_text) {
    const response = await fetch("/api/comment/create", {
      method: "POST",
      body: JSON.stringify({
        comment_text,
        post_id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // --- after submitting a comment, redirect to the single post page
      document.location.replace(`api/comment/post/${post_id}`);
      // use api route will not work⤴️
    } else {
      alert(response.statusText);
    }
  }
};

document
  .getElementById("new-comment-form")
  .addEventListener("submit", newCommentFormHandler);