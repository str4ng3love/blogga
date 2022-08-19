let oldTitle

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

export const EditPost = async (e)=> {   
    
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
        btn.innerHTML = `EDIT POST`
    
        
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

        let par = e.target.parentElement.parentElement
        let title = par.children
        oldTitle = title[0].textContent
       
        try {
            let resp = await fetch('/getpost', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: oldTitle})
            })
         
            let data = await resp.json()
            let post = data.data
            inputTitle.value = post.title
            taPar.innerHTML = post.paragraph1
            if(post.img1){
                inputImg.value = post.img1
            }
            if(post.paragraph2){
                taPar1.innerHTML = post.paragraph2
            }
            if(post.inputImg1){
                inputImg1.value = post.img2
            }
            if(post.paragraph3){
                taPar2.innerHTML = post.paragraph3
            }
            
           
        } catch (error) {
            console.log(error.message)
        }

        btn.addEventListener('click', (e)=> {
            handleEditPost(e)
        })
        container.addEventListener('click', (e)=>{
            if(e.target == container){
                container.remove()
            }
        })
}
const handleEditPost = async (e, address)=>{
    let post = {
    }
    let data = []
    const input = Array.from(e.target.previousSibling.children)
        input.forEach(el => {
            data.push(el.children[1].value)
        })
    post = {
        oldTitle: oldTitle,
        title: data[0],
        paragraph1: data[1],
        img1: data[2],
        paragraph2: data[3],
        img2: data[4],
        paragraph3: data[5],
    }
 console.log(oldTitle)
    try {
       const resp = await fetch('/editpost',{
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
if(postMsg.messages.length == 1 && postMsg.messages[0].includes('Posted') || postMsg.messages[0].includes('Updated')){
    err.style.backgroundColor = 'green';
    setTimeout(() => {
        let doc = document.getElementsByClassName('post-container')
        doc[0].remove()
        location.reload()
    }, 2000);
}

div.append(err)
pForm[0].insertBefore(div, pForm[0].firstChild)

}