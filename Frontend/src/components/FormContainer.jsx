import { Container, Col, Row} from "react-bootstrap"

const FormContainer = ({children }) => {
  return (
	<Container>
		<Row className="justify-content-md-center mt-5">
			<Col className="card p-5" md={6} xs={12}>
			{children}
			</Col>
		</Row>
	</Container>
  )
}

export default FormContainer