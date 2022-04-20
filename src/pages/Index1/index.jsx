import React, { useEffect } from 'react';
import { Slider, ResponsiveGrid, Button, Input, Message } from '@alifd/next';
import styles from './index.module.scss';
import store from '@/store';
import { useHistory } from 'ice';

function Index1() {
  const { Cell } = ResponsiveGrid;
  const [dataImg, dispatchers_img] = store.useModel('img');
  const [dataArticle, dispatchers_article] = store.useModel('article');
  const auth = sessionStorage.getItem('auth');
  const history = useHistory();
  useEffect(() => {
    dispatchers_img.getSliderImg();
    dispatchers_article.getSliderArticle();
  }, []);
  const addArticle = () => {
    const title = document.getElementById('title').value;
    const text = document.getElementById('text').value;
    if (title && text) {
      dispatchers_article.addArticle({ articleType: 'slider', title, text }).then((res) => {
        if (res.code === 100) {
          Message.success(res.msg);
          dispatchers_article.getSliderArticle();
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
  const deleteArticle = (id) => {
    dispatchers_article.deleteArticle(id).then((res) => {
      if (res.code === 100) {
        Message.success(res.msg);
        dispatchers_article.getSliderArticle();
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
      <Cell colSpan={8} >
        <Slider dotsDirection="hoz" className={styles.slider} autoplay >
          {
            dataImg && dataImg.img.map((item, index) => {
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
                {auth === 'admin' && <div className={styles.delete}><Button type="normal" warning onClick={() => deleteArticle(item.Id)}>删除文章</Button></div>}
              </div>
            );
          })
        }
        {
        auth === 'admin' &&
        <div style={{ textAlign: 'right' }}>
          <Input placeholder="请输入标题" className={styles.input} id="title" />
          <Input.TextArea placeholder="请输入内容" className={styles.input} id="text" />
          <Button type="secondary" onClick={addArticle}>添加内容</Button>
        </div>
      }
      </Cell>
    </ResponsiveGrid>
  );
}

export default Index1;
