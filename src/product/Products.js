import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setProducts([
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                img: "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
            },
            {
                id: 2,
                name: 'Product 1',
                price: 15,
                img: "https://vapa.vn/wp-content/uploads/2022/12/anh-con-nguoi-dep-006.jpg"
            },
        ]);
    }, []);


    const handleEditProduct = (product) => {
        dispatch({ type: 'SET_DATA', payload: product });
        navigate('/edit');
    };

    return (
        <div className="container">
            <h2>Danh sách khách hàng</h2>
            <Link to={'create'}>
                <button>Create</button>
            </Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>price</th>
                    <th>img</th>
                    <th>edit</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                {products.map(p => (
                    <tr>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td><img src={p.img} width='250' height='200'/></td>
                        <td>
                                <button type="button" onClick={() => handleEditProduct(p)} className="btn btn-warning">Edit</button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                ))
                }

                </tbody>
            </table>
        </div>
    )
}

export default Products;
