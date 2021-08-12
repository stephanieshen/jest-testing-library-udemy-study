import Col from 'react-bootstrap/Col';

const ToppingOption = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={4}>
      <img
        src={imagePath}
        alt={`${name} topping`}
      />
    </Col>
  );
}

export default ToppingOption;
