import * as React from 'react';
import { Caption1, Text } from '@fluentui/react-components';
import { Card, CardHeader, CardPreview } from '@fluentui/react-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import lock from '../../../assets/lock.png';

export default function VideoCard({ cardData, setOpenLoginModal }) {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return (
      <Link to={`/course/${cardData.id}`}>
        <Card
          className={
            '!rounded-t-lg !rounded-b-none !shadow-none !pb-[6px] !bg-transparent !gap-[6px]'
          }
        >
          <CardPreview>
            <img
              className={'!w-full !h-[108px] object-cover'}
              src={cardData.imagePath}
              alt='Presentation Preview'
            />
          </CardPreview>

          <CardHeader
            className='!items-start !-ml-2'
            header={<p className='text-[14px] leading-5'>{cardData.name}</p>}
          />
        </Card>
      </Link>
    );
  } else {
    return (
      <Card
        className='w-[400px] max-w-full h-fit'
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
            src={cardData.imagePath}
            alt='Presentation Preview'
            className={'styles.smallRadius'}
          />
        </CardPreview>

        <CardHeader
          header={<Text weight='semibold'>{cardData.name}</Text>}
          description={
            <Caption1 className={'styles.caption'}>{cardData.author}</Caption1>
          }
        />
      </Card>
    );
  }
}
