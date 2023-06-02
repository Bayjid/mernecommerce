
import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import product from "../../images/product.jpg";


const ProductCard = ({product}) => {
 
  return (
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/product/${product._id}`}>
      <Card className="col-lg-6 mb-4" style={{ width: '18rem' }}>
      <Card.Img variant="top" src= {product.images[0].url} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>        
      </Card.Body>
      </Card>      
    </Link>
  );
};

export default ProductCard;