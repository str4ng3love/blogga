

export const CreateLogForm=()=>{
    const container = document.createElement('div')
    const fieldsContainer = document.createElement('div')
    const form = document.createElement('form')
    const labName = document.createElement('label')
    const labPass = document.createElement('label')
    const inputName = document.createElement('input')
    const inputPass = document.createElement('input')
    const btn = document.createElement('button')
    const regLink = document.createElement('a')

    container.setAttribute('class', 'form-container')
    fieldsContainer.setAttribute('class', 'fields')
    inputName.setAttribute('type' , 'text')
    inputName.setAttribute('autocomplete' , 'username')
    inputName.setAttribute('name' , 'username')
    inputPass.setAttribute('type', 'password')
    inputPass.setAttribute('name', 'password')
    inputPass.setAttribute('autocomplete' , 'current-password')
    btn.setAttribute('class', 'button')
    labName.innerHTML ="User Name:"
    labPass.innerHTML ="Password:"
    btn.innerHTML = "LOG IN"
    regLink.innerHTML =`Don't have an account? Register`
    


    container.appendChild(form)
    form.appendChild(fieldsContainer)
    fieldsContainer.append(labName, inputName, labPass, inputPass, btn, regLink)
 

    document.body.insertAdjacentElement('afterbegin', container)
    btn.addEventListener('click',(e)=>HandleLogIn(e))
    regLink.addEventListener('click', ()=>{
        container.remove()
        CreateRegForm()
    })
    container.addEventListener('click', (e)=>{
        if(e.target == container){
            container.remove()
        }
    })
}

export const CreateRegForm=()=>{

    

    const container = document.createElement('div')
    const fieldsContainer = document.createElement('div')
    const form = document.createElement('form')
    const labName = document.createElement('label')
    const labPass = document.createElement('label')
    const labRePass = document.createElement('label')
    const inputName = document.createElement('input')
    const inputPass = document.createElement('input')
    const inputRePass = document.createElement('input')
    const btn = document.createElement('button')
    const logLink = document.createElement('a')

    container.setAttribute('class', 'form-container')
    fieldsContainer.setAttribute('class', 'fields')
    inputName.setAttribute('type' , 'text')
    inputName.setAttribute('autocomplete' , 'username')
    inputName.setAttribute('name', 'user')
    inputPass.setAttribute('type', 'password')
    inputPass.setAttribute('name', 'password')
    inputPass.setAttribute('autocomplete' , 'new-password')
    inputRePass.setAttribute('type', 'password')
    inputRePass.setAttribute('autocomplete' , 'none')
    inputRePass.setAttribute('name','confirm')
    btn.setAttribute('class', 'button')
    
    labName.innerHTML ="User Name:"
    labPass.innerHTML ="Password:"
    labRePass.innerHTML ='Confirm Password:'
    btn.innerHTML = "REGISTER"
    logLink.innerHTML ="Already have an account? Log In"

    container.appendChild(form)
    form.append(fieldsContainer)
    fieldsContainer.append(labName, inputName, labPass, inputPass, labRePass, inputRePass, btn, logLink)

    document.body.insertAdjacentElement('afterbegin', container)

    btn.addEventListener('click', (e)=>HandleRegister(e))
    logLink.addEventListener('click', ()=>{
        container.remove()
        CreateLogForm()
    })
    container.addEventListener('click', (e)=>{
        if(e.target == container){
            container.remove()
        }
    })
}

const HandleLogIn = async (e)=>{
    e.preventDefault()
    let form = e.target.parentElement
    let childList = form.children
    let userName = childList[1].value
    let userPassword = childList[3].value
    let userData = {
        username : userName,
        password : userPassword
    }
try {
    const resp = await fetch('/login', {
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify(userData) 
    })
    let message = await resp.json()
    
    
   ErrorHandler(message)
} catch (error) {
    console.log(error.message)
}

}

const HandleRegister = async (e)=>{
    e.preventDefault()
    let form = e.target.parentElement
    let childList = form.children
    let userName = childList[1].value
    let userPassword = childList[3].value
    let passwordConfirm = childList[5].value
    if(userPassword !== passwordConfirm){
        
    }
    let userRegData = {
        user : userName,
        password : userPassword,
        confirmation: passwordConfirm,
    }

    try {
        const resp = await fetch('/register', {
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify(userRegData) 
        })
        let message = await resp.json()

        ErrorHandler(message)
    } catch (error) {
        console.log(error)
    }

}

const ErrorHandler = (formMsg)=> {
    let oldErr = document.querySelector('span')
    if(oldErr){
        oldErr.remove()
    }
  
    let inputs = document.querySelectorAll('input')
    inputs.forEach((input)=>{

        input.style.backgroundColor = ' var(--colorText)'
    })

    const form = document.querySelector('form')
    const errSpan = document.createElement('span')
    errSpan.setAttribute('class', 'err-span')
    errSpan.innerHTML = formMsg.messages

    if(formMsg.messages.length == 1 && formMsg.messages[0].includes(`success`)) {
        errSpan.style.backgroundColor = 'green'

        setTimeout(()=>{
            const formC = document.getElementsByClassName('form-container')
            if(formC){
                formC[0].remove()
                location.reload()
            }
           
        }, 1000 * 1)
        
    }
   
    form.insertBefore(errSpan, form.firstChild)
     if(formMsg.fields) {
       
        formMsg.fields.forEach((field)=>{
    
            let el = document.getElementsByName(field)
            el[0].style.backgroundColor = 'red'
    
        }) 
    }
       

}