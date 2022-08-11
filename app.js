require('dotenv').config()
const errorHandler = require('./controllers/errorHandler')
const User = require('./models/user')
const path = require('path')
const session = require('express-session')
const ConnectDB = require('./db/connect')
const express = require('express')
const isLogedIn = require('./middlewares/isLogedIn')
const  MongoDBStore  = require('connect-mongodb-session')(session)
const app = express()
const PORT = process.env.PORT || 5001
const uri = process.env.DB_URI
const store = new MongoDBStore({
    uri: process.env.SESS_DB_URI,
    databaseName: `sessions`,
    collection: 'sessions'

}, (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log(`Connecting to sessions DB...`)
    }
})
if(app.get('env') === `production`){
    app.set(`trust proxy`, 1)
    session.cookie.secure = true
}

app.use(session({
    name: process.env.SESS_NAME,
    resave: false,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    path: `/`,
    cookie: {
        maxAge: parseInt(process.env.SESS_LIFETIME),
        resave: false,
    },
    store,
}))
app.set('view engine', 'ejs')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())
// app.use(isLogedIn)

app.get('/', async (req, res, next)=>{
   
    res.render('pages/index', {
        title: 'Welcome to Blogga' ,
       sessUser: req.session.user,
        
 })
})
app.get('/profile', async (req, res)=>{
    let userList = []
    let postList = []
    try {
          let users = await User.find()
        for (let i = 0; i < users.length; i++){
        userList.push(users[i].user)
    }
    } catch (error) {
        console.log(error.message)
    }
    res.render('pages/profile', {
        title: `User profile`,
        sessUser: req.session.user,
        users: userList,
        posts: postList,
    })
    
})
app.get('/test', async (req, res)=>{
req.sessionStore.all((err, sess)=>{
    if(err){
        console.log(err)
    } else {
        console.log(sess)
    }
  
})


res.redirect('/')

})
app.get('/posts', async (req, res) => {
    res.redirect('/')
})
app.get('/users', async (req, res) =>{
    let userList = []
    
    try {
          let users = await User.find()
        for (let i = 0; i < users.length; i++){
            let userData = {
                user: users[i].user,
                born: users[i].createdAt,
                lastActive: users[i].meta.lastVisited,
                status: users[i].meta.isOnline,
            }
        userList.push(userData)
    }
    } catch (error) {
        console.log(error.message)
    }
     
   
    res.render('pages/users', {
        title: 'Blogga | Users' ,
        sessUser: req.session.user,
        users: userList,
    })
    

})
app.post('/login', async (req, res)=>{
 
    const { username, password } = req.body

    if(username && password) {
        try {
            const user = await User.findOne(
                {user: username,
                password: password
                }
            )
            if(user && user.password === password){
               
                req.session.userId = user._id
                req.session.user = user.user
                await req.sessionStore.all((err, sess)=>{
                    if(err){
                        console.log(err)    
                    } else {
                        sess.forEach(session => {
                          if(session.session.user === user.user){
                            req.sessionStore.destroy(session._id, (err)=>{
                                if(err){
                                    console.log(err)
                                }
                                
                            })
                            
                            
                          }
                          
                        })
                    }
                })
                res.status(200).json({messages: [`You've logged in successfully`]})
            } else {
                res.status(404).json({messages: [`Please provide valid credentials`]})
            }
          
        } catch (error) {
            console.log(error)
        }
        
    } else {
        res.status(400).json({ messages: [`Please provide valid credentials`], fields: ['username', 'password'] })
    }
    
})
app.post('/register', async (req, res, next)=>{

        let userCreds = new User({
            user: req.body.user,
            password: req.body.password,   
        })
        if(userCreds.password === req.body.confirmation){
            try {
                await  userCreds.save()
                res.status(201).json({messages: [`Account created successfully`]})
              } catch (error) {
                next(error)
              }
        } else {
            res.status(400).json({messages:`Please retype your password`, fields: [`confirm`]})
        }
})
app.get('/logout', async (req, res)=>{
    try {
        let resp = await User.updateOne({user: req.session.user}, {meta:{lastVisited: Date.now()}})
        console.log(`Mathed: ${resp.matchedCount}, modified: ${resp.modifiedCount}`)
    } catch (error) {
        console.log(error)
    }


await req.session.destroy((err)=>{
    if(err){
        console.log(err)
        res.status(500)
    } 
    res.redirect('/')
    
    })
})
 

app.use(errorHandler)

const  Start = async ()=>{
    try {
        await ConnectDB(uri)
        console.log('Connected to MongoDB...')
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error.message)
       
    }
 
}
Start()
