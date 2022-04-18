import React from 'react';
import { Tab } from '@alifd/next';
import Index1 from '../Index1';
import Index2 from '../Index2';
import Index4 from '../Index4';

const tabConfig = [
  { title: '首页', key: 1, children: <Index1 /> },
  { title: '苗家文化馆', key: 2, children: <Index2 /> },
  { title: '论坛角', key: 3, children: '' },
  { title: '非遗申报指南', key: 4, children: <Index4 /> },
  { title: '检索查询', key: 5, children: '' },
  { title: '苗寨出行攻略', key: 6, children: '' },
  { title: '精彩活动', key: 7, children: '' },
  { title: '苗寨信息公告', key: 8, children: '' },
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
