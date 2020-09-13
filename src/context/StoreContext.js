import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy'
//sees ContextProvider (shopify) wrapped around layout and inherits value prop



//the client sorta like a singleton
const client = Client.buildClient({
  storefrontAccessToken: 'a1e9eaa0c3e77fd120a45809313c8b2f',
  domain: `spinanddestroy.myshopify.com`,
})

//init the store
let initialStoreState = {
  client,
  adding: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
}

const StoreContext = React.createContext(initialStoreState)

// context is ran first!
// import Context from '~/context/StoreContext'

//  domain: `${process.env.SHOP_NAME}.myshopify.com`,
//  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,

const StoreProvider = ({ children }) => {

  let initialStoreState = {
    client,
    adding: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
  }

  //store is client and everything else
  const [store, updateStore] = useState(initialStoreState)

  //init checkout, reactive to store.client.checkout
  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== 'undefined'

      //stores checkoutId in local storage if exists
      const existingCheckoutID = isBrowser
        ? localStorage.getItem('shopify_checkout_id')
        : null

      const setCheckoutInState = checkout => {
        if (isBrowser) {
          localStorage.setItem('shopify_checkout_id', checkout.id)
        }

        //update the state of the store
        updateStore(prevState => {
          return { ...prevState, checkout }
        })
      }

      const createNewCheckout = () => store.client.checkout.create()
      const fetchCheckout = id => store.client.checkout.fetch(id)

      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID)
          // Make sure this cart hasn’t already been purchased.
          if (!checkout.completedAt) {
            setCheckoutInState(checkout)
            return
          }
        } catch (e) {
          localStorage.setItem('shopify_checkout_id', null)
        }
      }

      const newCheckout = await createNewCheckout()
      setCheckoutInState(newCheckout)
    }
    //anytime checkout changes, or items are added it will either fetch latest checkout or update one from storage
    initializeCheckout()
  }, [store.client.checkout]) //end of use effect

  return (
    <StoreContext.Provider
      value={{
        store,
        addVariantToCart: (variantId, quantity) => {
          if (variantId === '' || !quantity) {
            console.error('Both a size and quantity are required.')
            return
          }

          updateStore(prevState => {
            return { ...prevState, adding: true }
          })

          const { checkout, client } = store

          const checkoutId = checkout.id
          const lineItemsToUpdate = [
            { variantId, quantity: parseInt(quantity, 10) },
          ]

          return client.checkout
            .addLineItems(checkoutId, lineItemsToUpdate)
            .then(checkout => {
              updateStore(prevState => {
                return { ...prevState, checkout, adding: false }
              })
            })
        },
        removeLineItem: (client, checkoutID, lineItemID) => {
          return client.checkout
            .removeLineItems(checkoutID, [lineItemID])
            .then(res => {
              updateStore(prevState => {
                return { ...prevState, checkout: res }
              })
            })
        },
        updateLineItem: (client, checkoutID, lineItemID, quantity) => {
          const lineItemsToUpdate = [
            { id: lineItemID, quantity: parseInt(quantity, 10) },
          ]

          return client.checkout
            .updateLineItems(checkoutID, lineItemsToUpdate)
            .then(res => {
              updateStore(prevState => {
                return { ...prevState, checkout: res }
              })
            })
        },
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider }
