import React from 'react';
import { Tab } from '@alifd/next';
import Index1 from '../Index1';
import Index2 from '../Index2';
import Index3 from '../Index3';
import Index4 from '../Index4';
import Index5 from '../Index5';
import Index6 from '../Index6';
import Index7 from '../Index7';
import Index8 from '../Index8';

const tabConfig = [
  { title: '首页', key: 1, children: <Index1 /> },
  { title: '苗家文化馆', key: 2, children: <Index2 /> },
  { title: '论坛角', key: 3, children: <Index3 /> },
  { title: '非遗申报指南', key: 4, children: <Index4 /> },
  { title: '检索查询', key: 5, children: <Index5 /> },
  { title: '苗寨出行攻略', key: 6, children: <Index6 /> },
  { title: '精彩活动', key: 7, children: <Index7 /> },
  { title: '苗寨信息公告', key: 8, children: <Index8 /> },
];
function Home() {
  return (
    <div>
      <Tab navStyle={{ backgroundColor: '#e3e8ee' }}>
        {tabConfig.map((item) => {
          return (
            <Tab.Item title={item.title} key={item.key}>
              {item.children}
            </Tab.Item>
          );
        })}
      </Tab>
    </div>
  );
}

export default Home;
