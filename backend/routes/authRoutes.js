const express = require("express");

const bcrypt = require("bcryptjs");
const {randomUUID} = require("crypto")
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();



/* REGISTER */

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } =
      req.body;



    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });
    }



    const hashedPassword =
      await bcrypt.hash(password, 10);



    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });



    res.status(201).json({
      message: "User registered",

      user: {
        // id: user_id,
        name: user.name,
        email: user.email,
        // role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});



/* LOGIN */

router.post("/login", async (req, res) => {

  try {

    const { email, password , } =
      req.body;
      const deviceName =
      typeof req.body.deviceName == "string"
      ?req.body.deviceName.trim()
      :"";
      if(!deviceName || deviceName.length >100){
        return res.status(400).json({
          message:"A device name of some characters is required",
        })
      }



    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid email",
      });
    }



    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password",
      });
    }
    // const role = user.role || "user";
    // if(expectedROle === "admin" && role!== "admin"){
    //   return res.status(403).json({
    //     message: "You do not have admin access"
    //   })
    // }

    const sessionId = randomUUID();
    await User.updateOne(
      {
        _id: user._id
      },
      {$set: {activeSessionId: sessionId, activeDeviceName : deviceName}}
    )
    const token= jwt.sign(
      {
        id:user._id,
        // role,
        sessionId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn : "7d",
      }
    )
    res.json({
      token,
      user:{
        id : user._id,
        name : user.name,
        email: user.email,
        // role: user.role || "user",
      }
    })
  }catch(error){
    res.status(500).json({
      message: error.message,
    })
  }
});

router.post("/logout", authMiddleware , async(req,res) =>{
  await User.updateOne(
    {_id : req.user.id, activeSessionId: req.user.sessionId},
    {$set:{activeSessionId : null, activeDeviceName: null}}
  );
  res.json({ message: "LOgged out"})
})



    // const token = jwt.sign(
    //   {
    //     id: user._id,
    //   },

    //   process.env.JWT_SECRET,

    //   {
    //     expiresIn: "7d",
    //   }
    // );



//     res.json({
//       token,

//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });



module.exports = router;