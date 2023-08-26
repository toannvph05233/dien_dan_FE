import React, {useState, useEffect} from 'react';
import ProductCRUD from "./ProductCRUD";

const CreateProduct = () => {
    return (
        <div className="container">
            <h2>Khởi tạo khách hàng</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th><input/></th>
                </tr>
                <tr>
                    <th>name</th>
                    <th><input/></th>
                </tr>
                <tr>
                    <th>price</th>
                    <th><input/></th>
                </tr>
                <tr>
                    <th>img</th>
                    <th><input/></th>
                </tr>

               <button>Create</button>

                </thead>
            </table>
        </div>
    )
}

export default CreateProduct;
