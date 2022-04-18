import React, { useEffect } from 'react';
import store from '@/store';
import styles from './index.module.scss';
import { ResponsiveGrid } from '@alifd/next';

function Index2() {
  const { Cell } = ResponsiveGrid;
  const [dataArticle, dispatchers_article] = store.useModel('article');
  useEffect(() => {
    dispatchers_article.getCultureArticle();
  }, []);
  return (
    <ResponsiveGrid>
      <Cell colSpan={2} rowSpan={12} />
      {
        dataArticle.cultureArticle && dataArticle.cultureArticle.map((item, index) => {
          return (
            <Cell className={styles.article} key={index} colSpan={8}>
              <img src={`data:image/png;base64,${item.Img}`} className={styles.img} />
              <div className={styles.right}>
                <div className={styles.title}>{item.Title}</div>
                <div className={styles.text}>{item.Text.replace(/\\n/g, '\n')}</div>
              </div>
            </Cell>
          );
        })
      }
    </ResponsiveGrid>
  );
}

export default Index2;
