// delete a post when click the delete button
// const postId = document.getElementById("delete-post-btn").getAttribute("data-id");
// can only get the 1st post id on a dashboard⤴️


const deleteButtonHandler = async (e) => {
   e.preventDefault();
   const postId = e.target.getAttribute("data-id");

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
// document
//   .getElementById("delete-post-btn")
//   .addEventListener("click", deleteButtonHandler);

const deleteButtons = document.querySelectorAll(".delete-post-btn");
deleteButtons.forEach((el) => el.addEventListener("click", deleteButtonHandler));