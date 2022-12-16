const { getAuth } = require("firebase-admin/auth");
const firebaseAuth = getAuth();

class FirebaseAuthService {
  static async createUser() {
    var googleLogin = new auth.GoogleAuthProvider();
    admin
      .auth()
      .signInWithPopup(googleLogin)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

module.exports = FirebaseAuthService;
