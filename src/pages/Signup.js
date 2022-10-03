import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TextInput({ type, label }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="input-container">
      <input type={type} value={value} onChange={handleChange} />
      <label className={value && 'filled'}>
        {label}
      </label>
    </div>
  );
}

const Signup = () => {
  const logo = "logo.png"
  return (
    <Container id="login">
      <Col>
        <img className="image" src={logo}/>
        <form>
          <Row>
            <TextInput type="text" label="Email"/>
          </Row>
          <Row>
            <TextInput type="password" label="Password"/>
          </Row>
          <Row>
            <TextInput type="password" label="Confirm Password"/>
          </Row>
          <br></br>
          <Link to="/">
            <input type="submit" value="SIGN UP" className="button"/>
          </Link>
        </form>
    
      </Col>
    </Container>
  );
}
  
export default Signup;

