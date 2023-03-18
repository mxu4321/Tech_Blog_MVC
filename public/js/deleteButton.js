// ❌NOT WORKING❌
// delete a post when click the delete button
const deleteButtonHandler = async (e) => {
  e.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/post/delete/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    window.prompt("Post has been deleted!"),
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};
document
  .getElementById("delete-post-btn")
  .addEventListener("click", deleteButtonHandler);
