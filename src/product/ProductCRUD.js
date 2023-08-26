import React, { useState, useEffect } from 'react';

const ProductCRUD = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });
    const [editProduct, setEditProduct] = useState(null);

    // Mock data for initial products
    useEffect(() => {
        setProducts([
            { id: 1, name: 'Product 1', price: 10 },
            { id: 2, name: 'Product 2', price: 20 },
            { id: 3, name: 'Product 3', price: 30 },
        ]);
    }, []);

    // Handle input changes for creating/editing product
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Add new product to the list
    const handleAddProduct = () => {
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setNewProduct({ name: '', price: '' });
    };

    // Edit existing product
    const handleEditProduct = (product) => {
        setEditProduct(product);
        setNewProduct(product);
    };

    // Update existing product
    const handleUpdateProduct = () => {
        setProducts(products.map((product) => (product.id === newProduct.id ? newProduct : product)));
        setEditProduct(null);
        setNewProduct({ name: '', price: '' });
    };

    // Delete product from the list
    const handleDeleteProduct = (productId) => {
        setProducts(products.filter((product) => product.id !== productId));
    };

    return (
        <div>
            <h1>Product CRUD</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{editProduct && editProduct.id === product.id ? <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} /> : product.name}</td>
                        <td>{editProduct && editProduct.id === product.id ? <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} /> : product.price}</td>
                        <td>
                            {editProduct && editProduct.id === product.id ? (
                                <>
                                    <button onClick={handleUpdateProduct}>Save</button>
                                    <button onClick={() => setEditProduct(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
            {editProduct === null && (
                <>
                    <input type="text" name="name" placeholder="Product name" value={newProduct.name} onChange={handleInputChange} />
                    <input type="text" name="price" placeholder="Product price" value={newProduct.price} onChange={handleInputChange} />
                    <button onClick={handleAddProduct}>Add Product</button>
                </>
            )}
        </div>
    );
};

export default ProductCRUD;
