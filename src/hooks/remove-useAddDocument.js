// import { useState } from 'react';

// import { database } from '../firebase/config';
// import { collection, addDoc, Timestamp } from 'firebase/firestore';

// import { toast } from 'react-hot-toast';

// const useAddDocument = (docCollection) => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(null);

//   const addDocument = async (document) => {
//     setLoading(true);

//     try {
//       const newDocument = { ...document, createdAt: Timestamp.now() };
//       await addDoc(collection(database, docCollection), newDocument);
//       setLoading(false);
//       toast.success('Curso cadastrado com sucesso!');
//     } catch (e) {
//       toast.error(e.message);
//       setError(e.message);
//       console.log(e.message);
//       setLoading(false);
//     }
//   };

//   return { addDocument, error, loading };
// };

// export default useAddDocument;
