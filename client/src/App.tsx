
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import TopBar from './components/TopBar'

import HouseList from './pages/HouseList'
import AddHouseModal from './components/AddHouseModal'
import { RootState } from './dux/rootReducer'
import HouseDetailView from './pages/HouseDetailView';


const App: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  return (
    <Router>
    <div className='d-flex flex-column min-vh-100'>
      <TopBar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HouseList />} />
          <Route path="/houses/:id" element={<HouseDetailView />} />
        </Routes>
      </div>
      {isOpen && <AddHouseModal />}
    </div>
  </Router>

  )
}

export default App
