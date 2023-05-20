import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectedProduct } from "../redux/actions/productsActions"

const ProductDetails = () => {
    const { productId } = useParams()
    let product = useSelector((state) => state.product)
    const { image, title, price, category, description } = product
    const dispatch = useDispatch()

    const fetchProductDetail = async (id) => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        dispatch(selectedProduct(data))
    }

    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail(productId)
    }, [productId])

    return (
        <div className="ui grid container">
            {Object.keys(product).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="ui vertical divider">AND</div>
                        <div className="middle aligned row">
                            <div className="column lp">
                                <img
                                    className="ui fluid image"
                                    src={image}
                                    alt={title}
                                />
                            </div>
                            <div className="column rp">
                                <h1>{title}</h1>
                                <h2>
                                    <a className="ui teal tag label">
                                        ${price}
                                    </a>
                                </h2>
                                <h3 className="ui brown block header">
                                    {category}
                                </h3>
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails
