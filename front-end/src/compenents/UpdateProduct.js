import React, { useEffect, useState } from "react";
import {useParams,useNavigate} from "react-router-dom"


const UpdateProduct = ()=>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [error,setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetail();
    },[])
    const getProductDetail = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCompany(result.company);
        setCategory(result.category);
    }


    const updateProduct = async ()=>{
        //console.log(name,price,category,company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':"application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        navigate("/");
       
    }

    

    return(
        <div className="product">
            <h1>Update Product</h1>
            <input className="inputBox" type="text" placeholder="Enter product name" value={name}
                onChange={(e)=>{
                    setName(e.target.value);
                }}
            />
            
            <input className="inputBox" type="text" placeholder="Enter product price" value={price}
            onChange={(e)=>{
                setPrice(e.target.value);
            }}
            />
            
            <input className="inputBox" type="text" placeholder="Enter product category" value={category}
            onChange={(e)=>{
                setCategory(e.target.value);
            }}
            />
           
            <input className="inputBox" type="text" placeholder="Enter product company" value={company}
            onChange={(e)=>{
                setCompany(e.target.value);
            }}
            />
           
            <button onClick={updateProduct} className="btn">UPDATE PRODUCT</button>
        </div>
    )
}
export default UpdateProduct;