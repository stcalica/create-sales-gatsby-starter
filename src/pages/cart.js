import React from 'react'
import SecondaryLayout from '~/layouts/SecondaryLayout'
import Cart from '~/components/Cart'

const CartPage = () => (
  <SecondaryLayout>
    <div className="cart-wrapper" style={{paddingTop: '64px'}}>
      <h1>Cart</h1>
      <Cart />
    </div>
  </SecondaryLayout>
)

export default CartPage
