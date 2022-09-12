import FireBaseApp from "./config";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  updateDoc,
  doc
} from '@firebase/firestore/lite';

class FireStore extends FireBaseApp {
  #firestore;

  constructor() {
    super();
    this.#firestore = getFirestore(super.getApp());
  }

  async addItem(newItem) {
    try {
      await addDoc(collection(this.#firestore, "items"), newItem);
    }
    catch (err) {
      console.error(e);
    }
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