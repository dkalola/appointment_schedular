class FirebaseData {
  static setData(collection, data) {
    let ref = db.collection(collection);
    ref.add({
      name: "Yash",
    });
  }
}

module.exports = FirebaseData;
