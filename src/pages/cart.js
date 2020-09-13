import React from 'react'
import MainLayout from '~/layouts/MainLayout'
import Cart from '~/components/Cart'

const CartPage = () => (
  <MainLayout>
    <div className="cart-wrapper" style={{paddingTop: '64px'}}>
      <h1>Cart</h1>
      <Cart />
    </div>
  </MainLayout>
)

export default CartPage
