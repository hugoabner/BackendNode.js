import {  Card, Container, Nav } from "react-bootstrap"
import { Button } from "react-bootstrap"
const Hero = () => {
  return (
	<div className="py-5">
		<Container className="d-flex justify-content-center">
			<Card className="p-5 d-flex flex-column 
			align-items-center hero-card bg-light w-75">
				<h1 className="text-center mb-4">Mern Authentication</h1>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing 
				a! Quis, asperiores totam sit enim sapiente sint?</p>
				<div className="d-flex">
					<Nav.Link href="/login">
						<Button variant="primary"  className="me-3">
							Sign In
						</Button>
					</Nav.Link>
					<Nav.Link href="/register">
						<Button variant="secondary">
							Sign Up
						</Button>
					</Nav.Link>
				</div>
			</Card>
		</Container>
	</div>
  )
}

export default Hero