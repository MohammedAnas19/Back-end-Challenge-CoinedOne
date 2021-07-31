const BlockApp= require("../models/blockAppsModel");



//UPDATE THE EXISTING DATA
//Eg. REQUEST 
// {   
//     "blockApps":{"day":"Monday","apps":[ "Youtube", "Dailyhunt"],"workingHours":"9:00AM 5:00PM"}
// }
exports.updateBlockApps=(req,res)=>{
    const userId=req.user._id;
    const day=req.body.blockApps.day
    const apps=req.body.blockApps.apps
    console.log(day,"  ",apps)
    var updateBlockApp;
    BlockApp.findOne({userId:userId}).exec((error, data) => {
        if(error) {
            return res.status(500).json(error);
        }
        if(data){
            data.blockApps.map((d)=>{
                console.log("ddd",d)
                if(d.day==day){
                    d.apps=apps
                    data.save();  
                    return res.status(201).json("Updated successfully"); 
                }
            })
            data.blockApps.push({day:day,apps:apps,workingHours:req.body.blockApps.workingHours})
            data.save();  
            return res.status(201).json("Updated successfully"); 
        }
    });
}

//CREATE THE DATA FOR A NEW USER
//Eg. REQUEST
// { 
//     "blockApps":[{"day":"Monday","apps":[ "Youtube", "Dailyhunt"],"workingHours":"9:00AM 5:00PM"}]
// }
exports.createBlockApps=(req,res)=>{
    BlockApp.findOne({userId:req.user._id}).exec((error, data) => {
        if(error) {
            return res.status(500).json(error);
        }
        if(data){
            return res.status(401).json("User Already Exist. Try to update"); 
        }else{
            const blockApp=new BlockApp({
                userId:req.user._id,
                blockApps:req.body.blockApps
            });
            blockApp.save((error,blockApp)=>{
                if(error){return res.status(400).json({message:"Something went WRONG ",error:error});}                
                if(blockApp){
                    return res.status(201).json({blockApp});
                }
            });
        }
    }); 
}

//GET THE BLOCK APPS FOR SINGLE DAY
//Eg. REQUEST
// {
//     "day":"monday"
// }
//OR {}
exports.getBlockApp = (req, res) => {

    const date = new Date();
    const dayNumber = date.getDay();
  var day = "";

  //IF DAY SPECIFIED IN REQUEST BODY
  if(req.body.day){
    day=req.body.day
    day=day.charAt(0).toUpperCase() + day.slice(1);
}

//IF DAY NOT SPECIFIED IN REQUEST BODY THEN DAY WILL BE CURRENT DAY
else{
    
    if (dayNumber == 1) {
        day = "Monday";
      }
      if (dayNumber == 2) {
        day = "Tuesday";
      }
      if (dayNumber == 3) {
        day = "Wednesday";
      }
      if (dayNumber == 4) {
        day = "Thursday";
      }
      if (dayNumber == 5) {
        day = "Friday";
      }
      if (dayNumber == 6) {
        day = "Saturday";
      }
      if (dayNumber == 0) {
        day = "Sunday";
      }
}
 

  const userId = req.user._id;
  // day="Monday"
  if (day) {
    BlockApp.findOne({ userId: userId }).exec((error, data) => {
      if (error) {
        return res.status(500).json(error);
      }
      if (data) {
        data.blockApps.map((d) => {
          if (d.day == day) {
            return res.status(200).json({
                _id:d._id,
                day: d.day,
                apps: d.apps,
                workingHours: d.workingHours,
                id: d._id,
            });
          }
          if (data.blockApps.indexOf(d) == data.blockApps.length - 1) {
            return res
              .status(404)
              .json({ msg: "No Block Apps Found For " + day });
          }
        });
      }
    });
  }
};


//GET THE ALL BLOCK APPS FOR ALL DAY
//Eg. REQUEST
//{}
exports.getBlockApps = (req, res) => {
  const userId = req.user._id;
  BlockApp.findOne({ userId: userId }).exec((error, data) => {
    if (error) {
      return res.status(500).json(error);
    }
    if (data) {
      return res.status(200).json({
        data,
      });
    }
  });
};

//DELETE THE DATA
//Eg. REQUEST
// {
//     "_id":"6102c06127abfe3efc3c5ccb",
//     "deleteApp":"Dailyhunt"
// }
exports.deleteBlockApps = (req, res) => {
  const userId = req.user._id;
  if(req.body._id){
    const itemId = req.body._id;
    BlockApp.findOne({ userId: userId }).exec((error, data) => {
       if (error) {
            return res.status(500).json(error);
        }
        if (data) {
                   
            data.blockApps.map((d) => {
                if (d._id == itemId) {
                    d.apps.map((app) => {
                        console.log(app,"==",req.body.deleteApp)
                        if (app==req.body.deleteApp){
                            const index=d.apps.indexOf(app)
                            console.log(index)
                            d.apps.splice(index,1)
                            console.log(d.apps)
                            data.save();
                            return res.status(200).json({
                                msg:"Successfully Deleted",
                                data:data
                            });
                        }
                        if (d.apps.indexOf(app) == d.apps.length - 1) {
                            return res
                                .status(404)
                                .json({ msg: "No Block Apps Found For Item ID" + itemId });
                            }
                    })                  
                }
            });
        }
    })
  }
}

    
