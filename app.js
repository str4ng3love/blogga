require("dotenv").config();
const userChecker = require("./controllers/userChecker");
const errorHandler = require("./controllers/errorHandler");
const User = require("./models/user");
const Post = require("./models/post");
const path = require("path");
const session = require("express-session");
const ConnectDB = require("./db/connect");
const express = require("express");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
const PORT = process.env.PORT || 5001;
const uri = process.env.DB_URI;
const store = new MongoDBStore(
  {
    uri: process.env.SESS_DB_URI,
    databaseName: `sessions`,
    collection: "sessions",
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Connecting to sessions DB...`);
    }
  }
);
if (app.get("env") === `production`) {
  app.set(`trust proxy`, 1);
  session.cookie.secure = true;
}

app.use(
  session({
    name: process.env.SESS_NAME || "connect.sid",
    resave: false,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    path: `/`,
    cookie: {
      maxAge: parseInt(process.env.SESS_LIFETIME),
      resave: false,
    },
    store,
  })
);
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", async (req, res, next) => {
  res.render("pages/index", {
    title: "Welcome to Blogga",
    sessUser: req.session.user,
  });
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const user = await User.findOne({ user: username, password: password });
      if (user && user.password === password) {
        req.session.userId = user._id;
        req.session.user = user.user;

        await req.sessionStore.all((err, sess) => {
          if (err) {
            console.log(err);
          } else {
            sess.forEach((session) => {
              if (session.session.user === user.user) {
                req.sessionStore.destroy(session._id, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            });
          }
        });
        res.status(200).json({ messages: [`You've logged in successfully`] });
      } else {
        res
          .status(404)
          .json({ messages: [`Please provide valid credentials`] });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res
      .status(400)
      .json({
        messages: [`Please provide valid credentials`],
        fields: ["username", "password"],
      });
  }
});
app.post("/register", async (req, res, next) => {
  let userCreds = new User({
    user: req.body.user,
    password: req.body.password,
  });
  if (userCreds.password === req.body.confirmation) {
    try {
      await userCreds.save();
      res.status(201).json({ messages: [`Account created successfully`] });
    } catch (error) {
      next(error);
    }
  } else {
    res
      .status(400)
      .json({ messages: `Please retype your password`, fields: [`confirm`] });
  }
});
app.get("/users", async (req, res) => {
  let userList = [];

  try {
    let users = await User.find();
    if (req.session.user) {
      currentUser = await User.findOne({ user: req.session.user });
    }

    for (let i = 0; i < users.length; i++) {
      let userData = {
        user: users[i].user,
        born: users[i].createdAt,
        lastActive: users[i].meta.lastVisited,
        status: users[i].meta.isOnline,
        displayBefriend: false,
      };
      if (req.session.user) {
        userData.displayBefriend = true;
        if (
          currentUser.meta.friendsList.includes(users[i]._id) ||
          req.session.user == users[i].user
        ) {
          userData.displayBefriend = false;
        }
      }
      userList.push(userData);
    }
  } catch (error) {
    console.log(error.message);
  }

  res.render("pages/users", {
    title: "Blogga | Users",
    sessUser: req.session.user,
    users: userList,
  });
});
app.get("/id:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let name = await user.user;
    res.json({ userName: name });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong.");
  }
});
app.get("/user:name", async (req, res) => {
  let postList = [];
  let userList = [];
  let currentUser;
  let userData;
  try {
    const users = await User.find({ user: req.params.name });
    if (req.session.user) {
      currentUser = await User.findOne({ user: req.session.user });
    }

    for (let i = 0; i < users.length; i++) {
      userData = {
        id: users[i]._id,
        user: users[i].user,
        born: users[i].createdAt,
        lastActive: users[i].meta.lastVisited,
        status: users[i].meta.isOnline,
        displayBefriend: false,
      };
      if (req.session.user) {
        userData.displayBefriend = true;
        if (
          currentUser.meta.friendsList.includes(users[i]._id) ||
          req.session.user == users[i].user
        ) {
          userData.displayBefriend = false;
        }
      }
      userList.push(userData);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
  try {
    let posts = await Post.find().populate("meta.author");

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].meta.author._id.toString() == userData.id) {
        postList.push(posts[i].title);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  res.render("pages/user", {
    title: "Blogga | User Profile",
    sessUser: req.session.user,
    users: userList,
    posts: postList,
  });
});
app.get("/posts", async (req, res) => {
  let postList = [];
  try {
    let posts = await Post.find();
    for (let i = 0; i < posts.length; i++) {
      let postData = {
        title: posts[i].title,
        createdAt: posts[i].meta.postedOn,
      };
      postList.push(postData);
    }
  } catch (error) {
    console.log(error);
  }

  res.render("pages/posts", {
    title: "Blogga | Posts",
    sessUser: req.session.user,
    posts: postList,
  });
});
app.post("/getpost", async (req, res) => {
  let post;
  try {
    post = await Post.findOne({ title: req.body.title });

    res.json({ data: post });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/post:id", async (req, res) => {
  let postData;

  try {
    postData = await Post.findOne({ title: req.params.id });
  } catch (error) {
    console.log(error.message);
  }
  res.render("pages/post", {
    sessUser: req.session.user,
    title: `Blogga | ${postData.title}`,
    post: postData,
  });
});
app.get("/about", (req, res) => {
  res.render("pages/about", {
    title: `Blogga | About`,
    sessUser: req.session.user,
  });
});

app.get("*", userChecker);
app.post("/editpost", async (req, res, next) => {
  try {
    let resp = await Post.findOneAndUpdate(
      { title: req.body.oldTitle },
      {
        $set: {
          title: req.body.title,
          paragraph1: req.body.paragraph1,
          paragraph2: req.body.paragraph2,
          paragraph3: req.body.paragraph3,
          img1: req.body.img1,
          img2: req.body.img2,
        },
      },
      { runValidators: true }
    );
    if (resp) {
      res.status(201).json({ messages: [`Updated!`] });
    } else {
      res.status(404).json({ messages: ["Post not found."] });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});
app.delete("/remove-friend", async (req, res) => {
  let friend;
  try {
    friend = await User.findOne({ user: req.body.user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ messages: error.message });
  }

  try {
    const resp = await User.findOneAndUpdate(
      { user: req.session.user },
      { $pull: { "meta.friendsList": friend._id } }
    );
    res.json({ messages: "Friend removed." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ messages: error.message });
  }
});
app.get("/profile", async (req, res) => {
  let usersFriends = [];
  let postList = [];

  try {
    let posts = await Post.find().populate("meta.author");

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].meta.author._id.toString() == req.session.userId) {
        postList.push(posts[i].title);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  try {
    let user = await User.findOne({ user: req.session.user }).populate(
      "meta.friendsList"
    );
    user.meta.friendsList.forEach((friend) => {
      usersFriends.push(friend.user);
    });
  } catch (error) {
    console.log(error.message);
  }

  res.render("pages/profile", {
    title: `My profile`,
    sessUser: req.session.user,
    friends: usersFriends,
    posts: postList,
  });
});
app.post("/addfriend", async (req, res) => {
  try {
    const resp = await User.findOne({ user: req.body.user });
    if (resp === null) {
      res.status(404).json({ messages: "User not found." });
    } else if (resp.user === req.session.user) {
      res.status(401).json({ messages: `Can't add yourself.` });
    } else if (resp.user) {
      const ans = await User.findOneAndUpdate(
        { user: req.session.user },
        { $addToSet: { "meta.friendsList": resp._id } }
      );
      res.json({ messages: "Friend added." });
    } else {
      res
        .status(500)
        .json({ messages: "Something went wrong, try again later." });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ messages: error.message });
  }
});
app.delete("/post", async (req, res) => {
  try {
    let resp = await Post.deleteOne({ title: req.body.title });
    res.json({ messages: resp });
  } catch (error) {
    console.log(error.message);
  }
});
app.post("/createpost", async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    paragraph1: req.body.paragraph1,
    paragraph2: req.body.paragraph2,
    paragraph3: req.body.paragraph3,
    img1: req.body.img1,
    img2: req.body.img2,
    meta: {
      author: req.session.userId.toString().slice(0),
    },
  });

  if (req.session.user) {
    try {
      await post.save();
      res.status(201).json({ messages: [`Posted!`] });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({ messages: `someting went wong` });
  }
});

app.get("/logout", async (req, res) => {
  try {
    let resp = await User.updateOne(
      { user: req.session.user },
      { "meta.lastVisited": Date.now() }
    );
  } catch (error) {
    console.log(error);
  }

  await req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    res.redirect("/");
  });
});
app.post("/changepass", async (req, res, next) => {
  let resp;
  try {
    resp = await User.findOneAndUpdate(
      { $and: [{ user: req.session.user }, { password: req.body.password }] },
      { password: req.body.newPassword },
      { runValidators: true }
    );

    if (resp) {
      res.json({ messages: `Success!` });
    } else if (!resp) {
      res.status(404).json({ messages: `Please enter your current password.` });
    }
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
});

app.use(errorHandler);

const Start = async () => {
  try {
    await ConnectDB(uri);
    console.log("Connected to MongoDB...");
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error.message);
  }
};
Start();
