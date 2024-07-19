import express from 'express'
import { CreateQuiz, CreateQuestion, EditQuestion, DeleteQuestion, DeleteQuiz } from '../controllers/quizController.js'
import AuthMiddleWare from '../middleware/auth.js'

const QuizRouter = express.Router()

QuizRouter.post('/createQuestion', AuthMiddleWare ,CreateQuestion)
QuizRouter.post('/createQuiz', AuthMiddleWare , CreateQuiz)

QuizRouter.post('/editQuestion', AuthMiddleWare , EditQuestion)

QuizRouter.post('/deleteQuestion', AuthMiddleWare ,DeleteQuestion)
QuizRouter.post('/deleteQuiz', AuthMiddleWare,  DeleteQuiz)

export default QuizRouter