import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDocument from '../../hooks/useFetchDocument';

export default function CourseDetails() {
  const { id } = useParams();

  const { document, loadDocument, loading } = useFetchDocument('courses');

  useEffect(() => {
    loadDocument(id);
  }, []);

  console.log(document);

  return (
    <div>
      <h1>{document?.name}</h1>
      <p>{document?.author}</p>
      <p>{document?.isFree ? 'Gratis' : 'Pago'}</p>
    </div>
  );
}
