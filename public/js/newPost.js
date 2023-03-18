const newPostFormHandler = async (e) => {
  e.preventDefault();
  
  const title = document.getElementById("new-post-title").value;
  const contents = document.getElementById("new-post-content").value;

 //  console.log("line 6:", title & contents);
  if (title && contents) {
    console.log(title & contents);
    const response = await fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        contents,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // ⏰ should be redirecting to the new created post page
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .getElementById("new-post-form")
  .addEventListener("submit", newPostFormHandler);
