// import { useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { database } from '../firebase/config';

// const useFetchDocument = (docCollection) => {
//   const [document, setDocument] = useState(null);
//   const [loading, setLoading] = useState(null);

//   const loadDocument = async (id) => {
//     setLoading(true);

//     try {
//       const docRef = doc(database, docCollection, id);
//       const docSnapshot = await getDoc(docRef);

//       setDocument(docSnapshot.data());

//       setLoading(false);
//     } catch (e) {
//       console.log(e.message);
//       setLoading(false);
//     }
//   };

//   return { loadDocument, document, loading };
// };

// export default useFetchDocument;
