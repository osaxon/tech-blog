async function updatePostHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector(".post-title").value.trim();
    const post = document.querySelector(".post-content").value.trim();
    const postID = document.querySelector(".post-id").textContent;
    console.log(postID)
  
    if (post || title) {
      const response = await fetch(`/api/posts/${postID}`, {
        method: "PUT",
        body: JSON.stringify({ title: title, post: post }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector(".edit-post-form").addEventListener("submit", updatePostHandler);