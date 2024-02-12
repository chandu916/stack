import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userLoginHistorySchema = new Schema({
  userid: {type: Schema.Types.ObjectId,ref: 'User',required: t},
  id: {type: String,required: true},
  ipAddress: {type: String,required: true},
  systemType: {type: String,required: true},
  osType: {type: String,required: true},
  timeoflogin: {type: Date,default: Date.now,required: true}
});

module.exports = mongoose.model('UserLoginHistory', userLoginHistorySchema);

export default UserLoginHistory;