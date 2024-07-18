import QuizModel from "../models/quizModel.js"
import QuestionModel from "../models/questionModel.js"
import UserModel from "../models/userModel.js"

// first creating a question 
const CreateQuestion = async (req, res) => {
    const { questionName, option, answer } = req.body; // option -> array

    // Validate input fields
    if (!questionName || !option || !answer) {
        return res.status(401).json({ success: false, message: "Please fill all fields correctly" });
    }

    // Ensure option is an array of exactly 4 strings
    if (!Array.isArray(option) || option.length !== 4 || !option.every(opt => typeof opt === 'string')) {
        return res.status(400).json({ success: false, message: "Option must be an array of exactly 4 strings" });
    }

    try {
        const question = await QuestionModel.create({ questionName, option, answer });
        return res.status(201).json({ success: true, message: "Question created successfully", questionId: question._id });
    } catch (error) {
        return res.status(501).json({ success: false, message: "Question creation failed", error: error.message });
    }
};


//creating a quiz and storing in database
const CreateQuiz = async(req,res)=>{
    const {owner, questions} = req.body // owner -> id of user who created quiz & questions->array of question id

    if(!owner || !questions) {
        return res.status(401).json({ success:false, message: "Please fill all fields correctly"})
    }

    try {
        const quiz = await QuizModel.create({owner, questions});
        const user = await UserModel.findById(owner);

        if(user){
            user.quizCreated.push(quiz._id)
            await user.save()
            return res.status(201).json({ success:true, message: "Quiz created successfully"})
        }
        else{
            return res.status(401).json({ success:false, message: "User not found"})
        }
    }
    catch (error) {
        return res.status(501).json({ success:false, message: "Quiz creation failed", error: error.message})
    }
}



export {CreateQuiz, CreateQuestion}