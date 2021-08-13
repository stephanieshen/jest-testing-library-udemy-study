import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ScoopOption = ({ name, imagePath, updateCount }) => {

  const handleChange = (e) => {
    updateCount(name, e.target.value);
  }

  return (
    <Col xs={12} sm={6} md={4}>
      <img
        src={imagePath}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Col xs={6}>
          <Form.Label style={{ textAlign: 'right' }}>
            {name}
          </Form.Label>
        </Col>
        <Col xs={5} style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}

export default ScoopOption;
