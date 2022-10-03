import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Navbar = () => {
	const logo = "logo.png"
  return (
    <Container id="navbar">
      <Col>
        <img className="image" src={logo}/>
        
				<Row>
					<Link to="/dashboard">
						<i className="icon-up-open"></i>
						Home
					</Link>
				</Row>
				<Row>
				<Link to="/group">
					<i className="icon-up-open"></i>
					Friday Night Gang
				</Link>
				</Row>
				<Row>
				<Link to="/create-group">
					<i className="icon-up-open"></i>
					Create Group
				</Link>
				</Row>
				<Row>
				<Link to="/add-review">
					<i className="icon-up-open"></i>
					Add Review
				</Link>
				</Row>
       
      </Col>
    </Container>
  );
}

export default Navbar;