import {BrowserRouter , Routes , Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import AddEditItems from "./pages/AddEditItems";
import Navbar from "./components/Navbar";
// import Test from "./test"

function App() {
  return (
    // <Test />
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEditItems />} />
          <Route path="/update/:id" element={<AddEditItems />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
