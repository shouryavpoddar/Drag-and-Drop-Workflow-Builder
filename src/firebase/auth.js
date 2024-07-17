import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from 'firebase/auth';
import {auth} from './firebase';

export const doCreateUserWithEmailAndPassword = async (email, pasword) => {
    return createUserWithEmailAndPassword(auth, email, pasword);
};

export const doSignInWithEmailAndPassword = async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async() => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`,
//     });
// };