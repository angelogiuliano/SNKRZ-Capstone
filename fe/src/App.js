import { Main } from "./components/Main/Main";
import { Navbar } from "./components/Navbar/Navbar";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Details } from "./components/Details/Details";
import { SearchedProducts } from "./components/SearchedProducts/SearchedProducts";
import { Login } from "./components/Login/Login";
import { SignUpForm } from "./components/Login/SignUpForm/SignUpForm";
import ProtectedRoutes from "./helpers/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Main />} />
        <Route path="/" element={<ProtectedRoutes />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/products/:name" element={<SearchedProducts />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
