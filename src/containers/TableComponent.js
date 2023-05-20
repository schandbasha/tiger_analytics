import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Modal, Button, Form } from "semantic-ui-react"

const TableComponent = ({
    isOpen,
    handleChange,
    setSelectedProductForEdit,
    productDetails,
    setProductDetails,
    handleTextFields,
    updateProductDetails,
}) => {
    const products = useSelector((state) => state.allProducts.products)

    return (
        <div className="table-section">
            <table className="ui celled fixed single line table">
                <thead>
                    <tr>
                        <th>Store Id</th>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => {
                            const { id, title, price, category } = product
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{title}</td>
                                    <td>{category} </td>
                                    <td>{price} </td>
                                    <td>10/02/2023</td>
                                    <td>
                                        <span
                                            className="icon-class"
                                            onClick={() => {
                                                handleChange(true)
                                                setSelectedProductForEdit(
                                                    product
                                                )
                                                setProductDetails({
                                                    ...product,
                                                    title: product.title,
                                                    price: product.price,
                                                    category: product.category,
                                                })
                                            }}
                                        >
                                            <i className="edit icon" />
                                        </span>
                                        <Link to={`/list/${id}`}>
                                            <span className="icon-class">
                                                <i
                                                    className="eye icon"
                                                    style={{ color: "#424242" }}
                                                />
                                            </span>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr style={{ textAlign: "center" }}>
                            <td colSpan="5">No Matching data found!</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal closeIcon onClose={() => handleChange(false)} open={isOpen}>
                <Modal.Header>Edit details</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            label="SKU"
                            value={productDetails.title}
                            onChange={(e) =>
                                handleTextFields("title", e.target.value)
                            }
                        />
                        <Form.Input
                            label="Product Name"
                            value={productDetails.category}
                            onChange={(e) =>
                                handleTextFields("category", e.target.value)
                            }
                        />
                        <Form.Input
                            label="Price"
                            value={productDetails.price}
                            onChange={(e) =>
                                handleTextFields("price", e.target.value)
                            }
                        />
                        <Button onClick={updateProductDetails}>Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default TableComponent
