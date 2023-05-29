import * as fH from "./modules/formHandler.mjs";
import * as pH from "./modules/postHandler.mjs";
import * as proH from "./modules/profileHandler.mjs";
const newsletterBtn = document.getElementById("newsletter_btn");
const logBtn = document.getElementById("log-btn");
const regBtn = document.getElementById("register-btn");
const regBtn2 = document.getElementById("register-btn2");
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
const postLinks = document.getElementsByClassName("pagination_range");
const postLinksArray = Array.from(postLinks);
const dateSort = document.getElementById("date-sort");
const titleSort = document.getElementById("title-sort");
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
regBtn2?.addEventListener("click", fH.CreateRegForm);
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

    const checker = document.getElementById("hamburger");
    if (!checker.checked) {
      document.body.classList.add("overflowY-hidden");
    } else {
      document.body.classList.remove("overflowY-hidden");
    }
  });
}
if (postLinksArray) {
  postLinksArray.forEach((link) => {
    link.addEventListener("click", (e) => pH.GetPosts(e));
  });
}
if (dateSort) {
  dateSort.addEventListener("click", (e) => pH.GetPosts(e));
}
if (titleSort) {
  titleSort.addEventListener("click", (e) => pH.GetPosts(e));
}
const CheckMenuHeightAfterRefresh = () => {
  const checker = document.getElementById("hamburger");

  if (checker.checked && window.innerWidth < 840) {
    document.body.classList.add("overflowY-hidden");
  } else {
    document.body.classList.remove("overflowY-hidden");
  }
};
CheckMenuHeightAfterRefresh();
window.addEventListener("resize", (e) => {
  const checker = document.getElementById("hamburger");

  if (e.target.innerWidth < 840 && checker.checked) {
    document.body.classList.add("overflowY-hidden");
  } else {
    document.body.classList.remove("overflowY-hidden");
  }
});
const SaveEmail = async (e) => {
  const input = e.target.parentElement.children[2];
  const email = input.value;
  if (email.includes("@") && email.length > 8) {
    try {
      const resp = await fetch('/newsletter', {
        method:"POST",
        headers:{
          'Content-Type': "application/json"
        }, body:JSON.stringify({email: email})
      })
      const message = await resp.json()

      if(message.messages[0].includes('success')){
        input.value = "Email Added";
        input.style.color = 'rgb(39, 154, 241)'
        
        setTimeout(()=>{
          input.style.color = 'rgb(20, 20, 20)'
          input.value = ''
        }, 2000)
      } else {
        input.value = message.messages
        input.style.color = 'red'
        setTimeout(()=>{
          input.style.color = 'rgb(20, 20, 20)'
          input.value = ''
        }, 2000)
      }
    } catch (error) {
    
    }
  } else {
    input.value = "Not a valid Email";
    input.style.color = 'red'
    setTimeout(()=>{
      input.style.color = 'rgb(20, 20, 20)'
      input.value = ''
    }, 2000)
  }


};
newsletterBtn?.addEventListener("click", (e) => SaveEmail(e));
