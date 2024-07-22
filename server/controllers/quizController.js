import mongoose from "mongoose";
import QuizModel from "../models/quizModel.js"
import QuestionModel from "../models/questionModel.js"
import UserModel from "../models/userModel.js"

// CREATE QUESTION CODE
const CreateQuestion = async (req, res) => {
    const { questionName, option, answer } = req.body; // option -> array

    // Validate input fields
    if (!questionName || !option || !answer) {
        return res.status(401).json({ success: false, message: "Please fill all fields correctly" });
    }

    if (!Array.isArray(option) || option.length !== 4 || !option.every(opt => typeof opt === 'string')) {
        return res.status(400).json({ success: false, message: "Option must be an array of exactly 4 strings" });
    }

    try {
        const question = await QuestionModel.create({ questionName, option, answer });
        return res.status(201).json({ success: true, message: "Question Created Successfully", questionId: question._id });
    } catch (error) {
        return res.status(501).json({ success: false, message: "Question Creation Failed", error: error.message });
    }
};


//CREATE QUIZ CODE
const CreateQuiz = async(req,res)=>{
    const {owner, questions, name} = req.body // owner -> id of user who created quiz & questions->array of question id

    if(!owner || !questions || !name) {
        return res.status(401).json({ success:false, message: "Please fill all fields correctly"})
    }

    try {
        const quiz = await QuizModel.create({owner, questions, name});
        const user = await UserModel.findById(owner);

        if(user){
            user.quizCreated.push(quiz._id)
            user.totalQuizCreated++;
            await user.save()
            return res.status(201).json({ success:true, message: "Quiz Created Successfully"})
        }
        else{
            return res.status(401).json({ success:false, message: "User Not Found"})
        }
    }
    catch (error) {
        return res.status(501).json({ success:false, message: "Quiz Creation Failed", error: error.message})
    }
}

// EDIT QUESTION CODE
const EditQuestion = async(req,res) => {
    const {questionId, questionName, option, answer } = req.body

    if (!questionName || !option || !answer) {
        return res.status(401).json({ success: false, message: "Please fill all fields correctly" });
    }

    if (!Array.isArray(option) || option.length !== 4 || !option.every(opt => typeof opt === 'string')) {
        return res.status(400).json({ success: false, message: "Option must be an array of exactly 4 strings" });
    }

    try {
        const question = await QuestionModel.findOneAndUpdate({_id:questionId}, {questionName, option, answer}, { new: true })

        if (!question) {
            return res.status(404).json({ success: false, message: "Question Not Found" });
        }

        return res.status(200).json({success : true , message:'Question Updated Succesfully'})
    } 
    catch (error) {
        return res.status(500).json({ success:false, message: "Question Creation Failed", error: error.message})
    }
}


// DELETE QUESTION CODE
const DeleteQuestion = async(req,res) => {
    const {questionId, quizId} = req.body
    try {
        const questionDeletion = await QuestionModel.findOneAndDelete({_id : questionId})
        if(!questionDeletion){
            return res.status(500).json({ success:false, message: "Question Deletion Failed", error: error.message})
        }

        if(quizId){
            await QuizModel.findOneAndUpdate({_id : quizId} , { $pull: { questions: questionId } })
        }

        return res.status(200).json({ success:true, message: "Question Deleted Successfully"})
    }
    catch (error) {
        return res.status(500).json({ success:false, message: "Question Deletion Failed", error: error.message})
    }
}


// DELETE QUIZ CODE
const DeleteQuiz = async (req, res) => {
    const { userId, quizId } = req.body;

    if (!userId || !quizId) {
        return res.status(400).json({ success: false, message: "Please provide all details" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const quiz = await QuizModel.findById(quizId)
        quiz.questions.forEach(async (questionId)=>{
            const deletedQuestion = await QuestionModel.findOneAndDelete(questionId)
            if (!deletedQuestion) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ success: false, message: "Quiz not found" });
            }
        })

        const deletedQuiz = await QuizModel.findByIdAndDelete(quizId, { session });
        if (!deletedQuiz) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }

        await UserModel.findByIdAndUpdate(userId, { $pull: { quizCreated: quizId } }, { session });
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ success: true, message: "Quiz Deleted Successfully" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ success: false, message: "Quiz Deletion Failed", error: error.message });
    }
};


export {CreateQuiz, CreateQuestion, EditQuestion, DeleteQuestion, DeleteQuiz}