import React, { useEffect, useState } from 'react';
import store from '@/store';
import styles from './index.module.scss';
import { ResponsiveGrid, Button, Message, Input } from '@alifd/next';

function Index2() {
  const { Cell } = ResponsiveGrid;
  const [dataArticle, dispatchers_article] = store.useModel('article');
  const auth = sessionStorage.getItem('auth');
  useEffect(() => {
    dispatchers_article.getCultureArticle();
    setSrc();
  }, []);
  const [img_src, setSrc] = useState();
  const uploadPic = () => {
    const img = document.getElementById('cultureImg').files[0];
    if (img.type !== 'image/jpeg') {
      Message.error('仅支持jpg格式图片');
    } else if (img.size / 1024 > 200) {
      Message.error('文件最大不能超过200M');
    } else {
      const f = new FileReader();
      f.readAsDataURL(img);
      f.onload = () => {
        setSrc(f.result);
      };
    }
  };
  const deleteArticle = (id) => {
    dispatchers_article.deleteArticle(id).then((res) => {
      if (res.code === 100) {
        Message.success(res.msg);
        dispatchers_article.getCultureArticle();
      } else if (res.code === 102) {
        Message.error(res.msg);
        history.push('/');
      } else {
        Message.error(res.msg);
      }
    });
  };
  const addArticle = () => {
    const title = document.getElementById('cultureTitle').value;
    const text = document.getElementById('cultureText').value;
    const img = document.getElementById('cultureImg').files[0];
    if (title && text) {
      dispatchers_article.addArticle({ articleType: 'culture', title, text, img }).then((res) => {
        if (res.code === 100) {
          Message.success(res.msg);
          dispatchers_article.getCultureArticle();
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
        <Cell className={styles.article} colSpan={8}>
          <div className={styles.imgInput} >
            <input type="file" onChange={uploadPic} id="cultureImg" accept="jpg" style={{ width: '100%' }} />
            {
              !img_src && <svg viewBox="0 0 1024 1024" version="1.1" xmlns="https://www.w3.org/2000/svg" p-id="6395" width="200" height="200"><path d="M643.282 991.466H19.537V35.102h987.598v604.02c0 13.893-11.618 25.167-25.989 25.167-14.373 0-25.99-11.274-25.99-25.167V85.437H71.516v855.694h571.767c14.373 0 25.989 11.275 25.989 25.167-0.001 13.892-11.617 25.168-25.99 25.168z" fill="#8a8a8a" p-id="6396" /><path d="M988.474 843.103H682.059c-14.372 0-25.989-11.274-25.989-25.167s11.617-25.167 25.989-25.167h306.415c14.373 0 25.989 11.274 25.989 25.167s-11.643 25.167-25.989 25.167z" fill="#8a8a8a" p-id="6397" /><path d="M835.24 991.466c-14.372 0-25.989-11.275-25.989-25.168V669.574c0-13.893 11.617-25.169 25.989-25.169 14.373 0 25.989 11.276 25.989 25.169v296.724c0 13.892-11.616 25.168-25.989 25.168zM504.277 406.651c0-44.393-38.393-80.461-85.381-79.352-41.831 1.11-77.359 35.514-78.505 76.022-1.719 44.947 35.528 82.681 81.943 82.681 45.27 0 81.943-35.513 81.943-79.351z" fill="#8a8a8a" p-id="6398" /><path d="M856.117 513.192L736.354 355.045c-2.292-3.33-5.73-6.104-9.169-7.769-2.865-1.665-5.73-2.22-6.303-2.22-1.146-0.555-2.865-0.555-6.304-1.11-2.292 0-5.157 0-6.304 0.555-0.573 0-9.741 1.665-16.618 9.434l-237.805 270.24-52.719-81.57c-2.864-4.44-7.449-7.77-8.595-8.325-4.584-2.773-9.169-3.885-9.741-3.885-5.73-1.108-9.742 0-10.887 0-1.147 0-5.158 1.111-10.314 3.885-1.146 0.556-3.438 2.221-5.158 3.885L207.448 685.216c-10.888 11.097-10.888 28.298 0.573 39.396a29.558 29.558 0 0 0 40.685-0.555L372.48 601.979l54.438 83.79c2.292 3.329 5.73 6.658 6.303 6.658 1.147 1.11 4.585 3.329 8.596 4.995 4.584 1.665 12.034 1.665 15.472 1.11 1.146 0 2.292-0.557 3.438-1.11 0.574 0 4.011-1.666 5.73-2.774 1.72-1.11 6.304-4.994 6.877-5.55L711.715 416.64l97.987 129.849c9.168 12.207 27.506 14.981 40.112 6.104 12.606-9.435 15.473-26.637 6.303-39.401z" fill="#8a8a8a" p-id="6399" /></svg>
            }
            {
              img_src && <img src={img_src} className={styles.imgIn} />
            }
          </div>
          <div className={styles.rightInput}>
            <Input className={styles.titleInput} size="large" placeholder="请输入文章标题" id="cultureTitle" />
            <Input.TextArea className={styles.textInput} size="large" placeholder="请输入文章内容" id="cultureText" />
            <div className={styles.delete}><Button type="secondary" onClick={addArticle}>添加文章</Button></div>
          </div>
        </Cell>
      }
      {
        dataArticle.cultureArticle && dataArticle.cultureArticle.map((item, index) => {
          return (
            <Cell className={styles.article} key={index} colSpan={8}>
              <img src={`data:image/png;base64,${item.Img}`} className={styles.img} />
              <div className={styles.right}>
                <div className={styles.title}>{item.Title}</div>
                <div className={styles.text}>{item.Text.replace(/\\n/g, '\n\n')}</div>
                {auth === 'admin' && <div className={styles.delete}><Button type="normal" warning onClick={() => deleteArticle(item.Id)}>删除文章</Button></div>}
              </div>
            </Cell>
          );
        })
      }
    </ResponsiveGrid>
  );
}

export default Index2;
