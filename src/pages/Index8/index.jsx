import React, { useEffect } from 'react';
import store from '@/store';
import styles from './index.module.scss';
import { ResponsiveGrid, Message, Button, Input } from '@alifd/next';

function Index8() {
  const { Cell } = ResponsiveGrid;
  const [dataArticle, dispatchers_article] = store.useModel('article');
  const auth = sessionStorage.getItem('auth');
  useEffect(() => {
    dispatchers_article.getInformArticle();
  }, []);
  const addArticle = () => {
    const text = document.getElementById('informText').value;
    if (text) {
      dispatchers_article.addArticle({ articleType: 'inform', text }).then((res) => {
        if (res.code === 100) {
          Message.success(res.msg);
          dispatchers_article.getInformArticle();
        } else if (res.code === 102) {
          Message.error(res.msg);
          history.push('/');
        } else {
          Message.error(res.msg);
        }
      });
    } else {
      Message.error('内容不能为空');
    }
  };
  const deleteArticle = (id) => {
    dispatchers_article.deleteArticle(id).then((res) => {
      if (res.code === 100) {
        Message.success(res.msg);
        dispatchers_article.getInformArticle();
      } else if (res.code === 102) {
        Message.error(res.msg);
        history.push('/');
      } else {
        Message.error(res.msg);
      }
    });
  };
  return (
    <ResponsiveGrid>
      <Cell colSpan={12}>
        <div className={styles.title}>通知公告</div>
      </Cell>
      <Cell colSpan={2} rowSpan={100} />
      {
        auth === 'admin' &&
        <Cell colSpan={8} className={styles.article} style={{ textAlign: 'right' }}>
          <Input.TextArea placeholder="请输入公告内容" id="informText" className={styles.input} />
          <Button type="secondary" onClick={addArticle}>添加公告</Button>
        </Cell>
      }
      {
        dataArticle.informArticle && dataArticle.informArticle.map((item, index) => {
          return (
            <Cell className={styles.article} key={index} colSpan={8}>
              <div className={styles.text}>{item.Text.replace(/\\n/g, '\n\n')}</div>
              {auth === 'admin' && <div className={styles.delete}><Button type="normal" warning onClick={() => deleteArticle(item.Id)}>删除公告</Button></div>}
            </Cell>
          );
        })
      }
    </ResponsiveGrid>
  );
}

export default Index8;
