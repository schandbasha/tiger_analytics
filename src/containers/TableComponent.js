import React from "react"
import { Link } from "react-router-dom"
import { Modal, Button, Form } from "semantic-ui-react"

const TableComponent = ({
    columns,
    rows,
    isOpen,
    handleChange,
    setSelectedProductForEdit,
    productDetails,
    setProductDetails,
    handleTextFields,
    updateProductDetails,
}) => {
    return (
        <div className="table-section">
            <table className="ui celled fixed single line table">
                <thead>
                    <tr>
                        {columns && columns.map((col) => <th>{col.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((product, index) => {
                            console.log(product["Store Id"], "product")
                            return (
                                <tr key={product["Store Id"]}>
                                    <td>{product["Store Id"]}</td>
                                    <td>{product["SKU"]}</td>
                                    <td>{product["Product Name"]}</td>
                                    <td>{product["Price"]} </td>
                                    <td>{product["Date"]} </td>
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
                                                    ["Product Name"]:
                                                        product["Product Name"],
                                                    ["Price"]: product["Price"],
                                                    ["SKU"]: product["SKU"],
                                                })
                                            }}
                                        >
                                            <i className="edit icon" />
                                        </span>
                                        <Link
                                            to={`/list/${product["Store Id"]}`}
                                        >
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
                            value={productDetails["SKU"]}
                            onChange={(e) =>
                                handleTextFields("SKU", e.target.value)
                            }
                        />
                        <Form.Input
                            label="Product Name"
                            value={productDetails["Product Name"]}
                            onChange={(e) =>
                                handleTextFields("Product Name", e.target.value)
                            }
                        />
                        <Form.Input
                            label="Price"
                            value={productDetails["Price"]}
                            onChange={(e) =>
                                handleTextFields("Price", e.target.value)
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
