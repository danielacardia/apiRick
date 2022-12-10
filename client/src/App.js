import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DetailCharacter from "./components/DetailCharacter";
import Login from "./components/Login";
import NavBarApp from "./components/NavBarApp";
import User from "./components/User";
import SignUp from "./components/SignUp";
import ProtectedRout from "./components/ProtectedRout";

function App() {
  return (
    <HashRouter>
      <NavBarApp />

      <Routes>
        <Route element={<ProtectedRout />}>
          <Route path="/:id" element={<User />} />
          <Route path="/user/:id" element={<DetailCharacter />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route />
      </Routes>
    </HashRouter>
  );
}

export default App;
