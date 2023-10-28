import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PremiumCourse from "../../../components/PremiumCourse";
import { Box, Card, CardBody, CardFooter, Image, Text } from "@chakra-ui/react";
import { BiCartAdd, BiLockAlt } from "react-icons/bi";

export default function VideoCard({ courseData, setOpenLoginModal }) {
  const [openPremiumModal, setOpenPremiumModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {!user && !courseData?.isPremium && (
        <Card
          p={0}
          bg={"transparent"}
          className="!w-40 !overflow-hidden !rounded-sm !shadow-none"
          onClick={() => setOpenLoginModal(true)}
        >
          <CardBody p={0}>
            <Image
              src={courseData?.imagePath}
              className="!rounded-sm object-cover"
              width={160}
              height={100}
            />
          </CardBody>
          <CardFooter p={0} mt={2} className="flex items-start justify-between">
            <span className="text-base !font-medium leading-[18px] text-primary-600">
              {courseData?.name}
            </span>
            <BiLockAlt className="text-primary-600" />
          </CardFooter>
        </Card>
      )}

      {user && !courseData?.isPremium && (
        <Link to={`/course/${courseData?.id}`}>
          <Card
            p={0}
            bg={"transparent"}
            className="!w-40 !overflow-hidden !rounded-sm !shadow-none"
          >
            <CardBody p={0}>
              <Image
                src={courseData?.imagePath}
                className="!rounded-sm object-cover"
                width={160}
                height={100}
              />
            </CardBody>
            <CardFooter p={0} mt={2}>
              <span className="text-base !font-medium leading-[18px] text-primary-600">
                {courseData?.name}
              </span>
            </CardFooter>
          </Card>
        </Link>
      )}

      {user && user.isPremium && courseData?.isPremium && (
        <Link to={`/course/${courseData?.id}`}>
          <Card
            p={0}
            bg={"transparent"}
            className="!w-40 !overflow-hidden !rounded-sm !shadow-none"
          >
            <CardBody p={0}>
              <Image
                src={courseData?.imagePath}
                className="!rounded-sm object-cover"
                width={160}
                height={100}
              />
            </CardBody>
            <CardFooter p={0} mt={2}>
              <span className="text-base !font-medium leading-[18px] text-primary-600">
                {courseData?.name}
              </span>
            </CardFooter>
          </Card>
        </Link>
      )}

      {user && !user.isPremium && courseData?.isPremium && (
        <Card
          p={0}
          bg={"transparent"}
          className="!w-40 !overflow-hidden !rounded-sm !shadow-none"
          onClick={() => setOpenPremiumModal(true)}
        >
          <CardBody p={0}>
            <Image
              src={courseData?.imagePath}
              className="!rounded-sm object-cover"
              width={160}
              height={100}
            />
          </CardBody>
          <CardFooter p={0} mt={2} className="flex flex-col">
            <Box className="flex items-start justify-between">
              <Text className="text-small font-medium leading-[18px] text-orange">
                {courseData?.price?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
              <BiCartAdd size={20} className="text-primary-600" />
            </Box>
            <Text className="text-base !font-medium leading-[18px] text-primary-600">
              {courseData?.name}
            </Text>
          </CardFooter>
        </Card>
      )}

      {!user && courseData?.isPremium && (
        <Card
          p={0}
          bg={"transparent"}
          className="!w-40 !overflow-hidden !rounded-sm !shadow-none"
          onClick={() => setOpenPremiumModal(true)}
        >
          <CardBody p={0}>
            <Image
              src={courseData?.imagePath}
              className="!rounded-sm object-cover"
              width={160}
              height={100}
            />
          </CardBody>
          <CardFooter p={0} mt={2} className="flex flex-col">
            <Box className="flex items-start justify-between">
              <Text className="text-small font-medium leading-[18px] text-orange">
                {courseData?.price?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
              <BiCartAdd size={20} className="text-primary-600" />
            </Box>
            <Text className="text-base !font-medium leading-[18px] text-primary-600">
              {courseData?.name}
            </Text>
          </CardFooter>
        </Card>
      )}

      <PremiumCourse
        open={openPremiumModal}
        close={setOpenPremiumModal}
        courseData={courseData}
        closeBtn={true}
      />
    </>
  );
}
