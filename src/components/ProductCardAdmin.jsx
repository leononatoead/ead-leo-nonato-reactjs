import * as React from 'react';
import {
  makeStyles,
  shorthands,
  Caption1,
  tokens,
  Text
} from '@fluentui/react-components';
import { Card, CardHeader, CardPreview } from '@fluentui/react-components';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  main: {
    ...shorthands.gap('16px'),
    display: 'flex',
    flexWrap: 'wrap'
  },

  caption: {
    color: tokens.colorNeutralForeground3
  },

  smallRadius: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    maxHeight: '200px',
    objectFit: 'cover'
  },

  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3
  },

  logoBadge: {
    ...shorthands.padding('5px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    backgroundColor: '#FFF',
    boxShadow:
      '0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)'
  }
});

export default function ProductCardAdmin({ cardData }) {
  const styles = useStyles();

  return (
    <Link to={`/courses/${cardData.id}`}>
      <Card className={styles.card}>
        <CardPreview className={styles.grayBackground}>
          <img
            className={styles.smallRadius}
            src={cardData.imagePath}
            alt='Presentation Preview'
          />
        </CardPreview>

        <CardHeader
          header={<Text weight='semibold'>{cardData.name}</Text>}
          description={
            <Caption1 className={styles.caption}>{cardData.author}</Caption1>
          }
        />
      </Card>
    </Link>
  );
}
