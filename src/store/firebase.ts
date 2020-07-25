import * as firebase from 'firebase';
import 'firebase/firestore';

import auth from '../../firebase.json';

export default firebase.initializeApp(auth);