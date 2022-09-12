import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import FireBaseApp from "./config";

class FireBaseAuth extends FireBaseApp {
  #auth;
  #provider;

  constructor() {
    super();
    this.#auth = getAuth();
    this.#provider = new GoogleAuthProvider();
  }

  async firebaseSignIn() {
    try {
      await setPersistence(this.#auth, browserSessionPersistence);
      await signInWithPopup(this.#auth, this.#provider);
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(`ERROR-CODE: ${errorCode} \n ERROR_MESSAGE: ${errorMessage} \n`);
      return {
        errorCode,
        errorMessage,
        email,
        credential
      }
    }
  }

  async firebaseSignOut() {
    try {
      await signOut(this.#auth);
      alert('You are logged out.');
    }
    catch (err) {
      throw new Error(`${err} SignOut Failed`);
    }
  }
}

const FIREBASE_AUTH = new FireBaseAuth();

export default FIREBASE_AUTH;

// export async function firebaseSignIn() {
//   try {
//     await setPersistence(auth, browserSessionPersistence);
//     const result = await signInWithPopup(auth, provider);
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     const user = result.user;

//     return { credential, token, user };
//   }
//   catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     const email = error.customData.email;
//     const credential = GoogleAuthProvider.credentialFromError(error);

//     return {
//       errorCode,
//       errorMessage,
//       email,
//       credential
//     }
//   }
// }

// export async function firebaseSignOut() {
//   try {
//     await signOut(auth);
//     alert('로그아웃 되었습니다.');
//   }
//   catch (err) {
//     alert('로그아웃 실패');
//     throw new Error(`${err} SignOut Failed`);
//   }
// }