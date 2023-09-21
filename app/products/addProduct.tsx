'use client'

import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

function AddProduct() {
    const [productName, setProductName] = useState("")
    const [qty, setQty] = useState(1)
    const [price, setPrice] = useState("")
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setIsMutating(true)
        await fetch('http://localhost:5000/products', {
            method: 'POST',
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
        setProductName("")
        setQty(1)
        setPrice("")
        router.refresh()
        setModal(false)
    }

    function handleChange() {
        setModal(!modal)
    }

    return (
        <div>

            <button className="btn" onClick={handleChange}>New</button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" name="" value={productName} onChange={(e) => setProductName(e.target.value)} className="input w-full input-bordered" placeholder="Enter Product Name" />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Qty</label>
                            <input type="number" min={1} name="" value={qty} onChange={(e) => setQty(e.target.value)} className="input w-full input-bordered" placeholder="Enter QTY" />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input type="number" name="" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder="Enter Price" />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Close</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Save</button>
                            ) : (
                                <button type="button" className="btn loading">Saving...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default AddProduct
