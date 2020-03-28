import React, {useState} from 'react';
import {batch} from 'react-redux';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import CustomButton from '../custom-button/custom-buttom.component';
import FormInput from '../form-input/form-input.component';


const SignUp  = ()=>{
  const [displayName,setDisplayName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const handleSubmit = async event  =>{
    event.preventDefault();
    if(password !== confirmPassword){
      alert('password dont match');
      return;
    }
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email,password);
      await createUserProfileDocument(user,{displayName});
      batch(()=>{
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      });
    }catch(error){
      console.error(error);
    }
  }

  const handleChange = event =>{
    const {name,value} = event.target;
    switch(name){
      case 'displayName':
        setDisplayName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        return null;
    }
  }
  return(
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput type="text" name="displayName" value={displayName} onChange={handleChange} label="Display Name" required/>
        <FormInput type="email" name="email" value={email} onChange={handleChange} label="Email"  required/>
        <FormInput type="password" name="password" value={password} onChange={handleChange} label="Password" required/>
        <FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} label="Confirm Password" required/>
        <CustomButton type="sumbit">SIGN UP</CustomButton>


      </form>
    </div>
  )
}

export default SignUp;