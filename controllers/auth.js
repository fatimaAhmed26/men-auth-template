const home = (req,res)=>{
    res.send('welcome')
}
const showSignUpForm = (req,res)=>{
res.render('auth/sign-up.ejs')
}


module.exports={
    home,
    showSignUpForm

}