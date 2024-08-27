import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const dataConnection = await openDB('jate', 1); // aquire the shipping address
  const transaction = dataConnection.transaction('jate', 'readwrite'); // the invoice of shipping the box
  const shippingBox = transaction.objectStore('jate'); // build box to ship stuff in
  const boxContent = shippingBox.put({id: 1, value: content}); // put stuff in the box for shipping
  const result = await boxContent; // put box in the mail
  console.log("data saved", result); // printing the reciept from shipping the box
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const dataConnection = await openDB('jate', 1); // same^
  const transaction = dataConnection.transaction('jate', 'readonly'); // same^ but no need to write to the database (mail a response back)
  const shippingBox = transaction.objectStore('jate'); // same^
  const boxContent = shippingBox.get(1); // same^
  const result = await boxContent; // same^
  console.log("data recieved", result); // same^
  return result?.value; // client accesses the stuff inside the box
};

initdb();
