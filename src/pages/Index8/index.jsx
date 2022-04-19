import React, { useEffect } from 'react';
import store from '@/store';
import styles from './index.module.scss';
import { ResponsiveGrid } from '@alifd/next';

function Index8() {
  const { Cell } = ResponsiveGrid;
  const [dataArticle, dispatchers_article] = store.useModel('article');
  useEffect(() => {
    dispatchers_article.getInformArticle();
  }, []);
  return (
    <ResponsiveGrid>
      <Cell colSpan={12}>
        <div className={styles.title}>通知公告</div>
      </Cell>
      <Cell colSpan={2} rowSpan={100} />
      {
        dataArticle.informArticle && dataArticle.informArticle.map((item, index) => {
          return (
            <Cell className={styles.article} key={index} colSpan={8}>
              <div className={styles.text}>{item.Text.replace(/\\n/g, '\n\n')}</div>
            </Cell>
          );
        })
      }
    </ResponsiveGrid>
  );
}

export default Index8;
