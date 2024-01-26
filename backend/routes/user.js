const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User } = require("../db");
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  username: zod.string().optional(),
  password: zod.string().optional(),
  lastName: zod.string().optional(),
});
// sign up route
router.post("/signup", async (req, res) => {
  const { data } = signupBody.safeParse(req.body);

  if (!data) {
    return res.status(401).json({
      msg: "Username Invalid | Invalid Inputs ",
    });
  }

  const userExits = await User.findOne({
    username: req.body.username,
  });

  if (userExits) {
    return res.status(401).json({
      msg: " User Already Exists ! ",
    });
  }

  // creates and saves the user
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const t userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  return res.json({
    message: " User created sucessfully ",
    token: token,
  });
});

// signin router
router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: " Incorrect Inputs ",
    });
  }

  // check for the  user in the db
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  //if exist then generate and return the token

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    return res.json({
      token: token,
    });
  }

  return res.status(411).json({
    message: "User not found in the db ",
  });
});

//update router
router.put("/update", authMiddleware, async (req, res) => {
  const { check } = updateBody.safeParse(req.body);

  if (!check) {
    return res.status(401).json({
      message: " Invalid data Provided  !",
    });
  }

  //updating the user from the database
  User.updateOne(req.body, {
    _id: req.userId,
  });

  res.json({
    message: " User Data Updated Successfully !",
  });
});


router.get("/bulk",async (req,res) =>{
    const filter = req.query.filter || "";   // get the filter from the params else " "(No filter)

    const users  =  User.find({   // mongo query to get the data using the first or lastname !
        $or: [
          { firstName: { $regex: filter } },
          { lastName: { $regex: filter } },
        ],
      })


      res.json({
        user : user.map(user=> ({
            username : user.username,
            firstName : firstName.username,
            lastName : lastName.username,
            _id : user.userId,
        }))
      })
})
// UserRouter.get()
module.exports = router;
