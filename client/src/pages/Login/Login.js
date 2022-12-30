import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import styles from './Login.module.css';
import { UserApi } from '../../api/userApi';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
const Login = ({ setUser }) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState('Login');
  const onChange = ({ target }) => {
    const { name, value } = target;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const footerText = (
    <p className={styles.footer}>
      Don't have an account? <Link to="/signup">Sign up here</Link>
    </p>
  );
  const onSubmit = async (event) => {
    setError(null);
    event.preventDefault();
    setButtonText('Loading...');
    try {
      const response = await UserApi.login(login);
      setUser(response);
    } catch (error) {
      console.log(error);
      setError({ message: error });
    } finally {
      setButtonText('Continue');
    }
  };
  return (
    <div className={styles.container}>
      {error && <ErrorAlert error={error} />}
      <h1 className={styles.title}>China Garden</h1>
      <Form
        data={login}
        onChange={onChange}
        onSubmit={onSubmit}
        footer={footerText}
        submitText={buttonText}
      />
    </div>
  );
};
// imports for replicatinhg listFoods for modal testing
// import { useState, useEffect } from 'react';
// import { listFoods } from '../../api/foodApi';
// import Modal from '../../components/Modal/Modal';
// const Login = ({ setSession }) => {
//   // work in here
//   const [login, setLogin] = useState({ username: '', password: '' });
//   const [loginBtnText, setLoginBtnText] = useState('Continue');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const handleChange = ({ target }) => {
//     const { id } = target;
//     setLogin({
//       ...login,
//       [id]: target.value,
//     });
//   };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError(null);
//     setLoginBtnText('Loading...');
//     const abortController = new AbortController();
//     createLogin(login, abortController.signal)
//       .then((response) => {
//         setSession(response);
//         navigate('/');
//       })
//       .catch((err) => {
//         setError(err);
//         setLoginBtnText('Continue');
//       });
//   };
//   return (
//     <main className="row">
//       <form
//         id="login-form"
//         onSubmit={handleSubmit}
//         className="col-12 col-sm-11 col-md-5 ms-auto me-auto border rounded login-form"
//       >
//         <ErrorAlert error={error} />
//         <h3 className="text-center">Welcome to DEV Clone</h3>
//         <div className="input-control mb-3">
//           <label htmlFor="email" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={login.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="input-control mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={login.password}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3 form-check">
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="exampleCheck1"
//           />
//           <label className="form-check-label" htmlFor="exampleCheck1" disabled>
//             Remember Me
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary login-submit"
//           value="Submit"
//           form="login-form"
//           disabled={loginBtnText !== 'Continue'}
//         >
//           {loginBtnText}
//         </button>
//       </form>
//     </main>
//   );

//   return null;
// };

export default Login;
