import "./App.css";
import { MoviePage } from "./components/MoviePage/MoviePage";
import { Book } from "./components/BookPage/Book";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import { Terms } from "./components/Seat/Terms";
import { Selectseat } from "./components/Seat/Selectseat";
import { Slotbooking } from "./components/Slotbooking.jsx/Slotbooking";
import { Seating } from "./components/SeatBook/Seating";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Summary from "./components/Summary/Summary";
import Navbar from "./components/navbar/Navbar";
import Menubar from "./components/menubar/Menubar";
import Footer from "./components/footer/Footer";
import Login from "./components/Login/Login";

// Firebase initialization
const firebaseConfig = {
  // Your Firebase config here
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/moviepage">
          <MoviePage />
        </Route>
        <Route path="/movie/:id">
          <Book />
        </Route>
        <Route path="/book">
          <Book />
        </Route>
        <Route path="/terms">
          <Terms /> <Selectseat />
        </Route>
        <Route path="/slot/:id/:bookingId">
          <Slotbooking />
        </Route>
        <Route path="/seating/:id">
          <Seating />
        </Route>
        <Route path="/summary/:id">
          <Summary />
        </Route>
      </Switch>
    </div>
  );
}

export default App;