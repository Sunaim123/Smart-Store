import Product from "../components/Products"
import ProductBy from "../components/ProductBy"
import DashboardHeader from "../components/DashboardHeader"

const ReportProducts = () => {
  return (
    <>
    <DashboardHeader/>
      <main id="products" className="my-2 text-dark">
        <div className="container-fluid">
          <ProductBy />
        </div>
      </main>
      </>
  )
}

export default ReportProducts
