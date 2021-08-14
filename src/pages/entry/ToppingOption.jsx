import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const ToppingOption = ({ name, imagePath, updateCount }) => {

  return (
    <Col xs={12} sm={6} md={4}>
      <img
        src={imagePath}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-topping-checkbox`}
      >
        <Form.Check
          type="checkbox"
          onChange={(e) => {
            updateCount(name, (e.target.checked ? 1: 0))
          }}
          label={name}
        />
      </Form.Group>
    </Col>
  );
}

export default ToppingOption;
