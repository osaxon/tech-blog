async function signupHandler(event) {
    event.preventDefault();
    console.log("Sign up")
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const userName = document.querySelector("#user_name").value.trim();
  
    if (email && password && userName) {
      const response = await fetch("/api/users/new", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password, user_name: userName }),
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
  
  document.querySelector(".signup-form").addEventListener("submit", signupHandler);