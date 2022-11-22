import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'

export const Navbar = ({ user }) => {

    const history = useHistory();
    const { totalQty } = useContext(CartContext);

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }

    return (


        <nav className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand text-light fs-4 fw-semibold" to="/">E-Commerce</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-light fs-5 fw-semibold" aria-current="page" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fs-5 fw-semibold" to="/signup">Sign-Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fs-5 fw-semibold" to="/addproducts">Add Product</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link to="/" className='navlink nav-link text-light fs-5 fw-semibold'>{user}</Link>
              </li>
              <li className="nav-item">
              <Link to="/cartproducts" className='navlink nav-link text-light fs-5 fw-semibold'><Icon icon={cart} /></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fs-5 fw-semibold" to="/no-of-products">{totalQty}</Link>
              </li>
              <li className="nav-item">
                <button className='btn btn-outline-light fs-5 fw-semibold' onClick={handleLogout}>Logout</button>
              </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    )
}
