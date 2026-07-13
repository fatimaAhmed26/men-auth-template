const User =require('../models/user')
const bcrypt = require('bcrypt')
const home = (req,res)=>{
    res.send('welcome')
}
const showSignUpForm = (req,res)=>{
res.render('auth/sign-up.ejs')
}
const signUp =async (req,res)=>{
    const userInTheDatabase = await User.findOne({
        username: req.body.username
    })
    if(userInTheDatabase){
        return res.send('User already taken.')
    }
  let userDate={}
  userDate.username = req.body.username
  userDate.password = req.body.password
  const hasHadPassword = bcrypt.hashSync(req.body.password, 10)
  userDate.password = userDate.username
  const user =await User.create(userDate)
    res.send(user)
}
const showSignInForm = (req , res) =>{
    res.render('auth/sign-in.ejs')
}
const singIn = async (req , res) => {
    const userInDatabase = await User.findOne({
        username: req.body.username
    })

    if (!userInDatabase) {
        return res.send('User does not exist.')
    }

    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)

    if(!validPassword) {
        return res.send('Login failed. Please try again.')
    }

    res.send('sing in rout')
}

module.exports={
    home,
    showSignUpForm,
    signUp ,
    showSignInForm,
    singIn,


}