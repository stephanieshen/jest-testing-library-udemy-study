import Col from 'react-bootstrap/Col';

const ScoopOption = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={4}>
      <img
        src={imagePath}
        alt={`${name} scoop`}
      />
    </Col>
  )
}

export default ScoopOption;
