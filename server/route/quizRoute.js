import express from 'express'
import { CreateQuiz, CreateQuestion } from '../controllers/quizController.js'

const QuizRouter = express.Router()

QuizRouter.post('/createQuestion',CreateQuestion)
QuizRouter.post('/createQuiz',CreateQuiz)

export default QuizRouter