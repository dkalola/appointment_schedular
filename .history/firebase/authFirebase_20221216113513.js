var admin = require("./firebase_service");
const auth = admin.auth;

class FirebaseAuthService {
  static async createUser(userData) {
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
