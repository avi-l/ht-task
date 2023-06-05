
import { useSelector } from 'react-redux'
import './App.css'
import TopBar from './components/TopBar'

import HouseList from './pages/HouseList'
import AddHouseModal from './components/AddHouseModal'
import { RootState } from './dux/rootReducer'
import { Container } from 'react-bootstrap'


const App: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  console.log('is open', isOpen)
  return (
    <div className='bg-dark'>
      <Container fluid className="min-vh-100">
        <TopBar />
        <HouseList />
        {isOpen && <AddHouseModal />}
      </Container>
    </div>

  )
}

export default App
