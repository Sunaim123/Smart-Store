import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import store, { persistor } from "./store"
import ScrollToTop from "./components/ScrollToTop"
import "./assets/css/global-style.css"
import "./assets/css/style.css"
import Footer from "./components/footer.jsx"
import Home from "./pages/Home"
import Cart from "./pages/Cart.jsx"
import Campaign from "./pages/Campaign.jsx"
import SingleProduct from "./pages/SingleProduct.jsx"
import NewProduct from "./pages/NewProduct.jsx"
import ProductList from "./pages/ProductList.jsx"
import Products from "./pages/Products"
import About from "./pages/About"
import Privacy from "./pages/Privacy"
import Contact from "./pages/Contact"
import TermsCondition from "./pages/TermsCondition"
import Faq from "./pages/Faq"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import Checkout from "./pages/Checkout.jsx"
import Feedback from "./pages/Feedback.jsx"
import Return from "./pages/Return.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Feedbacks from "./pages/Feedbacks"
import Returns from "./pages/Returns.jsx"
import Orders from "./pages/Orders.jsx"
import ReportProducts from "./pages/ReportProducts.jsx"
import ReportOrders from "./pages/ReportOrders.jsx"
import RecommendedProducts from "./pages/RecommendedProducts.jsx"
import Profile from "./pages/Profile.jsx"
import Users from "./pages/Users.jsx"
import Order from "./pages/Order.jsx"

function App() {
  return (
    <>
  <StoreProvider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product_list" element={<ProductList />} />
            <Route path="/new_product" element={<NewProduct />} />
            <Route path="/recommended_product" element={<RecommendedProducts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/product" element={<SingleProduct />} />
            <Route path="/report/product/by" element={<ReportProducts/>} />
            <Route path="/report/order" element={<ReportOrders/>} />
            <Route path="/campaign" element={<Campaign/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/termscondition" element={<TermsCondition/>}/>
            <Route path="/faq" element={<Faq/>}/>
            <Route path="/feedback" element={<Feedback/>}/>
            <Route path="/feedbacks" element={<Feedbacks/>}/>
            <Route path="/return" element={<Return/>}/>
            <Route path="/returns" element={<Returns/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>



          </Routes>
        </ScrollToTop>
        <Footer />
      </Router>
    </PersistGate>
  </StoreProvider>
    </>
  )
}

export default App
