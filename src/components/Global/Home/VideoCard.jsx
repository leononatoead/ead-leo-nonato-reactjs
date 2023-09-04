import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardBody, CardFooter, Image } from '@chakra-ui/react';
import PremiumContent from '../PremiumContent';

import { BiLockAlt } from 'react-icons/bi';

export default function VideoCard({ courseData, setOpenLoginModal }) {
  const [openPremiumModal, setOpenPremiumModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {!user && (
        <Card
          p={0}
          bg={'transparent'}
          className='!rounded-sm !overflow-hidden !shadow-none !w-40'
          onClick={() => setOpenLoginModal(true)}
        >
          <CardBody p={0}>
            <Image
              src={courseData.imagePath}
              className='!rounded-sm object-cover'
              width={160}
              height={100}
            />
          </CardBody>
          <CardFooter p={0} mt={2} className='flex justify-between items-start'>
            <span className='text-base text-primary-600 !font-medium leading-[18px]'>
              {courseData.name}
            </span>
            <BiLockAlt className='text-primary-600' />
          </CardFooter>
        </Card>
      )}

      {user && courseData.isFree && (
        <Link to={`/course/${courseData.id}`}>
          <Card
            p={0}
            bg={'transparent'}
            className='!rounded-sm !overflow-hidden !shadow-none !w-40'
          >
            <CardBody p={0}>
              <Image
                src={courseData.imagePath}
                className='!rounded-sm object-cover'
                width={160}
                height={100}
              />
            </CardBody>
            <CardFooter p={0} mt={2}>
              <span className='text-base text-primary-600 !font-medium leading-[18px]'>
                {courseData.name}
              </span>
            </CardFooter>
          </Card>
        </Link>
      )}

      {user && !courseData.isFree && user.isPremium && (
        <Link to={`/course/${courseData.id}`}>
          <Card
            p={0}
            bg={'transparent'}
            className='!rounded-sm !overflow-hidden !shadow-none !w-40'
          >
            <CardBody p={0}>
              <Image
                src={courseData.imagePath}
                className='!rounded-sm object-cover'
                width={160}
                height={100}
              />
            </CardBody>
            <CardFooter p={0} mt={2}>
              <span className='text-base text-primary-600 !font-medium leading-[18px]'>
                {courseData.name}
              </span>
            </CardFooter>
          </Card>
        </Link>
      )}

      {user && !courseData.isFree && !user.isPremium && (
        <Card
          p={0}
          bg={'transparent'}
          className='!rounded-sm !overflow-hidden !shadow-none !w-40'
          onClick={() => setOpenPremiumModal(true)}
        >
          <CardBody p={0}>
            <Image
              src={courseData.imagePath}
              className='!rounded-sm object-cover'
              width={160}
              height={100}
            />
          </CardBody>
          <CardFooter p={0} mt={2} className='flex justify-between items-start'>
            <span className='text-base text-primary-600 !font-medium leading-[18px]'>
              {courseData.name}
            </span>
            <BiLockAlt className='text-primary-600' />
          </CardFooter>
        </Card>
      )}

      <PremiumContent open={openPremiumModal} close={setOpenPremiumModal} />
    </>
  );
}
