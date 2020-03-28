import React,{useState} from 'react';
import './sign-in.styles.scss';
import {batch} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-buttom.component';
import { auth,signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = _ =>{
const [email,setEmail] = useState(null);
const [password,setPassword] = useState(null);

const handleSubmit =async event => {
  event.preventDefault();
  try{
    await auth.signInWithEmailAndPassword(email,password);
    clearState();

}catch(error){
  console.error(error);
}
}
const clearState = ()=>{
  batch(()=>{
    setEmail('');
    setPassword('');
  })
}

const handleChange = (event) => {
  const {value,name} = event.target;
  name === "password" ? setPassword(value) : setEmail(value);
}

return(
<div className="sign-in" onSubmit={handleSubmit}>
  <h2>I already have an account</h2>
  <span>Sign in with your email and password</span>

  <form>
    <FormInput name="email" value={email} handleChange={handleChange} type="email" label="Email" required/>
    <FormInput name="password" value={password} handleChange={handleChange} type="password" label="Password" required/>
    <CustomButton type="submit">Sign In</CustomButton>
<CustomButton onClick={signInWithGoogle} isGoogleSignIn> {' '}Sign in with Google {' '}</CustomButton>
  </form>
</div>
)
}
export default SignIn;