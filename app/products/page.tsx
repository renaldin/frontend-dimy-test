import AddProduct from "./addProduct"
import DeleteProduct from "./deleteProduct"
import UpdateProduct from "./updateProduct"


type Product = {
    id: number,
    productName: string,
    qty: number,
    price: number
}

async function getProducts() {
    const res = await fetch('http://localhost:5000/products', { cache: 'no-store' })
    return res.json()
}

async function ProductList() {
    const products: Product[] = await getProducts()
    const countProduct = products.length > 1;

    return (
        <div className="py-10 px-10">
            <div className="py-2">
                <AddProduct />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.productName}</td>
                            <td>{product.qty}</td>
                            <td>{product.price}</td>
                            <td>{product.price * product.qty}</td>
                            <td className="flex">
                                <UpdateProduct {...product} />
                                {countProduct && (
                                    <DeleteProduct {...product} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList
