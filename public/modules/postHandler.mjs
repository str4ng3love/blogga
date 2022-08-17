


export const CreatePost=()=>{
    const container = document.createElement('div')
    const postForm = document.createElement('div')
    const fields = document.createElement('div')
    const pFields = document.createElement('div')
    const pFields1 = document.createElement('div')
    const pFields2 = document.createElement('div')
    const pFields3 = document.createElement('div')
    const pFields4 = document.createElement('div')
    const pFields5 = document.createElement('div')
    const labTitle = document.createElement('label')
    const inputTitle = document.createElement('input')
    const labPar = document.createElement('label')
    const taPar = document.createElement('textarea')
    const labImg = document.createElement('label')
    const inputImg = document.createElement('input')
    const labImg1 = document.createElement('label')
    const inputImg1 = document.createElement('input')
    const labPar1 = document.createElement('label')
    const taPar1 = document.createElement('textarea')
    const labPar2 = document.createElement('label')
    const taPar2 = document.createElement('textarea')
    const btn = document.createElement('button')
    container.setAttribute('class', 'post-container')
    postForm.setAttribute('class', 'post-form')
    fields.setAttribute('class', 'input')
    pFields.setAttribute('class', 'post-fields')
    pFields1.setAttribute('class', 'post-fields')
    pFields2.setAttribute('class', 'post-fields')
    pFields3.setAttribute('class', 'post-fields')
    pFields4.setAttribute('class', 'post-fields')
    pFields5.setAttribute('class', 'post-fields')
    inputImg.setAttribute('placeholder', 'optional')
    inputImg1.setAttribute('placeholder', 'optional')
    taPar1.setAttribute('placeholder', 'optional')
    taPar2.setAttribute('placeholder', 'optional')
    btn.setAttribute('class', 'button')
    labTitle.innerHTML = `Title: `
    labPar.innerHTML = `Paragraph1: `
    labImg.innerHTML = `Image 1 adress :`
    labPar1.innerHTML = `Paragraph2: `
    labImg1.innerHTML = `Image 2 adress :`
    labPar2.innerHTML =`Paragraph3: `
    btn.innerHTML = `POST`

    
    pFields.append(labTitle, inputTitle)
    pFields1.append(labPar, taPar)
    pFields2.append(labImg, inputImg)
    pFields3.append(labPar1, taPar1)
    pFields4.append(labImg1, inputImg1)
    pFields5.append(labPar2, taPar2)
    fields.append(pFields, pFields1, pFields2, pFields3, pFields4, pFields5)
    postForm.append(fields, btn)
    container.append(postForm)
    document.body.insertAdjacentElement('afterbegin', container)
    
    btn.addEventListener('click', (e)=> {
        handleCreatePost(e)
    })
    container.addEventListener('click', (e)=>{
        if(e.target == container){
            container.remove()
        }
    })
}

const handleCreatePost = async (e)=>{
    let post = {
    }
    let data = []
    const input = Array.from(e.target.previousSibling.children)
        input.forEach(el => {
            data.push(el.children[1].value)
        })
    post = {
        title: data[0],
        paragraph1: data[1],
        img1: data[2],
        paragraph2: data[3],
        img2: data[4],
        paragraph3: data[5],
    }
 
    try {
       const resp = await fetch('/createpost',{
            method: "POST",
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify(post)
        })
        let message = await resp.json()
        ErrorHandler(message)
       
        
        
    } catch (error) {
        console.log(error)
    }

}
  
const ErrorHandler = (postMsg) => {
const oldErr = document.getElementsByClassName('err-container')
if(oldErr[0]){
    oldErr[0].remove()
}

const err = document.createElement('span')
const pForm = document.getElementsByClassName('post-form')
const div = document.createElement('div')
div.setAttribute('class', 'err-container')
err.innerHTML = postMsg.messages
err.setAttribute('class', 'post-err')
console.log(postMsg.messages)
if(postMsg.messages.length == 1 && postMsg.messages[0].includes('Posted')){
    err.style.backgroundColor = 'green';
    setTimeout(() => {
        let doc = document.getElementsByClassName('post-container')
        doc[0].remove()
    }, 2000);
}

div.append(err)
pForm[0].insertBefore(div, pForm[0].firstChild)

}