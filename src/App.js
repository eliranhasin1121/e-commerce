import React,{useState,useEffect} from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage  from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Login from './pages/sign-in-and-sign-up/login.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';

 var unSubscribeFromAuth = null;

function App() {
  const [currentUser,setCurrentUser] = useState(null);

  useEffect(() => {
  unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot=>{
          // console.log(snapshot.data());
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
        <Route path='/signin' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
