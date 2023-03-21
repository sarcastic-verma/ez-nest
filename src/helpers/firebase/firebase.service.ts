import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly firebaseApp: firebase.app.App;

  constructor() {
    if (firebase.apps.length === 0)
      this.firebaseApp = firebase.initializeApp({
        credential: firebase.credential.cert({
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };
}
