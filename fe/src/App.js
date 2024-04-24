import { Main } from "./components/Main/Main";
import { Navbar } from "./components/Navbar/Navbar";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Details } from "./components/Details/Details";
import { SearchedProducts } from "./components/SearchedProducts/SearchedProducts";
import { Login } from "./components/Login/Login";
import { Favorites } from "./components/Favorites/Favorites";
import { Cart } from "./components/Cart/Cart";
import { CheckoutSuccess } from "./components/CheckoutSuccess/CheckoutSuccess";
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Dashboard } from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/products/:name" element={<SearchedProducts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
