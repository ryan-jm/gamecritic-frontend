import {
    EuiButton,
    EuiCallOut,
    EuiFieldPassword,
    EuiFieldText,
    EuiFlexGroup,
    EuiForm,
    EuiFormRow,
    EuiImage,
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiSpacer,
} from '@elastic/eui';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LoginIllu from '../assets/login.svg';
import { useAuth } from '../stores/AuthContext';

const Login = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { state }: any = useLocation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(username, password);
    navigate(state?.path ?? '/');
  };

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <EuiPage paddingSize="l">
      <EuiPageBody style={{ marginTop: '4rem' }}>
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="l"
          style={{ marginTop: '2rem', paddingBottom: '2rem' }}
        >
          <EuiFlexGroup
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <EuiCallOut title="Wait..." color="danger" iconType="alert">
              This login form is currently not using secure auth; please use the
              following username and password:
              <ul>
                <li>
                  <b>Username:</b> test-account
                </li>
                <li>
                  <b>Password:</b> password123
                </li>
              </ul>
            </EuiCallOut>
            <EuiSpacer size="l" />
            <EuiImage src={LoginIllu} alt="Login" />
            <EuiForm component="form">
              <EuiFormRow label="Username">
                <EuiFieldText
                  placeholder="Enter your username..."
                  icon="user"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </EuiFormRow>
              <EuiFormRow label="Password">
                <EuiFieldPassword
                  placeholder="Enter your password..."
                  type="dual"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiFlexGroup
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                  style={{ marginTop: '0.5em' }}
                  gutterSize="l"
                >
                  <EuiButton color="accent" fill onClick={handleLogin}>
                    Login
                  </EuiButton>
                </EuiFlexGroup>
              </EuiFormRow>
            </EuiForm>
          </EuiFlexGroup>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Login;
