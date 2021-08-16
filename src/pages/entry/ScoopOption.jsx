import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ScoopOption = ({ name, imagePath, updateCount }) => {

  return (
    <Col xs={12} sm={6} md={4}>
      <div
        style={{
          width: '10em',
          height: '10em',
      }}>
        <img
          src={imagePath}
          alt={`${name} scoop`}
          style={{
            borderRadius: '100%',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
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
            onChange={(e) => {
              updateCount(name, e.target.value);
            }}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}

export default ScoopOption;
