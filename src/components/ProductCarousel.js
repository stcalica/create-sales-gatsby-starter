import React,{ useState } from 'react'
import Image from 'gatsby-image'

const optionStyles = {
  dislplay:'flex',
  flexDirection:'column',
}

const selectStyles = {

}

const optionImagesStyle = {
  width:'150px',
  height:'150px',
  margin:'5px'
}

const selectImagesStyle = {
  width:'600px',
  height:'600px',
}

const carouselContainer = {
  width:"100%",
  height:"100%",
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-around"
}

const ProductCarousel = (props) => {
  let [image, setImage] = useState(0)
  console.log(props)
  return(
      <>
      <div className="carouselContainer">
        <div id="pc-options" className="optionStyles">
        {props.images.images.map((image, index) => (
          <div className="pc-options-images" onClick={()=>{setImage(index)}}>
                <Image
                    key={index}
                    fluid={image.localFile.childImageSharp.fluid}
                    style={optionImagesStyle}
                  />
            </div>
        ))}
        </div>
        <div id="pc-select" className="selectStyles">
          {
            <Image
              fluid={props.images.images[image].localFile.childImageSharp.fluid}
              className="selectImagesStyle"
              />
          }
        </div>
      </div>
      </>
  )
}

export default ProductCarousel
