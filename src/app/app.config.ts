import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({      
      "projectId":"labo4-ppr",
      "appId":"1:497450715336:web:5774626a4d9b9218d13dfd",
      "storageBucket":"labo4-ppr.appspot.com",
      "apiKey":"AIzaSyCvERqxhrOWHmPhYxv4biiH6LpacVhbDkw",
      "authDomain":"labo4-ppr.firebaseapp.com",
      "messagingSenderId":"497450715336"})), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"labo4-ppr",
      "appId":"1:497450715336:web:5774626a4d9b9218d13dfd",
      "storageBucket":"labo4-ppr.appspot.com",
      "apiKey":"AIzaSyCvERqxhrOWHmPhYxv4biiH6LpacVhbDkw",
      "authDomain":"labo4-ppr.firebaseapp.com",
      "messagingSenderId":"497450715336"})), provideAnimationsAsync(), 
  ]
};
