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

const Login = () => {
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
          <br></br>
          <input type="submit" value="LOG IN" className="button"/>
        </form>
    
        <p className="signup-link">
          New to Tindflix? 
          <Link to="/signup">Sign Up</Link>
        </p>
      </Col>
    </Container>
  );
}
  
export default Login;

