import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import * as productApis from "../utilities/apis/product"
import { url } from "../utilities/enumerations/constants"
import DashboardHeader from "../components/DashboardHeader"

const ProductList = () => {
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.user)
  const [products, setProducts] = useState([])
  const titleRef = useRef(null)

  const getStoreName = (categoryId) => {
    switch (categoryId) {
        case 1:
            return "Chase-Up"
        case 2:
            return "Naheed"
        case 3:
            return "Metro"
        case 4:
            return "Keryana"
        case 5:
            return "Dawaai"
        case 6:
            return "Dvago"
        case 7:
            return "Time Medico"
        case 8:
            return "Medical Store"
        default:
            return ""
    }
}

  const handleSearch = () => {
    const where = {}
    if (titleRef.current.value) where.query = titleRef.current.value
    
    const query = new URLSearchParams(where)
    getProducts(query)
  }

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete?")) return

      const response = await productApis.deleteProduct(token, id)
      if (!response.status) throw new Error(response.message)

      setProducts((previous) => {
        const updatedProducts = previous.filter((x) => x.id !== id)
        return [...updatedProducts]
      })
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (!user) navigate("/login")
    
    getProducts()
  }, [])

  const getProducts = async (query = "") => {
    try {
      const response = await productApis.getProducts(token, query.toString())
      if(!response.status) throw new Error ("Products not found")
      setProducts(response.products)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
  <DashboardHeader/>
    <main id="products" className="my-2">
      <div className="container-fluid">
        <div className="d-flex mb-2">
          <h1 className="col-9 fw-bold m-0 gradient-color">Products</h1>
            {user?.role_id === 1 && (<><input ref={titleRef} type="text" className="col-2 form-control-sm ms-2 mb-2" placeholder="Search by name"/> &nbsp; <FaSearch className="mt-2" onClick={handleSearch}/> </>)}
          </div>
      </div>

      <table className="table table-hover shadow-none table-striped" style={{ border: 2 }}>
        <thead style={{ backgroundColor: "#ff3636b3" }}>
          <tr>
            <th scope="col" style={{ width: "10%" }} className="align-middle text-center">
              ID
            </th>
            <th scope="col" style={{ width: "20%" }} className="align-middle">
              Title
            </th>
            <th scope="col" style={{ width: "30%" }} className="align-middle">
              Description
            </th>
            <th scope="col" style={{ width: "10%" }} className="align-middle text-center">
              Price
            </th>
            <th scope="col" style={{ width: "20%" }} className="align-middle text-center">
              Thumbnail
            </th>
            <th scope="col" style={{ width: "10%" }} className="align-middle">
              Category
            </th>
            <th scope="col" style={{ width: "10%" }} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((row, index) => (
            <tr key={row.id.toString()}>
              <td className="align-middle text-center">#P.{index + 1}</td>
              <td className="align-middle">{row.title}</td>
              <td className="align-middle">{row.description}</td>
              <td className="align-middle text-center">{row.price}</td>
              <td className="align-middle text-center cursor-pointer">
                <img onClick={() => window.open(row.thumbnail?.replace("public", url))} src={row.thumbnail?.replace("public", url)} style={{ maxWidth: "100px", maxHeight: "100px" }} />
              </td>
              <td className="align-middle text-center">{getStoreName(row.category)}</td>
              <td className="align-middle text-center">
                <a className="me-2" onClick={() => navigate(`/new_product?id=${row.id}`)}>
                  <i className="far fa-edit"></i>
                </a>
                <a className="text-danger" onClick={() => handleDelete(row.id)}>
                  <i className="far fa-trash-alt"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
    </>
  )
}

export default ProductList
