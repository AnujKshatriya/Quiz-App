import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionName : String,
    option: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length === 4;
            },
            message: props => `Options array must have exactly 4 values!`
        }
    },
    answer : String
})

const QuestionModel = mongoose.model("question", questionSchema)

export default QuestionModel