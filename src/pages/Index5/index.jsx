import React, { useState } from 'react';
import { ResponsiveGrid, Input, Button, Icon } from '@alifd/next';
import store from '@/store';
import styles from './index.module.scss';

function Index5() {
  const { Cell } = ResponsiveGrid;
  const [dataArticle, dispatchers_article] = store.useModel('article');
  const typeArr = {
    slider: '首页',
    culture: '苗族文化馆',
    travel: '苗寨出行攻略',
    activity: '精彩活动',
    inform: '苗寨信息公告',
  };
  const getResult = () => {
    const search = document.getElementById('search').value;
    if (search) {
      dispatchers_article.getSearchArticle(search).then((res) => {
        console.log(res);
        if (res != false) {
          setStyle({ marginTop: '5vh' });
        } else {
          setStyle({ marginTop: '35vh' });
          setInfo('搜索结果为空');
        }
      });
    }
  };
  const [nowStyle, setStyle] = useState({ marginTop: '35vh' });
  const [info, setInfo] = useState();
  return (
    <ResponsiveGrid>
      <Cell colSpan={2} />
      <Cell colSpan={8} className={styles.container} style={nowStyle}>
        <Input className={styles.input} size="large" placeholder="请输入检索内容" id="search" />
        <Button size="large" onClick={getResult}><Icon type="search" /> 搜索</Button>
        {
          dataArticle.searchArticle && dataArticle.searchArticle.map((item, index) => {
            return (
              <div key={index} className={styles.article}>
                <div>文章位置:&nbsp;&nbsp;{typeArr[item.Type]}</div>
                <div className={styles.title}>{item.Title && item.Title}</div>
                <div className={styles.text}>{item.Text.replace(/\\n/g, '\n\n')}</div>
              </div>
            );
          })
        }
        {
          dataArticle.searchArticle && <div className={styles.info}>{info}</div>
        }
      </Cell>
    </ResponsiveGrid>
  );
}

export default Index5;
