import React, { useState } from 'react'
import { storage, db } from '../Config/Config'
import { Link } from 'react-router-dom'

export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0)
                        setProductImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }

    return (
        <div className='container'>

            <div className='container-fluid mt-3'>

                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="Product-card col-xl-4">

                        <p className="text-center text-primary fs-3 fw-semibold">
                            Add Products To Your DataBase
                        </p>

                        <form className='form-group' onSubmit={addProduct} autoComplete="off">


                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" onChange={(e) => setProductName(e.target.value)} value={productName}
                                    id="floatingInput" placeholder="productname" required />
                                <label for="floatingInput">Product Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" onChange={(e) => setProductPrice(e.target.value)} value={productPrice}
                                    id="floatingPassword" placeholder="productprice" required />
                                <label for="floatingPassword">Product Price</label>
                            </div>


                            <div class="mb-3">
                                <label for="formFile" class="form-label">Choose Product Image</label>
                                <input class="form-control" onChange={productImgHandler} type="file" id="formFile" required />
                            </div>

                           <center><button className="btn btn-success px-5 text-center mb-4">Add Product</button></center> 

                        </form>

                        {/* alert */}

                        {error && <span className='error-msg'>{error}</span>}

                        <Link to="/"><button className='btn btn-outline-primary form-control mt-5 px-5 mb-4'>back to Home</button></Link>

                    </div>
                    <div className="col-xl-4"></div>
                </div>

            </div>


        </div>
    )
}
