const db = require("./firebase.js");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const {
  FormatColorResetSharp,
  FormatListBulleted,
} = require("@mui/icons-material");

class FirebaseData {
  static setData(collection, data, key) {
    if (key == "divyanshukalola88") {
      // change this to env
      let ref = db.collection(collection);
      ref.add({
        apiKey: data.apiKey,
        name: data.name,
        email: data.email,
        phone: data.phone,
        reqCountCurrent: data.reqCountCurrent,
        reqCountMax: data.reqCountMax,
        statusCode: data.statusCode,
        _id: data._id,
        date: data.date,
      });
    } else {
      throw new Error("API Key does not match our records!");
    }
  }

  static async createAppointment(data, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();

    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }

    snapshot.forEach((doc) => {
      let refupdate = db.collection("users").doc(doc.id);
      let oldData = doc.data();

      let check = false;

      if (oldData.appointments) {
        check = oldData.appointments.find((d) => d.guestId === data.guestId);
        if (check !== undefined) {
          check = true;
        } else {
          check = false;
        }
      }

      if (check) {
        throw new Error("Guest already exsist!");
      } else {
        // add data
        refupdate.update({
          appointments: FieldValue.arrayUnion({
            location: data.location,
            date: data.date,
            guestId: data.guestId,
            _id: data._id,
          }),
        });
      }
    });
  }

  static async createGuest(data, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();

    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }

    snapshot.forEach((doc) => {
      let refupdate = db.collection("users").doc(doc.id);
      let oldData = doc.data();

      let check = false;

      if (oldData.guests) {
        check = oldData.guests.find((d) => d.email === data.email);
        // console.log(check);
        // console.log(data);
        if (check !== undefined) {
          check = true;
        } else {
          check = false;
        }
      }

      if (check) {
        throw new Error("Email already exsist!");
      } else {
        // add data
        refupdate.update({
          guests: FieldValue.arrayUnion({
            name: data.name,
            email: data.email,
            phone: data.phone,
            _id: data._id,
            date: data.date,
          }),
        });
      }
    });
  }

  static async createUser(data) {
    console.log(data);
    let ref = db.collection("users");
    const snapshot = await ref.where("email", "==", data.email).get();
    if (!snapshot.exists) {
      FirebaseData.setData("users", data, "divyanshukalola88");
      return true;
    } else {
      throw new Error("Email already in exsist! \n User Not created.");
    }
  }
}

module.exports = FirebaseData;
