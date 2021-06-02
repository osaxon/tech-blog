async function newPostHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector(".post-title").value.trim();
    const post = document.querySelector(".post-content").value.trim();

    if (post || title) {
      const response = await fetch(`/api/posts/new`, {
        method: "POST",
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
  
  document.querySelector(".new-post-form").addEventListener("submit", newPostHandler);