import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import Button from 'react-bootstrap/Button';
import "./Footer.css";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function Footer() {
  return (
    <Container fluid className="footer">
       <Row>
        <Col>
          <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and IOS mobile phone</p>          
          <Image src={playStore} alt="playstore"/>
          <Image src={appStore} alt="Appstore"/>
          </div>
        </Col>
        <Col>
          <div className="midFooter">
          <h1>ECOMMERCE</h1>
          <p>High Quality is our first priority</p>

          <p>Copyrights 2021 &copy; ECOMMERCE</p>
        </div>
        </Col>
        <Col>
        <div className="rightFooter">
        <h4>Follow Us</h4>
        <ButtonGroup aria-label="Basic example">
          <Button variant="light">
            <a href="http://instagram.com">Instagram</a>
          </Button>

          <Button variant="light">
            <a href="http://youtube.com">Youtube</a>
          </Button>

          <Button variant="light">
          <a href="http://instagram.com">Facebook</a>
          </Button>  
        </ButtonGroup>
            
        
        
      </div>
        </Col>
      </Row>
      </Container>
    
  );
}

export default Footer;