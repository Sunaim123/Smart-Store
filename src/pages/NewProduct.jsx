import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as productApis from "../utilities/apis/product"
import { url } from "../utilities/enumerations/constants"

const NewProduct = () => {
  const navigate = useNavigate()
  const { user, token } = useSelector(state => state.user)
  const thumbnailRef = useRef(null)
  const thumbnailFileRef = useRef(null)
  const thumbnail64Ref = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const priceRef = useRef(null)
  const nicheRef = useRef(null)
  const params = new URLSearchParams(window.location.search)

  const setImage = (base64) => {
    thumbnailRef.current.src = base64
    thumbnail64Ref.current.value = base64
  }

  const handleChange = async (e) => {
    try {
      if (e.target.files && e.target.files[0]) {
        if (e.target.files[0].size > 1024000) throw new Error("Image size must be maximum of 1MB")
        if (!["image/jpeg", "image/jpg", "image/png"].includes(e.target.files[0].type)) throw new Error("image must be in format of .jpg, .jpeg or .png")

        const reader = new FileReader()
        const type = e.target.id

        reader.addEventListener("load", function (e) {
          setImage(type, e.target.result)
        })

        reader.readAsDataURL(e.target.files[0])
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const handleClear = () => {
        thumbnailRef.current.src = "/upload.png"
        thumbnailFileRef.current.value = ""
        thumbnail64Ref.current.value = ""
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const form = new FormData()
      form.append("title",titleRef.current.value)
      form.append("description",descriptionRef.current.value)
      form.append("price",priceRef.current.value)
      form.append("niche", nicheRef.current.value)
      form.append("thumbnail",e.target.thumbnail.files[0])

      if (!params.has("id")) {
        const response = await productApis.createProduct(token, form)
        if (!response.status) throw new Error(response.message)
        
        titleRef.current.value = ""
        descriptionRef.current.value = ""
        priceRef.current.value = ""
        handleClear("thumbnail")
    } else {
        form.append("id", parseInt(params.get("id")))
        const response = await productApis.updateProduct(token, form)
        if (!response.status) throw new Error(response.message)
      }

      alert("Product saved")
      navigate("/product_list")
    } catch (error) {
      alert(error.message)
    }
  }

  const niches = [
    {name: "grocery"},
    {name: "medicine"}
  ]

  const getProduct = async () => {
    try {
      const response = await productApis.getProduct(token, params.get("id"))
      if (!response.status) throw new Error(response.message)

      titleRef.current.value = response.product.title
      descriptionRef.current.value = response.product.description
      priceRef.current.value = response.product.price
      thumbnailRef.current.src = response.product.thumbnail?.replace("public", url) || "./upload.png"

    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (!user) navigate("/login")

    if (params.has("id"))
      getProduct()
  }, [])

  return (

    <>
    <main id="product" className="my-4">
      <div className="container">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="card" style={{ backgroundColor: "#ff3636b3", minHeight: "30rem", gap: "2rem" }}>
            <div className="card-header border-bottom-0 text-center" style={{ backgroundColor: "#ff3636b3" }}>
              <h3 className="fw-bold m-0 text-white">Product</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 col-lg-3 mb-3">
                  <div className="card position-relative">
                    <a className="reset text-dark" onClick={() => handleClear("thumbnail")}>
                      <i className="fas fa-times"></i>
                    </a>
                    <div className="card-body p-0">
                      <input ref={thumbnail64Ref} type="hidden" />
                      <input ref={thumbnailFileRef} type="file" id="thumbnail" className="form-control d-none" accept=".jpg, .jpeg, .png" onChange={handleChange} />
                      <img
                        ref={thumbnailRef}
                        src="/upload.png"
                        className="rounded img-fluid"
                        onClick={() => thumbnailFileRef.current.click()}
                        alt="Product Thumbnail"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-8 col-lg-9">
                  <div className="form-floating mb-3">
                    <input ref={titleRef} type="text" className="form-control" id="title" placeholder="Title" required />
                    <label htmlFor="title">Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input ref={descriptionRef} type="text" className="form-control" id="description" placeholder="Description" required />
                    <label htmlFor="description">Description</label>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-floating mb-3">
                        <input ref={priceRef} type="number" className="form-control" id="price" placeholder="Price" required />
                        <label htmlFor="price">Price</label>
                      </div>
                      <div className="form-floating mb-3">
                        <select ref={nicheRef} className="form-select" id="niche" required>
                          {niches.map((niche) => (
                            <option key={niche.name} value={niche.name}>{niche.name}</option>
                          ))}
                        </select>
                        <label htmlFor="niche">Niche</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary" style={{ width: '100%', maxWidth: '270px', marginTop:20 }}>
                Save
              </button>
            </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  </>
  
  )
}

export default NewProduct