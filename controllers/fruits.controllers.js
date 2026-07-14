const Fruit= require('../models/fruits.js');
const index= async (req,res)=>{
          let allFruits = await Fruit.find()
        res.render('index.ejs',{
            allFruits
        })}
const show = async(req,res)=>{
            let findFruit= await Fruit.findById(req.params.fruitId)
    
             res.render('show.ejs',{
                findFruit
             })
        }
  const deleteFruit = async(req,res) =>{
        await Fruit.findByIdAndDelete(req.params.fruitId)
            res.redirect('/fruits')
    }
    const edit = async (req,res) =>{
        let findFruit= await Fruit.findById(req.params.fruitId)
 console.log(findFruit)
        res.render('edit.ejs',{
            findFruit
        })
    }
const update = async (req,res) =>{
        console.log(req.body)
        const fruitData = {}
    fruitData.name = req.body.name
    
    if(req.body.isReadyToEat === 'on'){
        fruitData.isReadyToEat =true

    }else{
        fruitData.isReadyToEat = false
    }
       let updateFruit =  await Fruit.findByIdAndUpdate(req.params.fruitId,fruitData,{new :true})
            res.redirect(`/fruits/${req.params.fruitId}`)
    }
    newFruit=async (req,res) =>{
        //
        const fruitData = {}
        // fruitData.name = req.body.name
        // fruitData.isReadyToEat = req.body.isReadyToEat
        //     res.send(req.body)
        fruitData.name = req.body.name
    
        if(req.body.isReadyToEat === 'on'){
            fruitData.isReadyToEat =true
    
        }else{
            fruitData.isReadyToEat = false
        }
        let createdFruit = await Fruit.create(fruitData)
        res.redirect('/fruits')
        }
    module.exports={
        index,
        show,
        deleteFruit,
        edit,
        update,
        newFruit,
    }
    
