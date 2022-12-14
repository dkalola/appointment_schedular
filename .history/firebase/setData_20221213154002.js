const db = require("./firebase.js");
const { FieldValue } = require("firebase-admin/firestore");

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
      let refupdate = db
        .collection("users")
        .doc(doc.id)
        .collection("appointments");
      let refupdate1 = db.collection("users").doc(doc.id);
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
        refupdate.add({
          guestID: data.guestID,
          location: data.location,
          _id: data._id,
          date: data.date,
          checkedIn: data.checkedIn,
          amount: data.amount,
          payed: data.payed,
          time: data.time,
        });

        refupdate1.update({
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

    snapshot.forEach(async (doc) => {
      let refupdate = db.collection("users").doc(doc.id).collection("guests");
      let refupdate1 = db.collection("users").doc(doc.id);
      let oldData = doc.data();

      let check = false;

      if (oldData.guests) {
        check = await refupdate.where("email", "=", data.email);

        console.log("--------------------------------");
        console.log(check.get());
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
        refupdate.add({
          name: data.name,
          email: data.email,
          phone: data.phone,
          _id: data._id,
          date: data.date,
        });

        refupdate1.update({
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

    return status;
  }

  static async updateApp(id, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }

    var elements = new Array();

    snapshot.forEach((doc) => {
      let refupdate = db.collection("users").doc(doc.id);

      let data = doc.data();

      var app = data.appointments;

      for (let i = 0; i < app.length; i++) {
        if (app[i]._id != id) {
          elements.push(app[i]);
        }
      }
      refupdate.update({
        appointments: elements,
      });
    });

    return elements;
  }

  static async updateGuest(id, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }

    var elements = new Array();

    snapshot.forEach((doc) => {
      let refupdate = db.collection("users").doc(doc.id);

      let data = doc.data();

      var app = data.guests;

      for (let i = 0; i < app.length; i++) {
        if (app[i]._id != id) {
          elements.push(app[i]);
        }
      }
      refupdate.update({
        guests: elements,
      });
    });

    return elements;
  }

  static async updateAppointment(id, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }

    var elements = new Array();

    snapshot.forEach((doc) => {
      let refupdate = db.collection("users").doc(doc.id);

      let data = doc.data();

      var app = data.guests;

      for (let i = 0; i < app.length; i++) {
        if (app[i]._id != id) {
          elements.push(app[i]);
        }
      }
      refupdate.update({
        guests: elements,
      });
    });

    return elements;
  }
}

module.exports = FirebaseData;
