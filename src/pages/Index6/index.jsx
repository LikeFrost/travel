import React, { useEffect } from 'react';
import store from '@/store';
import styles from './index.module.scss';
import { ResponsiveGrid } from '@alifd/next';

function Index6() {
  const { Cell } = ResponsiveGrid;
  const [dataArticle, dispatchers_article] = store.useModel('article');
  useEffect(() => {
    dispatchers_article.getTravelArticle();
  }, []);
  return (
    <ResponsiveGrid>
      <Cell colSpan={2} rowSpan={100} />
      {
        dataArticle.travelArticle && dataArticle.travelArticle.map((item, index) => {
          return (
            <Cell className={styles.article} key={index} colSpan={4}>
              <div className={styles.title}>{item.Title}</div>
              <div className={styles.text}>{item.Text.replace(/\\n/g, '\n\n')}</div>
            </Cell>
          );
        })
      }
    </ResponsiveGrid>
  );
}

export default Index6;
