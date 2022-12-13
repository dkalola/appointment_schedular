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
        reqCountCurrent: data.reqCountCurrent + 1,
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

      if (oldData.guests) {
        check = oldData.guests.find((d) => d._id === data.guestID);

        if (check === undefined) {
          check = true;
        } else {
          check = false;
        }
      }

      if (check) {
        throw new Error("Guest Does not exsist!");
      } else {
        refupdate.update({
          appointments: FieldValue.arrayUnion({
            guestID: data.guestID,
            location: data.location,
            _id: data._id,
            date: data.date,
            checkedIn: data.checkedIn,
            amount: data.amount,
            payed: data.payed,
            time: data.time,
          }),
          reqCountCurrent: FieldValue.increment(1),
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
          reqCountCurrent: FieldValue.increment(1),
        });
      }
    });
  }

  static async createUser(data, key) {
    if (key == "divyanshukalola88") {
      let ref = db.collection("users");
      const snapshot = await ref.where("email", "==", data.email).get();

      if (snapshot.empty) {
        FirebaseData.setData("users", data, "divyanshukalola88");
        return true;
      } else {
        throw new Error("Email already in exsist!");
      }
    } else {
      throw new Error("You are not Authorised to create a new user!");
    }
  }

  static async updateRequest(key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }
    var status = false;

    snapshot.forEach((doc) => {
      let refupdate = db.collection("users").doc(doc.id);

      let data = doc.data();
      console.log(data);

      if (data.reqCountCurrent == data.reqCountMax) {
        status = true;
      } else {
        refupdate.update({
          reqCountCurrent: FieldValue.increment(1),
        });
        status = false;
      }
    });

    static async (key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }
    var status = false;

    snapshot.forEach((doc) => {
      let refupdate = db.collection("users").doc(doc.id);

      let data = doc.data();
      console.log(data);

      if (data.reqCountCurrent == data.reqCountMax) {
        status = true;
      } else {
        refupdate.update({
          reqCountCurrent: FieldValue.increment(1),
        });
        status = false;
      }
    });

    return status;
  }
}

module.exports = FirebaseData;
