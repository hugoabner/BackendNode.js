import { useState, useEffect } from "react" 
import FormContainer from "../components/FormContainer";
import {Link} from 'react-router-dom'
import { Form, Button, Row, Col } from "react-bootstrap"   
import { useSelector, useDispatch  } from 'react-redux'
import { toast } from "react-toastify" 
import Loader from '../components/Loader'
import { useRegisterMutation } from "../slices/usersApiSlice";  
import { setCredentials } from "../slices/authSlice"; 
import { useNavigate } from "react-router-dom"; 

const RegisterScreen = () => {


	const [name, setName] = useState('');
	const [email,  setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [register, { isLoading }] = useRegisterMutation();
	const {userInfo} = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo]);
	
	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirPassword) {
			toast.error('Contraseña no coincide');
		} else {
			try {
				const res = await register({ name, email, password }).unwrap();
				dispatch(setCredentials({...res}));
				navigate('/'); 
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	}

  return (
	<FormContainer>
		<h1>Sign In</h1>
		<Form onSubmit={ submitHandler} > 

			<Form.Group className="my-2" controlId="name">
				<Form.Label>Name</Form.Label>
				<Form.Control 
					type="text" 
					placeholder="Enter name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				>
				</Form.Control>
			</Form.Group>
			
			<Form.Group className="my-2" controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control 
					type="email" 
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				>
				</Form.Control>
			</Form.Group>


			<Form.Group className="my-2" controlId="password">
				<Form.Label>password</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Enter password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				>
				</Form.Control>
			</Form.Group>

			<Form.Group className="my-2" controlId="confirPassword">
				<Form.Label>password.confir</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Enter confirm password"
					value={confirPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				>
				</Form.Control>
			</Form.Group>

			{isLoading && <Loader />}
			<Button type="submit" variant="primary" className="mt-3">
				Sign In
			</Button>
			<Row className="py-3">
				<Col>
				New Customer ?<Link to="/login"> Sign In</Link>
				</Col>
			</Row>
		</Form>
	</FormContainer>
  )
}

export default RegisterScreen