import express from 'express'
import { CreateQuiz, CreateQuestion, EditQuestion, DeleteQuestion, DeleteQuiz, DisplayQuizList } from '../controllers/quizController.js'
import AuthMiddleWare from '../middleware/auth.js'

const QuizRouter = express.Router()

QuizRouter.post('/createQuestion', CreateQuestion)
QuizRouter.post('/createQuiz', CreateQuiz)

QuizRouter.post('/editQuestion', EditQuestion)

QuizRouter.post('/deleteQuestion', DeleteQuestion)
QuizRouter.post('/deleteQuiz', DeleteQuiz)

QuizRouter.post('/displayQuizList', DisplayQuizList)

export default QuizRouter