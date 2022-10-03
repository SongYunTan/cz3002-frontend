import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
  const logo = "logo.png"
  return (
    <Container id="login">
      <Col>
        <img className="image" src={logo}/>
        <form>
          <Row>
            <label>
              Email:
              <input type="text" name="email" />
            </label>
          </Row>
          <Row>
            <label>
              Password:
              <input type="text" name="password" />
            </label>
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

