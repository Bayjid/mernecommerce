import Carousel from 'react-bootstrap/Carousel';
import Banner2 from "../../../images/Banner2.jpg";


function Banner() {
  return (
    <div style={{ paddingTop: "70px" }}>

    <Carousel>

      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={Banner2}
          alt="First slide"
        />        
      </Carousel.Item>

      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src={Banner2}
          alt="Second slide"
        />        
      </Carousel.Item>

      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src={Banner2}
          alt="Third slide"
        />        
      </Carousel.Item>

    </Carousel>

    </div>

    
  );
}

export default Banner;