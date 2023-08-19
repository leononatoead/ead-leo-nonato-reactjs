import { useState } from 'react';
import { database } from '../firebase/config';

import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const useFetchDocuments = (docCollection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const loadDocuments = () => {
    setLoading(true);

    const collectionRef = collection(database, docCollection);
    try {
      const q = query(collectionRef, orderBy('createdAt', 'asc'));
      onSnapshot(q, (querySnapshot) => {
        setDocuments(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      });
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loadDocuments, documents, error, loading };
};

export default useFetchDocuments;
