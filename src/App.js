import React, {Component} from 'react';
import{BrowserRouter, Switch, Route} from 'react-router-dom';
import firebase from './firebase';

import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import DashBoard from './components/Dashboard';
import Register from './components/Register';
import './global.css';

class App extends Component{

  state = {
    firebaseInitialized: false
  };

  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      //Devolve o usuario 
      this.setState({firebaseInitialized: resultado})
    });
  }

  render(){
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    );
  }
}

export default App;
