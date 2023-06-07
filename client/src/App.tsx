import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import TopBar from "./components/TopBar";

import HouseList from "./components/HouseList";
import AddHouseModal from "./components/AddHouseModal";
import { RootState } from "./dux/rootReducer";
import HouseDetailView from "./components/HouseDetailView";
import { Container, Row, Col } from "react-bootstrap";

const App: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  return (
    <div className="h-screen w-screen bg-dark d-flex flex-column p-1">
      <Router>
        <TopBar />
        <Container fluid className="flex-grow-1 d-flex align-items-center">
          <Row className="flex-grow-1">
            <Col
              xs={5}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={"/public/under_construction.svg"}
                alt="House"
                className="img-fluid"
              />
            </Col>
            <Col className="d-flex flex-column">
              <Routes>
                <Route path="/" element={<HouseList />} />
                <Route path="/houses/:id" element={<HouseDetailView />} />
              </Routes>
            </Col>
          </Row>
        </Container>
        {isOpen && <AddHouseModal />}
      </Router>
    </div>
  );
};

export default App;
