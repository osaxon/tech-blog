const loginHandler = async (event) => {
    event.preventDefault();

    console.log(document.querySelector("#email-login").value.trim())
}

document.querySelector("#submit").addEventListener('click', loginHandler)