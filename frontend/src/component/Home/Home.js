import React from 'react';
import Banner from '../layout/Banner/Banner.js'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FeatureProducts from './FeatureProducts'



const Home=()=>
{
return (
    
  <React.Fragment>
      <Banner />
      <FeatureProducts />      
  </React.Fragment>
      
) 
}

export default Home;
