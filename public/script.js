import * as fH from './modules/formHandler.mjs'
import * as pH from './modules/postHandler.mjs'
import * as proH from './modules/profileHandler.mjs'

const logBtn = document.getElementById('log-btn')
const addBtn = document.getElementById('add-btn')
const addFriendBtn = document.getElementById('add-friend')
const delBPosts = document.getElementsByClassName('del-post')
const delBPostsArray = Array.from(delBPosts)
const delFriendBtns = document.getElementsByClassName('del-friend')
const delFriendBtnsArray = Array.from(delFriendBtns)
const makeFriendBtns = document.getElementsByClassName('befriend')
const makeFriendBtnsArray = Array.from(makeFriendBtns)


if(logBtn){
    logBtn.addEventListener('click', fH.CreateLogForm)
} 
if(addBtn){
    addBtn.addEventListener('click', pH.CreatePost)
    
} 
if(addFriendBtn){
    addFriendBtn.addEventListener('click', proH.AddFriend)
}
if(delFriendBtns){
    delFriendBtnsArray.forEach(el => {
        el.addEventListener('click', proH.DeleteFriend)
    })
}
if(delBPosts){
    delBPostsArray.forEach(el => {
        el.addEventListener('click', proH.DeletePost)
    })

}
if(makeFriendBtnsArray){
    makeFriendBtnsArray.forEach(el => {
        el.addEventListener('click', proH.Befriend)
    })
}