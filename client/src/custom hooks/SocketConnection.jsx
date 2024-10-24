import {useEffect} from 'react'
import io  from 'socket.io-client'
import {useSelector, useDispatch} from 'react-redux'
import { setJoinedQuizQuestions, setQuizError } from '../redux/quizSlice.js'

export const socket = io("https://quiz-app-du7w.onrender.com", {
  transports: ['websocket'],
});

const SocketConnection = () => {
    const dispatch = useDispatch()
    const {authUser} = useSelector(store=>store.user)
    const {joinedQuizId} = useSelector(store=>store.quiz)

    useEffect(()=>{
        if (authUser && joinedQuizId) {
      
            socket.emit('joinRoom', { joinedQuizId, authUser });

            socket.on('getQuizQuestions', async (quizQuestionsArray)=>{
                const allQuestions = await quizQuestionsArray.map(({ questionName, option, answer }) => ({
                    questionName,
                    option,
                    answer
                }));
                dispatch(setJoinedQuizQuestions(allQuestions))
            })
            
            socket.on('error',(error)=>{
                dispatch(setQuizError(error))
                console.log(error)
            })
      
            return () => {
              socket.off('getQuizQuestions');
              socket.off('error')
              socket.off('joinRoom')
            };
          }
        }, [authUser, joinedQuizId]);
}

export default SocketConnection
