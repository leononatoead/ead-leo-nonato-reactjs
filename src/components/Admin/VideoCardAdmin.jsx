import * as React from 'react';

import { Link } from 'react-router-dom';

import { Card, CardBody, Image } from '@chakra-ui/react';

export default function VideoCardAdmin({ cardData }) {
  return (
    <Link to={`/dashboard/courses/${cardData.id}`}>
      <Card rounded={'2xl'} border={0}>
        <CardBody p={0} rounded={'2xl'} className='!h-[200px] overflow-hidden'>
          <Image
            className='!h-[200px] overflow-hidden object-cover'
            src={cardData.imagePath}
            alt='Presentation Preview'
            rounded={'2xl'}
          />
        </CardBody>
      </Card>
    </Link>
  );
}
