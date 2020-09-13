import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import  { StoreContext } from '~/context/StoreContext'
import Image from 'gatsby-image'

const ProductGrid = () => {
  // const store = useContext(StoreContext)
  // const checkout = store.checkout
  const { store: {checkout} } = useContext(StoreContext)

  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(
          sort: {
            fields: [createdAt]
            order: DESC
          }
        ) {
          edges {
            node {
              id
              title
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              variants {
                price
              }
            }
          }
        }
      }
    `
  )

  const getPrice = price => Intl.NumberFormat(undefined, {
    currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : 0))

  return (
    <div className="grid">
      {allShopifyProduct.edges
        ? allShopifyProduct.edges.map(({ node: { id, handle, title, images: [firstImage], variants: [firstVariant] } }) => (
          <div className="product" key={id} >
            <Link to={`/product/${handle}/`}>
              {firstImage && firstImage.localFile &&
                (<Image
                  className="product-image"
                  fluid={firstImage.localFile.childImageSharp.fluid}
                  alt={handle}
                />)}
            </Link>
            <span className="price-tag">{title}</span>
            <span className="price-tag">{getPrice(firstVariant.price)}</span>
          </div>
        ))
        : <p>No Products found!</p>}
    </div>
  )
}

export default ProductGrid
