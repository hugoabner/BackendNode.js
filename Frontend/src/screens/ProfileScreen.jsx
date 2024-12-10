import { useState, useEffect } from "react" 
import FormContainer from "../components/FormContainer";
import { useNavigate} from 'react-router-dom'
import { Form, Button } from "react-bootstrap"   
import { useSelector, useDispatch  } from 'react-redux'
import { toast } from "react-toastify" 
import Loader from '../components/Loader'
import { setCredentials } from "../slices/authSlice"; 
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {


	const [name, setName] = useState('');
	const [email,  setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {userInfo} = useSelector((state) => state.auth);
	const [updateProfile, {isLoading}] = useUpdateUserMutation();

	useEffect(() => {
		setName(userInfo.name);
		setEmail(userInfo.email);
	}, [userInfo.setName, userInfo.setEmail]);
	
	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirPassword) {
			toast.error('Contraseña no coincide');
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					name,
					email,
					password
				}).unwrap();
				dispatch(setCredentials({...res}));
				toast.success('Perfil actualizado');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	}

  return (
	<FormContainer>
		<h1>Actualizar Profile</h1>
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
			{isLoading && <Loader/>}
			<Button type="submit" variant="primary" className="mt-3">
				Update
			</Button>
		</Form>
	</FormContainer>
  )
}

export default ProfileScreen;