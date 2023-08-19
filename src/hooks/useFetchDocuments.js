import { useState } from 'react';
import { database } from '../firebase/config';

import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

const useFetchDocuments = (docCollection) => {
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();

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

  return { loadDocuments, documents, loading };
};

export default useFetchDocuments;
