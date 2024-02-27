import OrderCountValue from "../components/OrderCountValue"
import HighestSellingProduct from "../components/HighestSellingProduct"
import DashboardHeader from "../components/DashboardHeader"

const ReportOrders = () => {
  return (
    <>
      <DashboardHeader/>
      <main id="orders" className="my-2 text-dark">
        <div className="container-fluid">
          <HighestSellingProduct/>
          <OrderCountValue />
        </div>
      </main>
    </>
  )
}

export default ReportOrders
