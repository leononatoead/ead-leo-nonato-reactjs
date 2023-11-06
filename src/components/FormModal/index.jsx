import { useEffect } from "react";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import Form from "./Form";
import { useState } from "react";
import Concluded from "./Concluded";

export default function FormModal({ open, close, formId, courseId }) {
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    const submitedCourseForms = JSON.parse(
      localStorage.getItem("submitedCourseForms"),
    );

    if (submitedCourseForms) {
      const verify = submitedCourseForms.find((id) => id === formId);

      if (verify) {
        setSubmited(true);
      }
    }
  }, []);

  return (
    <Modal isOpen={open} onClose={() => close(false)}>
      <ModalOverlay />
      {submited ? (
        <Concluded />
      ) : (
        <Form formId={formId} courseId={courseId} setSubmited={setSubmited} />
      )}
    </Modal>
  );
}
