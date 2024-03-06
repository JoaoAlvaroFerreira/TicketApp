import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TicketView from './TicketView';
import TicketForm from './TicketForm';
import Login from './Login';
import React from 'react';

function LoginButton(props) {
  return (
    <button type="button" class="btn btn-secondary" onClick={props.onClick}>
      Employee Section
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button type="button" class="btn btn-secondary" onClick={props.onClick}>
      Logout
    </button>
  );
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginClick = this.handleLoginFormClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { loginForm: false };
  }

  handleLogin() {
    this.setState({ loginForm: false });
  }

  handleLoginFormClick() {
    this.setState({ loginForm: true });
  }

  handleLogoutClick() {
    this.setState({ loginForm: false });
    localStorage.clear();
  }

  render() {
    const isLoggedIn = localStorage.getItem('email')
    const loginForm = this.state.loginForm;
    let button, screen;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
      screen = <TicketView />
    } else {
      if (loginForm) {
        screen = <Login toggle={this.handleLogoutClick} login={this.handleLogin} />
      }
      else {
        screen = <TicketForm />
      }
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div class="h-100 d-flex justify-content-center">
        <div class = "row">
        <div class="col-md-12">
          {screen}
          {button}
        </div>
        </div>
      </div>

    );
  }
}
export default MainPage;
