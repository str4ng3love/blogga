import { ErrorHandler } from "./formHandler.mjs"


export const CreatePost=()=>{
    const container = document.createElement('div')
    const heading = document.createElement('h4')
    const postForm = document.createElement('form')
    const fields = document.createElement('div')
    const pFields = document.createElement('div')
    const pFields1 = document.createElement('div')
    const pFields2 = document.createElement('div')
    const pFields3 = document.createElement('div')
    const pFields4 = document.createElement('div')
    const pFields5 = document.createElement('div')
    const pFieldsHeading = document.createElement('div')
    const btnContainer = document.createElement('div')
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
    container.setAttribute('class', 'form-container')
    heading.setAttribute('id', 'create-post-heading')
    postForm.setAttribute('class', 'post-form')
    fields.setAttribute('class', 'input')
    pFields.setAttribute('class', 'fields')
    pFields1.setAttribute('class', 'fields')
    pFields2.setAttribute('class', 'fields')
    pFields3.setAttribute('class', 'fields')
    pFields4.setAttribute('class', 'fields')
    pFields5.setAttribute('class', 'fields')
    pFieldsHeading.setAttribute('class', 'fields')
    inputImg.setAttribute('placeholder', 'optional')
    inputImg1.setAttribute('placeholder', 'optional')
    taPar1.setAttribute('placeholder', 'optional')
    taPar2.setAttribute('placeholder', 'optional')
    btnContainer.classList.add('btn_container')
    btn.setAttribute('class', 'button')
    labTitle.innerHTML = `Title: `
    labPar.innerHTML = `Paragraph1: `
    labImg.innerHTML = `Image 1 adress :`
    labPar1.innerHTML = `Paragraph2: `
    labImg1.innerHTML = `Image 2 adress :`
    labPar2.innerHTML =`Paragraph3: `
    btn.innerHTML = `POST`
    heading.innerText ="Create a Post"
    inputTitle.setAttribute('name', 'title')
    taPar.setAttribute('name', 'paragraph1')
    pFields.append(labTitle, inputTitle)
    pFields1.append(labPar, taPar)
    pFields2.append(labImg, inputImg)
    pFields3.append(labPar1, taPar1)
    pFields4.append(labImg1, inputImg1)
    pFields5.append(labPar2, taPar2)
    pFieldsHeading.append(heading)
    btnContainer.append(btn)
    fields.append(pFields, pFields1, pFields2, pFields3, pFields4, pFields5)
    postForm.append(pFieldsHeading ,fields, btnContainer)
    container.append(postForm)
    document.body.insertAdjacentElement('afterbegin', container)
    
    btn.addEventListener('click', (e)=> {
        e.preventDefault()
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

    const input = Array.from(e.target.parentElement.previousSibling.children)
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
        const heading = document.createElement('h4')
        const postForm = document.createElement('form')
        const fields = document.createElement('div')
        const pFields = document.createElement('div')
        const pFields1 = document.createElement('div')
        const pFields2 = document.createElement('div')
        const pFields3 = document.createElement('div')
        const pFields4 = document.createElement('div')
        const pFields5 = document.createElement('div')
        const pFieldsHeading = document.createElement('div')
        const btnContainer = document.createElement('div')
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
        container.setAttribute('class', 'form-container')
        heading.setAttribute('id', 'edit-post-heading')
        postForm.setAttribute('class', 'post-form')
        fields.setAttribute('class', 'input')
        pFields.setAttribute('class', 'fields')
        pFields1.setAttribute('class', 'fields')
        pFields2.setAttribute('class', 'fields')
        pFields3.setAttribute('class', 'fields')
        pFields4.setAttribute('class', 'fields')
        pFields5.setAttribute('class', 'fields')
        pFieldsHeading.setAttribute('class', 'fields')
        inputImg.setAttribute('placeholder', 'optional')
        inputImg1.setAttribute('placeholder', 'optional')
        taPar1.setAttribute('placeholder', 'optional')
        taPar2.setAttribute('placeholder', 'optional')
        btnContainer.classList.add('btn_container')
        btn.setAttribute('class', 'button')
        heading.innerText ="Edit the Post"
        inputTitle.setAttribute('name', 'title')
        taPar.setAttribute('name', 'paragraph1')
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
        pFieldsHeading.append(heading)
        btnContainer.append(btn)
        fields.append(pFields, pFields1, pFields2, pFields3, pFields4, pFields5)
        postForm.append(pFieldsHeading ,fields, btnContainer)
        container.append(postForm)

        document.body.insertAdjacentElement('afterbegin', container)

        
        let title = e.target.parentElement.parentElement.children[0].children[0].textContent

       
        try {
            let resp = await fetch('/getpost', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title})
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
           e.preventDefault()
            handleEditPost(e, title)
        })
        container.addEventListener('click', (e)=>{
            if(e.target == container){
                container.remove()
            }
        })
}
const handleEditPost = async (e, oldTitle)=>{
 
    let data = []
    
    const input = Array.from(e.target.parentElement.previousSibling.children)
        input.forEach(el => {
            data.push(el.children[1].value)
        })
    let post = {
        oldTitle: oldTitle,
        title: data[0],
        paragraph1: data[1],
        img1: data[2],
        paragraph2: data[3],
        img2: data[4],
        paragraph3: data[5],
    }

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
       
        console.log(resp)
        
    } catch (error) {
        console.log(error)
    }

}
  
