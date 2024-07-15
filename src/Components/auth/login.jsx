// src/components/Login.js
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/authContext";
import { doSendEmailVerification, doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";

// Styled components for styling the login page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 300px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background: #0056b3;
  }
`;

const Error = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

const GoogleButton = styled(Button)`
  background: #DB4437;

  &:hover {
    background: #c23321;
  }
`;

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
                await doSendEmailVerification();
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Title>Login</Title>
                {errorMessage && <Error>{errorMessage}</Error>}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" disabled={isSigningIn}>
                    {isSigningIn ? "Signing in..." : "Sign In"}
                </Button>
                <GoogleButton onClick={onGoogleSignIn} disabled={isSigningIn}>
                    {isSigningIn ? "Signing in..." : "Sign In with Google"}
                </GoogleButton>
            </Form>
        </Container>
    );
};

export default Login;
