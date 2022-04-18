import React, { useEffect } from 'react';
import { Slider, ResponsiveGrid } from '@alifd/next';
import styles from './index.module.scss';
import store from '@/store';

function Index1() {
  const { Cell } = ResponsiveGrid;
  const [dataImg, dispatchers_img] = store.useModel('img');
  const [dataArticle, dispatchers_article] = store.useModel('article');
  useEffect(() => {
    dispatchers_img.getSliderImg();
    dispatchers_article.getSliderArticle();
  }, []);
  return (
    <ResponsiveGrid>
      <Cell colSpan={8} >
        <Slider dotsDirection="hoz" className={styles.slider} autoplay>
          {
            dataImg.img.map((item, index) => {
              return (
                <div className={styles.img_box} key={index}>
                  <img className={styles.img} src={`data:image/png;base64,${item.Path}`} />
                </div>
              );
            })
          }
        </Slider>
      </Cell>
      <Cell colSpan={4} className={styles.articles}>
        {
          dataArticle.sliderArticle && dataArticle.sliderArticle.map((item, index) => {
            return (
              <div className={styles.article} key={index}>
                <div className={styles.title}>{item.Title}</div>
                <div className={styles.text}>{item.Text}</div>
              </div>
            );
          })
        }

      </Cell>
    </ResponsiveGrid>
  );
}

export default Index1;
