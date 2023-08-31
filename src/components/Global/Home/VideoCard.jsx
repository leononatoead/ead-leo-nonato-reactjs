import * as React from 'react';
import { Card, CardHeader, CardPreview } from '@fluentui/react-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import lock from '../../../assets/lock.png';

export default function VideoCard({ courseData, setOpenLoginModal }) {
  const { user } = useSelector((state) => state.auth);

  console.log(courseData);
  console.log(user);

  return (
    <>
      {user && courseData.isFree && (
        <Link to={`/course/${courseData.id}`}>
          <Card
            className={
              '!rounded-t-lg !rounded-b-none !shadow-none !pb-[6px] !bg-transparent !gap-[6px]'
            }
          >
            <CardPreview>
              <img
                className={'!w-full !h-[108px] object-cover'}
                src={courseData.imagePath}
                alt='Presentation Preview'
              />
            </CardPreview>

            <CardHeader
              className='!items-start !-ml-2'
              header={
                <p className='text-[14px] leading-5'>{courseData.name}</p>
              }
            />
          </Card>
        </Link>
      )}

      {user && !user.isPremium && !courseData.isFree && (
        <Link to={`/`}>
          <Card
            className={
              '!rounded-t-lg !rounded-b-none !shadow-none !pb-[6px] !bg-transparent !gap-[6px]'
            }
          >
            <CardPreview
              logo={
                <img
                  src={lock}
                  alt='locked-content'
                  className='bg-white p-2 rounded-sm'
                />
              }
            >
              <img
                src={courseData.imagePath}
                alt='Presentation Preview'
                className={'!w-full !h-[108px] object-cover'}
              />
            </CardPreview>

            <CardHeader
              className='!items-start !-ml-2'
              header={
                <p className='text-[14px] leading-5'>{courseData.name}</p>
              }
            />
          </Card>
        </Link>
      )}

      {!user && (
        <Card
          className={
            '!rounded-t-lg !rounded-b-none !shadow-none !pb-[6px] !bg-transparent !gap-[6px]'
          }
          onClick={() => setOpenLoginModal(true)}
        >
          <CardPreview
            className={'styles.grayBackground'}
            logo={
              <img
                src={lock}
                alt='locked-content'
                className='bg-white p-2 rounded-sm'
              />
            }
          >
            <img
              src={courseData.imagePath}
              alt='Presentation Preview'
              className={'!w-full !h-[108px] object-cover'}
            />
          </CardPreview>

          <CardHeader
            className='!items-start !-ml-2'
            header={<p className='text-[14px] leading-5'>{courseData.name}</p>}
          />
        </Card>
      )}
    </>
  );
}
