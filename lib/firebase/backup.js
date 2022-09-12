import FireBaseApp from "./config";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

class FireStore extends FireBaseApp {
  #firestore;
  #itemsRef

  constructor() {
    super();
    this.#firestore = getFirestore(super.getApp());
  }

  async addItem(newItem) {
    const docRef = await addDoc(collection(this.#firestore, "items"), newItem);
    return {
      orderId: docRef.id,
      ...newItem,
    };
  }

  async removeItem() {

  }

  async updateItem() {

  }

  async getCartList() {

  }

  async getOrderHistory() {

  }
}

const FIRE_STORE = new FireStore();

export default FIRE_STORE;

// // interface newItem {
// //   orderId: Number,
// //   userId: String,
// //   productId: Number,
// //   option: String,
// //   quantity: Number,
// //   isOrdered: Boolean,
// //   Date: String
// // }