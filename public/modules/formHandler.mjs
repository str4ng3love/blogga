export const CreateLogForm = () => {
  const container = document.createElement("div");
  const heading = document.createElement("h4");
  const fieldsContainer = document.createElement("div");
  const fieldsContainer2 = document.createElement("div");
  const form = document.createElement("form");
  const labName = document.createElement("label");
  const labPass = document.createElement("label");
  const inputName = document.createElement("input");
  const inputPass = document.createElement("input");
  const btn = document.createElement("button");
  const regLink = document.createElement("a");

  container.setAttribute("class", "form-container");
  heading.setAttribute("id", "log-in-heading");
  fieldsContainer.setAttribute("class", "fields");
  fieldsContainer2.setAttribute("class", "fields");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("autocomplete", "username");
  inputName.setAttribute("name", "username");
  inputPass.setAttribute("type", "password");
  inputPass.setAttribute("name", "password");
  inputPass.setAttribute("autocomplete", "current-password");
  btn.setAttribute("class", "button");
  heading.innerHTML = "Log In";
  labName.innerHTML = "User Name:";
  labPass.innerHTML = "Password:";
  btn.innerHTML = "LOG IN";
  regLink.innerHTML = `Don't have an account? Register`;

  container.appendChild(form);
  form.appendChild(fieldsContainer2);
  form.appendChild(fieldsContainer);
  fieldsContainer.append(labName, inputName, labPass, inputPass, btn, regLink);
  fieldsContainer2.append(heading);

  document.body.insertAdjacentElement("afterbegin", container);
  btn.addEventListener("click", (e) => HandleLogIn(e));
  regLink.addEventListener("click", () => {
    container.remove();
    CreateRegForm();
  });
  container.addEventListener("click", (e) => {
    if (e.target == container) {
      container.remove();
    }
  });
};

export const CreateRegForm = () => {
  const container = document.createElement("div");
  const heading = document.createElement("h4");
  const fieldsContainer = document.createElement("div");
  const fieldsContainer2 = document.createElement("div");
  const form = document.createElement("form");
  const labName = document.createElement("label");
  const labPass = document.createElement("label");
  const labRePass = document.createElement("label");
  const inputName = document.createElement("input");
  const inputPass = document.createElement("input");
  const inputRePass = document.createElement("input");
  const btn = document.createElement("button");
  const logLink = document.createElement("a");

  container.setAttribute("class", "form-container");
  heading.setAttribute("id", "register-heading");
  fieldsContainer.setAttribute("class", "fields");
  fieldsContainer2.setAttribute("class", "fields");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("autocomplete", "username");
  inputName.setAttribute("name", "user");
  inputPass.setAttribute("type", "password");
  inputPass.setAttribute("name", "password");
  inputPass.setAttribute("autocomplete", "new-password");
  inputRePass.setAttribute("type", "password");
  inputRePass.setAttribute("autocomplete", "none");
  inputRePass.setAttribute("name", "confirm");
  btn.setAttribute("class", "button");

  heading.innerHTML = "Register";
  labName.innerHTML = "User Name:";
  labPass.innerHTML = "Password:";
  labRePass.innerHTML = "Confirm Password:";
  btn.innerHTML = "REGISTER";
  logLink.innerHTML = "Already have an account? Log In";

  container.appendChild(form);
  form.append(fieldsContainer2);
  form.append(fieldsContainer);
  fieldsContainer.append(
    labName,
    inputName,
    labPass,
    inputPass,
    labRePass,
    inputRePass,
    btn,
    logLink
  );
  fieldsContainer2.append(heading);
  document.body.insertAdjacentElement("afterbegin", container);

  btn.addEventListener("click", (e) => HandleRegister(e));
  logLink.addEventListener("click", () => {
    container.remove();
    CreateLogForm();
  });
  container.addEventListener("click", (e) => {
    if (e.target == container) {
      container.remove();
    }
  });
};

const HandleLogIn = async (e) => {
  e.preventDefault();
  let form = e.target.parentElement;
  let childList = form.children;
  let userName = childList[1].value;
  let userPassword = childList[3].value;
  let userData = {
    username: userName,
    password: userPassword,
  };
  try {
    const resp = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    let message = await resp.json();

    ErrorHandler(message);
  } catch (error) {
    console.log(error.message);
  }
};

const HandleRegister = async (e) => {
  e.preventDefault();
  let form = e.target.parentElement;
  let childList = form.children;
  let userName = childList[1].value;
  let userPassword = childList[3].value;
  let passwordConfirm = childList[5].value;
  if (userPassword !== passwordConfirm) {
  }
  let userRegData = {
    user: userName,
    password: userPassword,
    confirmation: passwordConfirm,
  };

  try {
    const resp = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegData),
    });
    let message = await resp.json();

    ErrorHandler(message);
  } catch (error) {}
};


export const ErrorHandler = (formMsg) => {
  console.log(formMsg)
  let h;
  let passwordHeading = document.getElementById("password-change-heading");
  let loginHeading = document.getElementById("log-in-heading");
  let registerHeading = document.getElementById("register-heading");
  let createHeading = document.getElementById("create-post-heading");
  let editHeading = document.getElementById("edit-post-heading");
  let followAuthorHeading = document.getElementById("follow-author-heading");

  if (passwordHeading) h = passwordHeading;
  if (loginHeading) h = loginHeading;
  if (registerHeading) h = registerHeading;
  if (createHeading) h = createHeading;
  if (editHeading) h = editHeading;
  if (followAuthorHeading) h = followAuthorHeading;

  let prevHeadingTxt = h.innerText;
  let form = document.querySelector("form");
  let inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.style.backgroundColor = " var(--colorText)";
  });

  const errSpan = document.createElement("span");
  errSpan.setAttribute("class", "err-span");
  errSpan.innerHTML = formMsg.messages;
  if (formMsg.messages[0].includes(`success`)) {
    h.style.opacity = 0;
    setTimeout(() => {
      h.innerHTML = formMsg.messages;
      h.style.backgroundColor = "var(--colorHover)";
      h.style.opacity = 1;
    }, 300);
    setTimeout(() => {
      let form = document.getElementsByClassName("form-container");
      if (form) {
        form[0].remove();
        location.reload();
      }
    }, 2000);
  } else {
    h.style.opacity = 0;
    setTimeout(() => {
      h.innerHTML = formMsg.messages;
      h.style.backgroundColor = "var(--colorErr)";
      h.style.opacity = 1;
    }, 300);

    if (formMsg.fields.length > 0) {
      formMsg.fields.forEach((field) => {
        let el = document.getElementsByName(field);
        let oldColor = el[0].style.backgroundColor
        el[0].style.backgroundColor = 'rgba(186, 51, 51, 0.693)';
        setInterval(()=>{
          el[0].style.backgroundColor = oldColor
        }, 5600)
      });
    }

    ReturnToNormal(h, prevHeadingTxt);
  }
};
const ReturnToNormal = (h, text) => {
  setTimeout(() => {
    h.style.opacity = 0;
  }, 5000);
  setTimeout(() => {
    h.innerHTML = text;
    h.style.backgroundColor = "inherit";
    h.style.opacity = 1;
  }, 5600);
};
