// when user click the edit button, fetch post to update a post (localhost:3001/api/post/update/:id)
const editButtonHandler = async (e) => {
  e.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const updateTitle = document.getElementById("edit-post-title").value.trim();
  const updateContent = document.getElementById("edit-post-content").value.trim();

  const response = await fetch(`/api/post/update/${id}`, {
    method: "POST",
    body: JSON.stringify({
        updateTitle,
        updateContent
    }),
    headers: {
        "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    window.prompt("Post has been updated!"),
      document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};
document

  .getElementById("edit-post-btn")
  .addEventListener("click", editButtonHandler);
