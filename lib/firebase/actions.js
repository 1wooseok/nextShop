import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc
} from "firebase/firestore/lite";
import { db, firestore } from "../../config/firebaseConfig";
import {
  ADD_FRIEND,
  DELETE_FRIEND,
  GET_FRIENDS
} from "../constants/FriendListConstants";

export const getFriends = () => {
  return async (dispatch) => {
    try {
      const friendsList = collection(db, "friends");
      const snapshot = await getDocs(friendsList);
      const snapshotData = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      dispatch({
        type: GET_FRIENDS,
        payload: snapshotData
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
};

export const deleteFriend = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "friends", id));
      dispatch(getFriends());
    } catch (e) {
      console.log(e, "e");
    }
  };
};

export const addFriend = (friend) => {
  return async (dispatch) => {
    try {
      await addDoc(collection(db, "friends"), friend);
      dispatch(getFriends());
    } catch (e) {
      console.log(e, "e");
    }
  };
};

export const markFavourite = (friend) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "friends", friend.id), {
        ...friend,
        isFavourite: true
      });
      dispatch(getFriends());
    } catch (e) {
      console.log(e, "e");
    }
  };
};

export const unmarkFavourite = (friend) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "friends", friend.id), {
        ...friend,
        isFavourite: false
      });
      dispatch(getFriends());
    } catch (e) {
      console.log(e, "e");
    }
  };
};
