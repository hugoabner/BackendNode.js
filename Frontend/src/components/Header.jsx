import { Navbar, Nav, Container} from  'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; 
import { useSelector, useDispatch  } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {
	const {userInfo} = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [logoutApiCall] = useLogoutMutation();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	} 


  return (
	<header>
		<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
			<Container>
				<Navbar.Brand href='/'>Mern App</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						{ userInfo ? (
							<>
							<Dropdown>
							<Dropdown.Toggle id='username' variant='warning' >
								{ userInfo.name }
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item href="/profile">
									Profile
								</Dropdown.Item>
								<Dropdown.Item href="/login" onClick={logoutHandler}>
									Logout
								</Dropdown.Item>
							</Dropdown.Menu>
							</Dropdown>
							</>
						) : (
							<>
							<Nav.Link href='/login'>
								<FaSignInAlt /> Sign In
							</Nav.Link>
							<Nav.Link href='/register'>
								<FaSignOutAlt /> Sign Up
							</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	</header>
  )
}

export default Header