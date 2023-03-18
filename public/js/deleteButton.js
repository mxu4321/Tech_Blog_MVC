// ❌not deleting the post
// delete a post when click the delete button
const postId = document.getElementById("delete-post-btn").getAttribute("data-id");
// console.log(postId); 
// can only get the 1st post id on a dashboard⤴️

const deleteButtonHandler = async (e) => {
  e.preventDefault();
  const response = await fetch(`/api/post/delete/${postId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    window.alert("Post has been deleted!"),
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};
document
  .getElementById("delete-post-btn")
  .addEventListener("click", deleteButtonHandler);
