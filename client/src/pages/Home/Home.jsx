import BodySection from '../../components/SampleBody/samplebody'
import AppDownload from '../../components/App/App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  return (
    <div>     
      <BodySection/>
      <AppDownload/> 
      <ToastContainer />
    </div>
  )
}

export default Home
