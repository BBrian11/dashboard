const prodConfig = {
  apiKey: "AIzaSyCgWTdoahNIQTenFMpfGUhrkNvEHhym-xE",
  authDomain: "pedidosreact.firebaseapp.com",
  projectId: "pedidosreact",
  storageBucket: "pedidosreact.appspot.com",
  messagingSenderId: "878564978793",
  appId: "1:878564978793:web:b2bc4d394ae87f56e572f8",
  measurementId: "G-TTF4GJNE8G"
};

const devConfig = {
  apiKey: "AIzaSyCgWTdoahNIQTenFMpfGUhrkNvEHhym-xE",
  authDomain: "pedidosreact.firebaseapp.com",
  projectId: "pedidosreact",
  storageBucket: "pedidosreact.appspot.com",
  messagingSenderId: "878564978793",
  appId: "1:878564978793:web:b2bc4d394ae87f56e572f8",
  measurementId: "G-TTF4GJNE8G"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
