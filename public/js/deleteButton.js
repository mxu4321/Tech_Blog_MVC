// ❌not deleting the post

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

const deleteButtons = document.querySelectorAll(".delete-post-btn");
deleteButtons.forEach((el) => el.addEventListener("click", deleteButtonHandler));