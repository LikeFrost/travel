import React, { useEffect } from 'react';
import store from '@/store';
import styles from './index.module.scss';
import { ResponsiveGrid } from '@alifd/next';

function Index7() {
  const { Cell } = ResponsiveGrid;
  const [dataArticle, dispatchers_article] = store.useModel('article');
  useEffect(() => {
    dispatchers_article.getActivityArticle();
  }, []);
  return (
    <ResponsiveGrid>
      <Cell colSpan={2} rowSpan={100} />
      {
        dataArticle.activityArticle && dataArticle.activityArticle.map((item, index) => {
          return (
            <Cell className={styles.article} key={index} colSpan={4}>
              <div className={styles.title}>{item.Title}</div>
              {item.Img && <img src={`data:image/png;base64,${item.Img}`} className={styles.img} />}
              <div className={styles.text}>{item.Text.replace(/\\n/g, '\n')}</div>
              <div className={styles.time}>
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="https://www.w3.org/2000/svg" p-id="4878" width="16" height="16"><path d="M325.6 801.8h101.3c9.3 0 16.9 7.4 16.9 16.5s-7.6 16.5-16.9 16.5H325.6c-9.3 0-16.9-7.4-16.9-16.5s7.6-16.5 16.9-16.5z" fill="#80F688" p-id="4879" /><path d="M615.6 801.8h112.3c9.3 0 16.8 7.4 16.8 16.5s-7.5 16.5-16.8 16.5H615.6c-9.3 0-16.8-7.4-16.8-16.5s7.5-16.5 16.8-16.5z" fill="#F1F2F2" p-id="4880" /><path d="M413.7 412.4V729h-87.5V521.5c-14.2 10.8-27.9 19.5-41.1 26.1-13.2 6.7-29.8 13-49.8 19.1v-70.9c29.4-9.5 52.3-20.9 68.6-34.2 16.3-13.3 29-29.7 38.2-49.3h71.6v0.1zM507.7 572c0-59.2 10.6-100.6 32-124.2 21.3-23.6 53.8-35.5 97.4-35.5 20.9 0 38.1 2.6 51.6 7.8 13.4 5.2 24.4 11.9 32.9 20.2s15.2 17 20.1 26.1c4.9 9.1 8.8 19.8 11.8 32 5.8 23.2 8.7 47.4 8.7 72.6 0 56.5-9.6 97.8-28.7 124-19.1 26.2-52 39.3-98.7 39.3-26.2 0-47.3-4.2-63.5-12.5-16.1-8.4-29.4-20.6-39.7-36.7-7.5-11.5-13.3-27.1-17.5-47-4.3-20-6.4-42-6.4-66.1z m85.8 0.2c0 39.6 3.5 66.7 10.5 81.2s17.2 21.8 30.5 21.8c8.8 0 16.4-3.1 22.8-9.2 6.4-6.2 11.2-15.9 14.2-29.2s4.6-34 4.6-62.2c0-41.3-3.5-69.1-10.5-83.3S648.1 470 634.1 470c-14.3 0-24.6 7.3-31 21.8-6.4 14.4-9.6 41.2-9.6 80.4z" fill="#55FDC3" p-id="4881" /><path d="M912.4 296v-50.2c0-66.7-54.1-120.8-120.8-120.8H248.3c-66.7 0-120.8 54.1-120.8 120.8v89.3h0.2V799c0 61.2 49.8 111 111 111h563.7c61.2 0 111-49.8 111-111V296h-1zM802.5 874H238.7c-41.4 0-75-33.7-75-75V335.1h713.8V799c0 41.3-33.7 75-75 75z" fill="#00D8FF" p-id="4882" /><path d="M320.7 88.8h6.4c19.8 0 35.8 16.2 35.8 36.2v59.5c0 20-16 36.2-35.8 36.2h-6.4c-19.8 0-35.8-16.2-35.8-36.2V125c0-20 16-36.2 35.8-36.2z" fill="#00A5FF" p-id="4883" /><path d="M514 88.8h6.4c19.8 0 35.8 16.2 35.8 36.2v59.5c0 20-16 36.2-35.8 36.2H514c-19.8 0-35.8-16.2-35.8-36.2V125c-0.1-20 16-36.2 35.8-36.2z" fill="#80F688" p-id="4884" /><path d="M707.2 88.8h6.4c19.8 0 35.8 16.2 35.8 36.2v59.5c0 20-16 36.2-35.8 36.2h-6.4c-19.8 0-35.8-16.2-35.8-36.2V125c0-20 16-36.2 35.8-36.2z" fill="#00A5FF" p-id="4885" /></svg>
                &nbsp;&nbsp;时间:&nbsp;&nbsp;{item.Time.replace(/\\n/g, '\n')}
              </div>
              <div className={styles.location}>
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="https://www.w3.org/2000/svg" p-id="3933" width="16" height="16"><path d="M890.4 959.6H132.9l102.6-185.7h552.3z" fill="#E5ECFF" p-id="3934" /><path d="M787.5 599.9c42.2-56 67.2-125.7 67.2-201.3 0-185-150-335-335-335s-335 150-335 335c0 75.6 25 145.3 67.2 201.3l-0.5 0.5 4.2 4.2c16.9 21.6 36.4 41.1 58 58L501 870.8l18.7-2.1 206-206c21.6-16.9 41.1-36.4 58-58l4.2-4.2-0.4-0.6z" fill="#A4BEFF" p-id="3935" /><path d="M763.3 599.9c42.2-56 67.2-125.7 67.2-201.3 0-185-150-335-335-335s-335 150-335 335c0 75.6 25 145.3 67.2 201.3l-0.5 0.5 4.2 4.2c16.9 21.6 36.4 41.1 58 58l206 206 206-206c21.6-16.9 41.1-36.4 58-58l4.2-4.2-0.3-0.5z" fill="#5B79FB" p-id="3936" /><path d="M503.6 366.3m-92.8 0a92.8 92.8 0 1 0 185.6 0 92.8 92.8 0 1 0-185.6 0Z" fill="#FFFFFF" p-id="3937" /><path d="M778.1 928.3H245.3l16.1-34.3h500.5z" fill="#FF7E71" p-id="3938" /></svg>
                &nbsp;&nbsp;地点:&nbsp;&nbsp;{item.Location}
              </div>
            </Cell>
          );
        })
      }
    </ResponsiveGrid>
  );
}

export default Index7;