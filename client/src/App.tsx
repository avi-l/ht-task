
import { useSelector } from 'react-redux'
import './App.css'
import TopBar from './components/TopBar'

import HouseList from './pages/HouseList'
import AddHouseModal from './components/AddHouseModal'
import { RootState } from './dux/rootReducer'


const App: React.FC = () =>{
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

console.log('is open', isOpen)
  return (
    <>
    <TopBar/>
    <HouseList />
    {isOpen && <AddHouseModal />}

    </>
  )
}

export default App
