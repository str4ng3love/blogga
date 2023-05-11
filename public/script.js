import * as fH from "./modules/formHandler.mjs";
import * as pH from "./modules/postHandler.mjs";
import * as proH from "./modules/profileHandler.mjs";

const logBtn = document.getElementById("log-btn");
const regBtn = document.getElementById("register-btn");
const startLogBtn = document.getElementById("start_login_btn");
const startPostBtn = document.getElementById("start_post_btn");
const addBtn = document.getElementById("add-btn");
const changePassBtn = document.getElementById("change-password");
const author = document.getElementById("author");
const addFriendBtn = document.getElementById("add-friend");
const delBPosts = document.getElementsByClassName("del-post");
const delBPostsArray = Array.from(delBPosts);
const editBPosts = document.getElementsByClassName("edit-post");
const editBPostsArray = Array.from(editBPosts);
const delFriendBtns = document.getElementsByClassName("del-friend");
const delFriendBtnsArray = Array.from(delFriendBtns);
const makeFriendBtns = document.getElementsByClassName("befriend");
const makeFriendBtnsArray = Array.from(makeFriendBtns);
const toggleMenuBtn = document.getElementById("menu-button-container");

const GetAuthor = async () => {
  let name = author.textContent;
  let resp = await fetch("/id" + name);
  let respParsed = await resp.json();
  author.textContent = respParsed.userName;
  author.href = "/user" + respParsed.userName;
};

if (logBtn) {
  logBtn.addEventListener("click", fH.CreateLogForm);
}
regBtn?.addEventListener("click", fH.CreateRegForm);
startLogBtn?.addEventListener("click", fH.CreateLogForm);
startPostBtn?.addEventListener("click", pH.CreatePost);
if (addBtn) {
  addBtn.addEventListener("click", pH.CreatePost);
}
if (addFriendBtn) {
  addFriendBtn.addEventListener("click", proH.AddFriend);
}
if (author) {
  GetAuthor();
}
if (delFriendBtns) {
  delFriendBtnsArray.forEach((el) => {
    el.addEventListener("click", proH.DeleteFriend);
  });
}
if (delBPosts) {
  delBPostsArray.forEach((el) => {
    el.addEventListener("click", proH.DeletePost);
  });
}
if (editBPosts) {
  editBPostsArray.forEach((el) => {
    el.addEventListener("click", pH.EditPost);
  });
}
if (makeFriendBtnsArray) {
  makeFriendBtnsArray.forEach((el) => {
    el.addEventListener("click", proH.Befriend);
  });
}
if (changePassBtn) {
  changePassBtn.addEventListener("click", (e) => proH.ChangePass(e));
}
if (toggleMenuBtn) {
  toggleMenuBtn.addEventListener("click", (e) => {
    window.scroll({ left: 0, top: 0, behavior: "smooth" });

    const menu = document.getElementsByClassName("menu");

    if (menu[0].clientHeight === 0) {
      document.body.classList.add("overflowY-hidden");
    } else {
      document.body.classList.remove("overflowY-hidden");
    }
  });
}
const CheckMenuHeightAfterRefresh = () => {
  const menu = document.getElementsByClassName("menu");

  if (menu[0].clientHeight > 0) {
    document.body.classList.add("overflowY-hidden");
  } else {
    document.body.classList.remove("overflowY-hidden");
  }
};
CheckMenuHeightAfterRefresh();
