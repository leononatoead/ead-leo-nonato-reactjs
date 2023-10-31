import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { BiEdit, BiTrash } from "react-icons/bi";
import ConfirmModal from "./ConfirmModal";

export default function SectionList({ sections, setSections }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [edit, setEdit] = useState({
    input: false,
    section: "",
    order: "",
  });

  const handleShowInput = (order, sectionName) => {
    setEdit({ input: true, section: sectionName, order });
  };

  const handleEditSection = (e) => {
    e.preventDefault();
    const verifyOrder = sections.find(
      (section) => section.order === edit.order,
    );

    if (verifyOrder) {
      toast({
        description: "Já existe um módulo com esse valor!",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    } else {
      const updatedSectionList = sections.map((section) => {
        if (section.sectionName === edit.section) {
          const updatedSection = {
            order: edit.order,
            sectionName: edit.section,
          };
          return updatedSection;
        } else {
          return section;
        }
      });

      setSections(updatedSectionList);
    }
  };

  const handleChangeInputValue = (value) => {
    let inputValue = value;

    if (value < 0) {
      inputValue = 0;
    } else if (value > 999) {
      inputValue = 999;
    }

    setEdit((prev) => ({ ...prev, order: Number(inputValue) }));
  };

  const handleDeleteSection = (name) => {
    const filter = sections.filter((section) => section.sectionName !== name);

    setSections(filter);
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
      >
        Ver inclusos
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="!max-w-[95%] self-center">
          <ModalHeader className="!flex !items-center">
            <Text className="-mt-2 !font-poppins text-primary-600">Seções</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={4}>
            <Flex
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              gap={2}
            >
              {sections.length > 0 ? (
                sections
                  ?.slice()
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <Box
                      key={`${section.order}-${section.sectionName}`}
                      className="flex w-full items-center justify-between gap-4"
                    >
                      <Box>
                        {section.order} - {section.sectionName}
                      </Box>
                      <Box className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleShowInput(section.order, section.sectionName)
                          }
                        >
                          <BiEdit size={18} className="text-primary-600" />
                        </button>

                        <ConfirmModal
                          deleteFunction={handleDeleteSection}
                          name={section.sectionName}
                        />
                      </Box>
                    </Box>
                  ))
              ) : (
                <Text className="p-2">Nenhuma seção cadastrada.</Text>
              )}
              {edit.input && (
                <form
                  id="editOrderForm"
                  className="mt-4 flex w-full items-center justify-center gap-4 "
                >
                  <input
                    type="number"
                    className="w-16 rounded-md bg-gray-150 px-4 py-2 text-center"
                    value={edit.order}
                    onChange={(e) => handleChangeInputValue(e.target.value)}
                    min={0}
                    max={999}
                    step={1}
                  />
                  <button
                    type="submit"
                    form="editOrderForm"
                    onClick={handleEditSection}
                    className=" rounded-md bg-primary-400 px-4 py-2 font-bold text-white"
                  >
                    Alterar ordem
                  </button>
                </form>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
