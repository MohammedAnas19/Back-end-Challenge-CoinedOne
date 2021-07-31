const mongoose= require('mongoose');
const { Schema } = mongoose;


const blockAppsSchema = new Schema({ 
  userId:Schema.Types.ObjectId,
  blockApps:[{day:String,apps:[String],workingHours:String}]
},{timestamps:true});



module.exports = mongoose.model('BlockApp', blockAppsSchema);