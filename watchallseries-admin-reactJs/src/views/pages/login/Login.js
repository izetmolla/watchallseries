import React from 'react'
import {
  CCol,
  CContainer,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AuthControllers from '../../../app/Controllers/AuthControllers'




class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });
    const { email, password } = this.state;
    AuthControllers.getLogin({ email, password }).then(data => {
      console.log(data)
    })

  }




  render() {
    const { email, password } = this.state;

    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="5">

              <div className="login-box1">
                <div className="login-logo">
                  <a href="/"><b>Watch</b>All</a><b>Series</b>
                </div>
                {/* /.login-logo */}
                <div className="card">
                  <div className="card-body login-card-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <form name="form" onSubmit={this.handleSubmit}>
                      <div className="input-group mb-3">
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                      </div>
                      <div className="input-group mb-3">
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <button className="btn btn-primary btn-block">Sign In</button>
                        </div>
                        {/* /.col */}
                      </div>
                    </form>
                    <p className="mb-3 mt-3">
                      <a href="forgot-password.html">I forgot my password</a>
                    </p>
                  </div>
                  {/* /.login-card-body */}
                </div>
              </div>

            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

export default Login
