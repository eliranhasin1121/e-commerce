import React,{useState,useEffect} from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage  from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Login from './pages/sign-in-and-sign-up/login.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.action';
import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect'
import CheckOutPage from './pages/checkout/checkout.component'
 var unSubscribeFromAuth = null;

const App = ({setCurrentUser,currentUser}) => {

  useEffect(() => {
  unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot=>{
          setCurrentUser({
            id:snapshot.id,
            ...snapshot.data()
          })
        });
      }

    setCurrentUser(userAuth);
      return(()=>{
        unSubscribeFromAuth();
      })
    });
  }, [])
  return (
    <div className="App">
      <Header/>
      <Switch>
       <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckOutPage}/>
        <Route path='/signin' render={()=> currentUser ? <Redirect to='/'/> : <Login/>}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps = dispatch =>{
  return{
  setCurrentUser : user => dispatch(setCurrentUser(user))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
