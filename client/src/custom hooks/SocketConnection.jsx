import {useEffect} from 'react'
import io  from 'socket.io-client'
import {useSelector, useDispatch} from 'react-redux'
import { setJoinedQuizQuestions, setQuizError } from '../redux/quizSlice.js'

const SocketConnection = () => {
    const dispatch = useDispatch()
    const {authUser} = useSelector(store=>store.user)
    const {joinedQuizId} = useSelector(store=>store.quiz)

    useEffect(()=>{
        if (authUser && joinedQuizId) {
            console.log("user -> ", authUser, " id -> ", joinedQuizId)

            const socket = io("http://localhost:3000", {
              transports: ['websocket', 'polling'],
            });
      
            socket.emit('joinRoom', { joinedQuizId, authUser });

            socket.on('getQuizQuestions', async (quizQuestionsArray)=>{
                const allQuestions = await quizQuestionsArray.map(({ questionName, option, answer }) => ({
                    questionName,
                    option,
                    answer
                }));
                dispatch(setJoinedQuizQuestions(allQuestions))
                console.log(allQuestions)
            })
            
            socket.on('error',(error)=>{
                dispatch(setQuizError(error))
                console.log(error)
            })

            socket.on('message', (message) => {
              console.log(message);
            });
      
            return () => {
              socket.close();
            };
          }
        }, [authUser, joinedQuizId]);
}

export default SocketConnection
