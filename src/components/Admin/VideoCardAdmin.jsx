import * as React from 'react';

import { Link } from 'react-router-dom';

import { Card, CardBody, Image } from '@chakra-ui/react';

export default function VideoCardAdmin({ cardData }) {
  return (
    <Link to={`/dashboard/courses/${cardData.id}`}>
      <>
        <Card className=''>
          <CardBody className=''>
            <Image
              className=''
              src={cardData.imagePath}
              alt='Presentation Preview'
            />
          </CardBody>
        </Card>
      </>
    </Link>
  );
}
