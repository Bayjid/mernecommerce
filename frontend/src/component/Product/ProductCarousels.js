import Carousel from 'react-bootstrap/Carousel';
import product from "../../images/product.jpg";

function ProductCarousels({productImages}) {
  return (
    <Carousel>


            {productImages &&
              productImages.map((productImage) => (

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={productImage.url}
                    alt="First slide"
                  />        
                </Carousel.Item>

            ))}      
            
    </Carousel>
  );
}

export default ProductCarousels;