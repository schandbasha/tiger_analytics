import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../redux/actions/productsActions"
import TableComponent from "./TableComponent"

const ProductPage = () => {
    const products = useSelector((state) => state.allProducts.products)
    const dispatch = useDispatch()

    const [searchText, setSearchText] = useState("")
    const [originalProducts, setOriginalProducts] = useState([])
    const [isEditModalShown, setIsEditModalShown] = useState(false)
    const [selectedProductForEdit, setSelectedProductForEdit] = useState({})
    const [productDetails, setProductDetails] = useState({})

    const fetchProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json()
        dispatch(setProducts(data))
        setOriginalProducts(data)
    }

    const handleTextFields = (key, value) => {
        setProductDetails({ ...productDetails, [key]: value })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const updateProductDetails = () => {
        products.map((item) => {
            if (item.id === productDetails.id) {
                item.price = productDetails.price
                item.title = productDetails.title
                item.category = productDetails.category
            }
            return item
        })
        setIsEditModalShown(false)
    }

    const handleSearch = (text) => {
        setSearchText(text)
        if (text !== "") {
            const filteredData = products.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(text.toLowerCase())
            })
            dispatch(setProducts(filteredData))
        } else {
            dispatch(setProducts(originalProducts))
        }
    }

    return (
        <div className="ui grid container">
            <>
                <div class="ui right aligned category search">
                    <div className="ui icon input">
                        <input
                            className="prompt"
                            type="text"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <i className="search icon"></i>
                    </div>
                    <div className="results"></div>
                </div>
                <TableComponent
                    isOpen={isEditModalShown}
                    handleChange={setIsEditModalShown}
                    selectedProductForEdit={selectedProductForEdit}
                    setSelectedProductForEdit={setSelectedProductForEdit}
                    productDetails={productDetails}
                    setProductDetails={setProductDetails}
                    handleTextFields={handleTextFields}
                    updateProductDetails={updateProductDetails}
                />
            </>
        </div>
    )
}

export default ProductPage
