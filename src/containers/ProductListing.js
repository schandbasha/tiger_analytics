import React, { useState } from "react"
import TableComponent from "./TableComponent"

const ProductPage = ({ columns, rows, setRows, originalData }) => {
    const [searchText, setSearchText] = useState("")
    const [isEditModalShown, setIsEditModalShown] = useState(false)
    const [selectedProductForEdit, setSelectedProductForEdit] = useState({})
    const [productDetails, setProductDetails] = useState({})

    const handleTextFields = (key, value) => {
        setProductDetails({ ...productDetails, [key]: value })
    }

    const updateProductDetails = () => {
        rows.map((item) => {
            if (item["Store Id"] === productDetails["Store Id"]) {
                item["SKU"] = productDetails["SKU"]
                item["Price"] = productDetails["Price"]
                item["Product Name"] = productDetails["Product Name"]
            }
            return item
        })
        setIsEditModalShown(false)
    }

    const handleSearch = (text) => {
        setSearchText(text)
        if (text !== "") {
            const filteredData = rows.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(text.toLowerCase())
            })
            setRows(filteredData)
        } else {
            setRows(originalData)
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
                    columns={columns}
                    rows={rows}
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
