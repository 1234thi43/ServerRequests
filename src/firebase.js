import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDP7vIykukO389uyJFtnqwQD7bblMLRDJA',
	authDomain: 'productsproject-f5469.firebaseapp.com',
	projectId: 'productsproject-f5469',
	storageBucket: 'productsproject-f5469.firebasestorage.app',
	messagingSenderId: '100354105258',
	appId: '1:100354105258:web:3f59cdebf6e186c74c95d3',
	databaseURL:
		'https://productsproject-f5469-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
