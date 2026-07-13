const User =require('../models/user')
const home = (req,res)=>{
    res.send('welcome')
}
const showSignUpForm = (req,res)=>{
res.render('auth/sign-up.ejs')
}
const signUp =async (req,res)=>{
  let userDate={}
  userDate.username = req.body.username
  userDate.password = req.body.password
  const user =await User.create(userDate)
    res.send(user)
}

module.exports={
    home,
    showSignUpForm,
    signUp

}