import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import Image from 'gatsby-image'
import SecondaryLayout from '~/layouts/SecondaryLayout'
import { Row, Col, Carousel } from 'antd'
import '../../css/main.css'
import 'antd/dist/antd.css';

import ProductCarousel from '~/components/ProductCarousel'

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <>
      <SecondaryLayout>
        <SEO title={product.title} description={product.description} />
        <div className="container" style={{ paddingTop:'64px'}}>
          <div className="row">
              <div className="product-image-container col-lg-6 col-md-6 col-xs-12 col-sm-12">
                <ProductCarousel images={product}/>
              </div>
              <div className="product-info col-md-6 col-lg-6 col-xs-12 col-sm-12">
                <div className="product-description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
                  <ProductForm product={product} />
                </div>
              </div>
          </div>
      </SecondaryLayout>
    </>
  )
}


// <>
//   <SecondaryLayout>
//     <SEO title={product.title} description={product.description} />
//     <div className="container" style={{ paddingTop:'64px'}}>
//       <div className="row">
//           <div className="col">
//           <div className="product-image-container">
//             <ProductCarousel images={product}/>
//           </div>
//         </div>
//       <div className="col">
//           <div className="product-info">
//             <div className="product-description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
//               <ProductForm product={product} />
//             </div>
//             </div>
//         </div>
//       </div>
//   </SecondaryLayout>
// </>


export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductPage
