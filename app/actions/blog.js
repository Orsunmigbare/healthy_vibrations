const articles = require('../models/artilces');

const actions = {
    homepage : async (req,res,next)=>{
        let data  = {}
        let laningItems =  articles.find().sort({date: -1}).limit(5).select('date writer title category landing_image');
        let feedingItems = articles.find({category : 'feeding'}).limit(6).select('category landing_image date writer title paragraphs')
        let lifestyleItems = articles.find({category : 'lifestyle'}).limit(6).select('category landing_image date writer title paragraphs')
        let popularItems = articles.find().sort({views: -1}).limit(4).select('landing_image category title writer date paragraphs')
        Promise.all([laningItems.exec(),feedingItems.exec(), lifestyleItems.exec(), popularItems.exec()])
        .then((values)=>{
            data.landingItems = values[0];
            data.feedingItems = values[1];
            data.lifestyleItems = values[2];
            data.popularItems = values[3];
            req.response_data = data;
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
        next()
    }
}

module.exports = actions;