// ❌not updating the post

// when user click the edit button, fetch post to update a post (localhost:3001/api/post/update/:id)
const postId = document
  .getElementById("edit-post-form")
  .getAttribute("data-id");
  console.log(postId);
const editPostFormHandler = async (e) => {
  e.preventDefault();
  // get the data-id from edit button
  const updateTitle = document.getElementById("edit-post-title").value;
  const updateContent = document.getElementById("edit-post-content").value;

  if (updateTitle && updateContent) {
    const response = await fetch(`/api/post/update/${postId}`, {
      method: "POST",
      body: JSON.stringify({
        title: updateTitle,
        contents: updateContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
    //   window.alert("Post has been updated!"),
        document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};
document

  .getElementById("edit-post-form")
  .addEventListener("submit", editPostFormHandler);
