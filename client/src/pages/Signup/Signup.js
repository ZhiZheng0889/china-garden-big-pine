import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import styles from './Signup.module.css';
import { UserApi } from '../../api/userApi';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
const Signup = ({ setUser }) => {
  const [signup, setSignup] = useState({
    email: '',
    username: '',
    first_name: '',
    phone_number: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState('Continue');
  const onChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'passwordConfirm') {
      setConfirmPassword(value);
    } else {
      setSignup({
        ...signup,
        [name]: value,
      });
    }
  };
  const footerText = (
    <p className={styles.footer}>
      Already have an account? <Link to="/login">Sign in here</Link>
    </p>
  );
  const onSubmit = async (event) => {
    console.log('in here!');
    setError(null);
    event.preventDefault();
    setButtonText('Loading...');
    try {
      if (signup.password === confirmPassword) {
        console.log(signup);
        const payload = {
          ...signup,
          isAdmin: false,
        };
        const response = await UserApi.signup(payload);
        if (response) {
          console.log('res: ', response);
          setUser(response);
          redirect('/');
        }
      } else {
        throw { message: 'Passwords are not matching. Please try again.' };
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setButtonText('Continue');
    }
  };
  return (
    <div className={styles.container}>
      {error && <ErrorAlert error={error} />}
      <h1 className={styles.title}>China Garden</h1>
      <Form
        data={signup}
        onChange={onChange}
        onSubmit={onSubmit}
        footer={footerText}
        submitText={buttonText}
      >
        <Input
          onChange={onChange}
          value={confirmPassword}
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          label="Confirm Password"
        />
      </Form>
    </div>
  );
};
// import React from 'react';
// const Signup = ({ setSession, session }) => {
//   // work in here
//   /*
//     user will put in
//     -email
//     -phone number
//     -first name
//     -last name
//     -password
//     -confirm password

//   */
//     const initSignup = {
//       first_name: '',
//       last_name: '',
//       username: '',
//       email: '',
//       phone: '',
//       password: '',
//     };
//     const [signup, setSignup] = useState(initSignup);
//     const [passwordConfirm, setPasswordConfirm] = useState('');
//     const [error, setError] = useState(null);
//     const [signupBtnText, setSignupBtnText] = useState('Continue');
//     const navigate = useNavigate();
//     const handleChange = ({ target }) => {
//       const { id } = target;
//       setSignup({
//         ...signup,
//         [id]: target.value,
//       });
//     };
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       setError(null);
//       setSession({});
//       setSignupBtnText('Loading...');
//       try {
//         if (signup.password === passwordConfirm) {
//           const abortController = new AbortController();
//           const response = await signupUser(signup, abortController.signal);
//           setSession(response);
//           navigate('/');
//         } else {
//           throw {
//             message: 'Passwords are not matching. Please try again.',
//           };
//         }
//       } catch (error) {
//         setError(error);
//         setSignupBtnText('Continue');
//       }
//     };
//   //__Input controls
//     return (
//       <main className="row">
//         <form
//           id="signup-form"
//           onSubmit={handleSubmit}
//           className="col-12 col-sm-11 col-md-5 ms-auto me-auto border rounded signup-form"
//         >
//           <ErrorAlert error={error} />
//           <h3 className="text-center">Welcome to DEV Clone</h3>

//           <div className="row">
//             <div className="input-control mb-3 col-12 col-lg-6">
//               <label htmlFor="first_name" className="form-label">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="first_name"
//                 value={signup.first_name}
//                 onChange={handleChange}
//                 placeholder="first name"
//                 required
//               />
//             </div>

//             <div className="input-control mb-3 col-12 col-lg-6">
//               <label htmlFor="last_name" className="form-label">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="last_name"
//                 value={signup.last_name}
//                 onChange={handleChange}
//                 placeholder="last name"
//                 required
//               />
//             </div>
//           </div>

//           <div className="input-control mb-3">
//             <label htmlFor="username" className="form-label">
//               Username
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               value={signup.username}
//               onChange={handleChange}
//               placeholder="username"
//               required
//             />
//           </div>

//           <div className="input-control mb-3">
//             <label htmlFor="email" className="form-label">
//               Email address
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={signup.email}
//               onChange={handleChange}
//               placeholder="youremail@example.com"
//               required
//             />
//           </div>

//           <div className="input-control mb-3">
//             <label htmlFor="phone" className="form-label">
//               Phone Number
//             </label>
//             <input
//               type="phone"
//               className="form-control"
//               id="phone"
//               value={signup.email}
//               onChange={handleChange}
//               placeholder="(xxx)-xxx-xxxx"
//               required
//             />
//           </div>

//           <div className="input-control mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               value={signup.password}
//               onChange={handleChange}
//               placeholder="password"
//               required
//             />
//           </div>

//           <div className="input-control mb-3">
//             <label htmlFor="passwordConfirm" className="form-label">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="passwordConfirm"
//               value={passwordConfirm}
//               onChange={({ target }) => setPasswordConfirm(target.value)}
//               placeholder="confirm password"
//               required
//             />
//           </div>

//           <div className="mb-3 form-check">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="exampleCheck1"
//             />
//             <label className="form-check-label" htmlFor="exampleCheck1" disabled>
//               Remember Me
//             </label>
//           </div>

//           <div className="warning">
//             <p className="text-sm mb-2">
//               BE CAREFUL. This project uses modern practices to keep your
//               passwords and emails secured. I cannot ensure that this project will
//               be constantly updated and upkept in the future and this could lead
//               to vulnerabilities in the future. This is a fun little application
//               and even though your passwords are secured, they might not be
//               forever! ⚠
//             </p>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary signup-submit"
//             value="Submit"
//             form="signup-form"
//             disabled={signupBtnText !== 'Continue'}
//           >
//             {signupBtnText}
//           </button>
//         </form>
//       </main>
//       )
//   return null;
// };

export default Signup;
