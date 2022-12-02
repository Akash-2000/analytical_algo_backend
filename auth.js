const router = require("express").Router()
const sendEmail = require("./sendgoogle")
const User = require("./userschema")
const bcrypt = require("bcrypt")

// Register
router.post("/register",async(req,res)=>{
    try {
        console.log(req.body)
        const salt = await bcrypt.genSalt(10)
        const num = Math.round(1000 + Math.random() * 9000);
        console.log(num); 
        const hashedpassword = await bcrypt.hash(req.body.Password, salt);
        const newuser = new User({
            userName:req.body.userName,
             userEmail:req.body.userEmail,
             PhoneNumber:req.body.PhoneNumber,
            Password:hashedpassword,
            VerificationNumber:num
        })
        const email = req.body.userEmail
        const name = req.body.userName

         await sendEmail(email,name,String(num));
        const user = await newuser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Verify
router.post("/login",async(req,res)=>{
    try {
       const user =  await User.findOne({VerificationNumber:req.body.VerificationNumber})
       if(!user){
            res.status(403).json("user not identifed")
       }
        if(user.VerificationNumber == req.body.VerificationNumber){
                    User.findOneAndUpdate({userName: req.body.userName }, 
                {VerificationStatus:"Verified"}, null, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Original Doc : ",docs);
                }
            });

            res.status(200).json(user)
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router