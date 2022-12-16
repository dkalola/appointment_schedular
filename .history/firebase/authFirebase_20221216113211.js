var admin = require("./firebase_service");
const auth = admin.auth;

class FirebaseAuthService {
  static async createUser(userData) {
    var googleLogin = new auth.GoogleAuthProvider();
    admin.auth();
  }
} 
