import React, { useEffect } from 'react';
import store from '@/store';
import styles from './index.module.scss';
import { ResponsiveGrid, Message, Button, Input } from '@alifd/next';

function Index6() {
  const { Cell } = ResponsiveGrid;
  const [dataArticle, dispatchers_article] = store.useModel('article');
  const auth = sessionStorage.getItem('auth');
  useEffect(() => {
    dispatchers_article.getTravelArticle();
  }, []);
  const deleteArticle = (id) => {
    dispatchers_article.deleteArticle(id).then((res) => {
      if (res.code === 100) {
        Message.success(res.msg);
        dispatchers_article.getTravelArticle();
      } else if (res.code === 102) {
        Message.error(res.msg);
        history.push('/');
      } else {
        Message.error(res.msg);
      }
    });
  };
  const addArticle = () => {
    const title = document.getElementById('travelTitle').value;
    const text = document.getElementById('travelText').value;
    if (title && text) {
      dispatchers_article.addArticle({ articleType: 'travel', title, text }).then((res) => {
        if (res.code === 100) {
          Message.success(res.msg);
          dispatchers_article.getTravelArticle();
        } else if (res.code === 102) {
          Message.error(res.msg);
          history.push('/');
        } else {
          Message.error(res.msg);
        }
      });
    } else {
      Message.error('标题和内容不能为空');
    }
  };
  return (
    <ResponsiveGrid>
      <Cell colSpan={2} rowSpan={100} />
      {
        auth === 'admin' &&
        <Cell colSpan={4} className={styles.article} style={{ textAlign: 'right' }}>
          <Input className={styles.titleInput} id="travelTitle" />
          <Input.TextArea className={styles.textInput} id="travelText" />
          <Button type="secondary" onClick={addArticle}>添加文章</Button>
        </Cell>
      }
      {
        dataArticle.travelArticle && dataArticle.travelArticle.map((item, index) => {
          return (
            <Cell className={styles.article} key={index} colSpan={4}>
              {auth === 'admin' && <div className={styles.delete}><Button type="normal" warning onClick={() => deleteArticle(item.Id)}>删除文章</Button></div>}
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
