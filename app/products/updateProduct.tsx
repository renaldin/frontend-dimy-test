'use client'

import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

type Product = {
    id: number,
    productName: string,
    qty: number,
    price: number
}

function UpdateProduct(product: Product) {
    const [productName, setProductName] = useState(product.productName)
    const [qty, setQty] = useState(product.qty)
    const [price, setPrice] = useState(product.price)
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault()
        setIsMutating(true)
        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName: productName,
                qty: qty,
                price: price
            })
        })
        setIsMutating(false)
        router.refresh()
        setModal(false)
    }

    function handleChange() {
        setModal(!modal)
    }

    return (
        <div>

            <button className="btn btn-info btn-sm mr-2" onClick={handleChange}>Edit</button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Product {product.productName}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" name="" value={productName} onChange={(e) => setProductName(e.target.value)} className="input w-full input-bordered" placeholder="Enter Product Name" />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">QTY</label>
                            <input type="number" min={1} name="" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="input w-full input-bordered" placeholder="Enter QTY" />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input type="number" name="" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input w-full input-bordered" placeholder="Enter Price" />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Close</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Update</button>
                            ) : (
                                <button type="button" className="btn loading">Updating...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default UpdateProduct
