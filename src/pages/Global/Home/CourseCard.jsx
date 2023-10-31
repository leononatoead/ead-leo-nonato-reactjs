import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PremiumCourse from "../../../components/PremiumCourse";
import { Box, Card, CardBody, CardFooter, Image, Text } from "@chakra-ui/react";
import { BiCartAdd, BiLockAlt } from "react-icons/bi";
import FormModal from "../../../components/FormModal";

export default function CourseCard({ courseData, setOpenLoginModal }) {
  const [openPremiumModal, setOpenPremiumModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const verifyPurchase = user?.purchased?.find((id) => id === courseData.id);

  return (
    <>
      {/* CURSO GRATIS SEM USER */}
      {!user && !courseData?.isPremium && (
        <Card
          p={0}
          bg={"transparent"}
          className="!w-40 !overflow-hidden !rounded-sm !shadow-none lg:!w-60 lg:!rounded-b-none  lg:!rounded-t-xl"
          onClick={() => setOpenLoginModal(true)}
        >
          <CardBody p={0}>
            <Image
              src={courseData?.imagePath}
              className="!h-24 !w-40 rounded-sm object-cover lg:!h-36 lg:!w-60 lg:rounded-xl"
            />
          </CardBody>
          <CardFooter p={0} mt={2} className="flex items-start justify-between">
            <span className="text-base !font-medium leading-[18px] text-primary-600 lg:text-normal lg:leading-4">
              {courseData?.name}
            </span>
            <BiLockAlt className="text-primary-600" />
          </CardFooter>
        </Card>
      )}
      {/* CURSO PREMIUM SEM USER */}
      {!user && courseData?.isPremium && (
        <Card
          p={0}
          bg={"transparent"}
          className="!w-40 !overflow-hidden !rounded-sm !shadow-none lg:!w-60 lg:!rounded-b-none  lg:!rounded-t-xl"
          onClick={() => setOpenLoginModal(true)}
        >
          <CardBody p={0}>
            <Image
              src={courseData?.imagePath}
              className="!h-24 !w-40 rounded-sm object-cover lg:!h-36 lg:!w-60 lg:rounded-xl"
            />
          </CardBody>
          <CardFooter p={0} mt={2} className="flex items-start justify-between">
            <span className="text-base !font-medium leading-[18px] text-primary-600 lg:text-normal lg:leading-4">
              {courseData?.name}
            </span>
            <BiLockAlt className="text-primary-600" />
          </CardFooter>
        </Card>
      )}

      {/* CURSO GRATIS COM USER */}
      {user && !courseData?.isPremium && (
        <Link to={`/course/${courseData?.id}`}>
          <Card
            p={0}
            bg={"transparent"}
            className="!w-40 !cursor-pointer !overflow-hidden !rounded-sm !shadow-none lg:!w-60  lg:!rounded-b-none lg:!rounded-t-xl"
          >
            <CardBody p={0}>
              <Image
                src={courseData?.imagePath}
                className="!h-24 !w-40 rounded-sm object-cover lg:!h-36 lg:!w-60 lg:rounded-xl"
              />
            </CardBody>
            <CardFooter p={0} mt={2}>
              <span className="text-base !font-medium leading-[18px] text-primary-600 lg:text-normal lg:leading-4">
                {courseData?.name}
              </span>
            </CardFooter>
          </Card>
        </Link>
      )}

      {/* CURSO PAGO COMPRADO */}
      {user && verifyPurchase && courseData?.isPremium && (
        <Link to={`/course/${courseData?.id}`}>
          <Card
            p={0}
            bg={"transparent"}
            className="!w-40 !cursor-pointer !overflow-hidden !rounded-sm !shadow-none lg:!w-60  lg:!rounded-b-none lg:!rounded-t-xl"
          >
            <CardBody p={0}>
              <Image
                src={courseData?.imagePath}
                className="!h-24 !w-40 rounded-sm object-cover lg:!h-36 lg:!w-60 lg:rounded-xl"
              />
            </CardBody>
            <CardFooter p={0} mt={2}>
              <span className="text-base !font-medium leading-[18px] text-primary-600 lg:text-normal lg:leading-4">
                {courseData?.name}
              </span>
            </CardFooter>
          </Card>
        </Link>
      )}

      {/* CURSO PAGO COM FORMULARIO E SEM ESTAR COMPRADO */}
      {user && !verifyPurchase && courseData?.needForm && (
        <Card
          p={0}
          bg={"transparent"}
          className="!w-40 cursor-pointer !overflow-hidden !rounded-sm !shadow-none lg:!w-60  lg:!rounded-b-none lg:!rounded-t-xl"
          onClick={() => setOpenFormModal(true)}
        >
          <CardBody p={0}>
            <Image
              src={courseData?.imagePath}
              className="!h-24 !w-40 rounded-sm object-cover lg:!h-36 lg:!w-60 lg:rounded-xl"
            />
          </CardBody>
          <CardFooter p={0} mt={2} className="flex items-start justify-between">
            <span className="text-base !font-medium leading-[18px] text-primary-600 lg:text-normal lg:leading-4">
              {courseData?.name}
            </span>
            <BiLockAlt className="text-primary-600" />
          </CardFooter>
        </Card>
      )}

      {/* CURSO PAGO SEM FORMULARIO E SEM ESTAR COMPRADO */}
      {user &&
        !verifyPurchase &&
        !courseData?.needForm &&
        courseData?.isPremium && (
          <Card
            p={0}
            bg={"transparent"}
            className="!w-40 cursor-pointer !overflow-hidden !rounded-sm !shadow-none lg:!w-60  lg:!rounded-b-none lg:!rounded-t-xl"
            onClick={() => setOpenPremiumModal(true)}
          >
            <CardBody p={0}>
              <Image
                src={courseData?.imagePath}
                className="!h-24 !w-40 rounded-sm object-cover lg:!h-36 lg:!w-60 lg:rounded-xl"
                width={160}
                height={100}
              />
            </CardBody>
            <CardFooter p={0} mt={2} className="flex flex-col">
              <Box className="flex items-start justify-between">
                <Text className="text-small font-medium leading-[18px] text-orange lg:text-base lg:leading-4">
                  {courseData?.price?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
                <BiCartAdd size={20} className="text-primary-600" />
              </Box>
              <Text className="text-base !font-medium leading-[18px] text-primary-600 lg:text-normal lg:leading-4">
                {courseData?.name}
              </Text>
            </CardFooter>
          </Card>
        )}

      {courseData.isPremium && !courseData.formRef && (
        <PremiumCourse
          open={openPremiumModal}
          close={setOpenPremiumModal}
          courseData={courseData}
          closeBtn={true}
        />
      )}

      {courseData.formRef && (
        <FormModal
          open={openFormModal}
          close={setOpenFormModal}
          formId={courseData.formRef}
        />
      )}
    </>
  );
}
