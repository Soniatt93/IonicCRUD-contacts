# Ionic Firestore CRUD
A simple Ionic CRUD (Create, Read, Update and Delete) using ionic 5 application that helps to manage data from Cloud Firestore
This project was generated with Ionic CLI version 5.4.16 y Angular CLI version 8.3.25.

## Demo
You can play around with code demo [ContactApp](https://stt-contactsapp.web.app).

## Development server
Run `ionic serve -l` for a dev serve. Navigate to `http://localhost:8200/`. The app will automatically reload if you change any of the source files..

To start the app, you may also try these the following commands in Node.js command prompt:
```sh
# ionic cordova run browser

# ionic cordova platform rm android
# ionic cordova platform add android
# ionic cordova platform rm ios
# ionic cordova platform add ios
# ionic cordova run android
# ionic cordova run ios
```

## Update the environment
You need to change file environment.ts insert your [Firebase](https://firebase.google.com/?hl=es) project keys
```sh
firebaseConfig = {
  apiKey: "<your key>",
  authDomain: "<your key>",
  databaseURL: "<your key>",
  projectId: "<your key>",
  storageBucket: "<your key>",
  messagingSenderId: "<your key>"
};
``` 
Next, you need to configure Cloud Firestore and add a 'contact' collection.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `www` directory.
