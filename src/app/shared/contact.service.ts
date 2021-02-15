import { Injectable } from '@angular/core';
import { Contact } from './Contact';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private firestore: AngularFirestore) { }

  // Create
  createContact(data: any) {
    return this.firestore.collection('contact').add(data);
  }

  // Get Single
  getContact(id: string) {
    return this.firestore.collection('contact').doc(id).snapshotChanges();
  }

  // Get List
  getContactList() {
    return this.firestore.collection('contact').snapshotChanges();
  }

  // Update
  updateContact(id: string, data: any) {
    return this.firestore.collection('contact').doc(id).set(data);
  }

  // Delete
  deleteContact(id: string) {
    return this.firestore.collection('contact').doc(id).delete();
  }
}
