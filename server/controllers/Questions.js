import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

export const AskQuestion = async (req , res) =>{
    const { questionTitle, questionBody, questionTags, userPosted, userId } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required to post a question' });
    }

    if (!questionTitle || !questionBody || !questionTags || !userPosted) {
      return res.status(400).json({ message: 'Please provide title, body, tags, and author for the question' });
    }

    const tagsArray = Array.isArray(questionTags)
      ? questionTags.filter((tag) => typeof tag === 'string' && tag.trim())
      : typeof questionTags === 'string'
        ? questionTags.split(/[ ,]+/).filter((tag) => tag.trim())
        : [];

    if (tagsArray.length === 0) {
      return res.status(400).json({ message: 'Please provide at least one valid tag' });
    }

    const postQuestionData = {
      questionTitle: questionTitle.trim(),
      questionBody: questionBody.trim(),
      questionTags: tagsArray,
      userPosted: userPosted.trim(),
      userId: userId || req.userId,
    };

    const postQuestion = new Questions(postQuestionData);
    try {
        await postQuestion.save();
        res.status(201).json({ message: 'Posted question successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Couldn't post a question" });
    }
}
export const getAllQuestions = async (req , res ) =>{
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}
export const deleteQuestion = async(req,res) =>{
   const {id:_id} = req.params ;

   if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('question unavailabe')}

    try {
        await Questions.findByIdAndDelete(_id);
        res.status(200).json({message:"sucessfully deleted..."})
    } catch (error) {
        res.status(404).json({ message : error.message})
        
    }
}

export const voteQuestion = async(req,res) =>{
    const {id:_id} = req.params ;
    const {value, userId} = req.body
 
    if (!mongoose.Types.ObjectId.isValid(_id)){
     return res.status(404).send('question unavailabe')}
 
     try {
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id => id === String(userId)))
        const downIndex = question.downVote.findIndex((id => id === String(userId)))

            if(value === 'upVote'){
                if(downIndex !== -1){
                    question.downVote = question.downVote.filter((id) => id !== String(userId))
                }
                if(upIndex === -1){
                    question.upVote.push(userId)
                }else{
                    question.upVote = question.upVote.filter((id) => id !== String(userId))
                }
            }
            else if(value === 'downVote'){
                if(upIndex !== -1){
                    question.upVote = question.downVote.filter((id) => id !== String(userId))
                }
                if(downIndex === -1){
                    question.downVote.push(userId)
                }else{
                    question.downVote = question.downVote.filter((id) => id !== String(userId))
                }
            }
            await Questions.findByIdAndUpdate( _id, question)
            res.status(200).json({message:"voted sucesssfulyy"})
     } catch (error) {
         res.status(404).json({ message : error.message})
         
     }
 }

 ///Users/chandu/Documents/StackOverflow/server/controllers/Questions.js