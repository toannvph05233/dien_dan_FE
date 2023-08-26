import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";

const EditProduct = () => {
    const data = useSelector((state) => state.data);

    return (
        <div className="container">
            <h2>Edit khách hàng</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th><input value={data.id}/></th>
                </tr>
                <tr>
                    <th>name</th>
                    <th><input value={data.name}/></th>
                </tr>
                <tr>
                    <th>price</th>
                    <th><input value={data.price}/></th>
                </tr>
                <tr>
                    <th>img</th>
                    <th><input value={data.img}/></th>
                </tr>

                <button>Edit</button>

                </thead>
            </table>
        </div>
    )
}

export default EditProduct;
