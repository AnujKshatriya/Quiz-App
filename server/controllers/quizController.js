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
    // Find the quiz and ensure it exists
    const quiz = await QuizModel.findById(quizId).session(session);
    if (!quiz) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    // Delete all associated questions
    for (const questionId of quiz.questions) {
      try {
        const deletedQuestion = await QuestionModel.findOneAndDelete({ _id: questionId }, { session });
        if (!deletedQuestion) {
          console.warn(`Question with ID ${questionId} not found.`);
          // Continue deleting the rest of the questions even if one is missing
        }
      } catch (err) {
        console.error(`Error deleting question with ID ${questionId}:`, err);
        // Optionally decide whether to continue or abort transaction
      }
    }

    // Delete the quiz
    const deletedQuiz = await QuizModel.findByIdAndDelete(quizId, { session });
    if (!deletedQuiz) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    // Update the user
    await UserModel.findByIdAndUpdate(userId, { $pull: { quizCreated: quizId } }, { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ success: true, message: "Quiz Deleted Successfully" });
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();
    console.error("Error during quiz deletion:", error);
    return res.status(500).json({ success: false, message: "Quiz Deletion Failed", error: error.message });
  }
};

  
  

const DisplayQuizList = async (req, res) => {
  const userId = req.body.userId;

  console.log("Received request to fetch quizzes for user:", userId);

  try {
    // Attempt to find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      console.error("User not found with ID:", userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User found:", user);

    // Fetch quizzes created by the user
    const quizzes = await QuizModel.find({ _id: { $in: user.quizCreated } });

    console.log("Quizzes found for user:", quizzes);

    return res.status(200).json({ success: true, quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch Quizzes", error: error.message });
  }
};
  


export {CreateQuiz, CreateQuestion, EditQuestion, DeleteQuestion, DeleteQuiz,DisplayQuizList}