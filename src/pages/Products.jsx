import { Container } from 'react-bootstrap'
import { useSelector } from "react-redux"
import CompareProduct from '../components/CompareProduct'
import Header from "../components/Navbar.jsx"
import DashboardHeader from "../components/DashboardHeader.jsx"


function Products() {
  const { user } = useSelector((state) => state.user)

  return (
    <>
    {user? <DashboardHeader/> : <Header/>}
        <section className='compare-with-section'>
            <Container fluid="lg">
                <div className='text-center'>
                    <h2 className='head-h2 gradient-color fw-bold mb-5'>Products</h2>
                </div>
        <CompareProduct />
        </Container>
        </section>
    </>
  )
}

export default Products
