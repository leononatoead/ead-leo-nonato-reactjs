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
} from '@chakra-ui/react';
import { useState } from 'react';

import { BiEdit, BiTrash } from 'react-icons/bi';

export default function SectionList({ sections, setSections }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [edit, setEdit] = useState({
    input: false,
    section: '',
    order: '',
  });

  const handleShowInput = (order, sectionName) => {
    setEdit({ input: true, section: sectionName, order });
  };

  const handleEditSection = () => {
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
  };

  const handleDeleteSection = (name) => {
    const filter = sections.filter((section) => section.sectionName !== name);

    setSections(filter);
  };

  return (
    <>
      <button
        type='button'
        onClick={onOpen}
        className='w-[50%] bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
      >
        Ver inclusas
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='!flex !items-center'>
            <Text className='text-primary-600 -mt-2'>Compartilhar</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={4}>
            <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              justifyContent={'center'}
              gap={2}
            >
              {sections
                ?.slice()
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <Box
                    key={`${section.order}-${section.sectionName}`}
                    className='w-full flex items-center justify-between gap-4'
                  >
                    <Box>
                      {section.order} - {section.sectionName}
                    </Box>
                    <Box className='flex items-center gap-2'>
                      <button
                        onClick={() =>
                          handleShowInput(section.order, section.sectionName)
                        }
                      >
                        <BiEdit size={18} className='text-primary-600' />
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.sectionName)}
                      >
                        <BiTrash size={18} className='text-red-500' />
                      </button>
                    </Box>
                  </Box>
                ))}
              {edit.input && (
                <Box className='w-full flex justify-center items-center gap-4 mt-4 '>
                  <input
                    type='number'
                    className='bg-gray-150 rounded-md px-4 py-2 w-16 text-center'
                    value={edit.order}
                    onChange={(e) =>
                      setEdit((prev) => ({ ...prev, order: e.target.value }))
                    }
                  />
                  <button
                    onClick={handleEditSection}
                    className=' px-4 py-2 bg-primary-400 rounded-md text-white font-bold'
                  >
                    Alterar ordem
                  </button>
                </Box>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
