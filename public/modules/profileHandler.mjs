

export const EditPost = async (e)=> {
    
}
export const DeletePost = async (e)=> {
    const par = e.target.parentElement.parentElement
    const kids = par.children
    const title = kids[0].innerHTML
    
    try {
        const resp = await fetch('/post', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({title:title})
        })
        const modResp = await resp.json()
      HandleDelete(modResp)
    } catch (error) {
        console.log(error)
    }
}
const HandleDelete = (delMsg) => {
    if(delMsg.messages.acknowledged == true){
        setTimeout(() => {
            location.reload()
        }, 500);
    
        
    }
}

export const AddFriend = (e) => {
    const container = document.createElement('div')
    const box = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const btn = document.createElement('button')
    box.setAttribute('class', 'fields')
    box.setAttribute('class', 'add-friend')
    label.innerHTML = "Enter user name: "
    btn.innerHTML = "ADD"
    btn.setAttribute('class', 'button')
    container.setAttribute('class', 'post-container')
    box.append(label, input, btn)
    container.append(box)
    document.body.insertBefore(container, document.body.firstChild)

    btn.addEventListener('click', HandleAddFriend)

    container.addEventListener('click', (e)=>{
       if(e.target == container){
        container.remove()
       } 
    })
}
const HandleAddFriend = async (e) => {
    const par = e.target.parentElement.children
    const user = par[1].value
    console.log(user)
try {
    const resp = await fetch('/addfriend',{
        method: 'POST', 
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({user:user})   
    })
    let message = await resp.json()
    console.log(message)
    ErrorHandler(message)
} catch (error) {
    console.log(error.message)
}
}
export const Befriend = async (e) => {
    const par = e.target.parentElement.children
    const user = par[0].innerText
    
try {
    const resp = await fetch('/addfriend',{
        method: 'POST', 
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({user:user})   
    })
    let message = await resp.json()
    
    ShowTicker(e.target, message)
} catch (error) {
    console.log(error.message)
}
}
const ShowTicker = (el, msg) => {
   
   if(msg.messages.includes('Friend added')){
    el.innerHTML = '✅'
        setTimeout(() => {
            el.remove()
        }, 2000);
        
    }
   }



export const DeleteFriend = async (e) => {
    const par = e.target.parentElement
    const target = par.children
    console.log(target[0].innerHTML)
    try {
       const resp = await fetch('/remove-friend', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: target[0].innerHTML})
       }) 
       const message = await resp.json()
       if(message.messages.includes('removed')){
       location.reload()
       }
       console.log(message.messages)
    } catch (error) {
        console.log(error)
    }

}
const ErrorHandler = (msg) =>{
    const oldErr = document.querySelector('span')
    if(oldErr){
        oldErr.remove()
    }
    const box = document.getElementsByClassName('add-friend')
    const span = document.createElement('span')
    span.setAttribute('class', 'err-span')
    span.innerHTML = msg.messages
    if(msg.messages.includes('Friend added')){
        span.style.backgroundColor = 'green'
        setTimeout(()=> {
            location.reload()
        }, 2000)
    }
    box[0].insertBefore(span, box[0].firstChild)
}