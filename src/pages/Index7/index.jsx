import React, { useEffect, useState } from 'react';
import store from '@/store';
import styles from './index.module.scss';
import { ResponsiveGrid, Button, Message, Input } from '@alifd/next';

function Index7() {
  const { Cell } = ResponsiveGrid;
  const [dataArticle, dispatchers_article] = store.useModel('article');
  const auth = sessionStorage.getItem('auth');
  useEffect(() => {
    dispatchers_article.getActivityArticle();
    setSrc();
  }, []);
  const deleteArticle = (id) => {
    dispatchers_article.deleteArticle(id).then((res) => {
      if (res.code === 100) {
        Message.success(res.msg);
        dispatchers_article.getActivityArticle();
      } else if (res.code === 102) {
        Message.error(res.msg);
        history.push('/');
      } else {
        Message.error(res.msg);
      }
    });
  };
  const addArticle = () => {
    const title = document.getElementById('activityTitle').value;
    const text = document.getElementById('activityText').value;
    const time = document.getElementById('activityTime').value;
    const location = document.getElementById('activityLocation').value;
    const img = document.getElementById('activityImg').files[0];
    if (title && time && location) {
      dispatchers_article.addArticle({ articleType: 'activity', title, text, time, location, img }).then((res) => {
        if (res.code === 100) {
          Message.success(res.msg);
          dispatchers_article.getActivityArticle();
        } else if (res.code === 102) {
          Message.error(res.msg);
          history.push('/');
        } else {
          Message.error(res.msg);
        }
      });
    } else {
      Message.error('标题、时间、地点不能为空');
    }
  };
  const [img_src, setSrc] = useState();
  const uploadPic = () => {
    const img = document.getElementById('activityImg').files[0];
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
  return (
    <ResponsiveGrid>
      <Cell colSpan={2} rowSpan={100} />
      {
        auth === 'admin' &&
        <Cell colSpan={4} className={styles.article} style={{ textAlign: 'right' }}>
          <Input className={styles.titleInput} placeholder="请输入活动标题" id="activityTitle" />
          <input type="file" onChange={uploadPic} id="activityImg" accept="jpg" />
          <div className={styles.imgInput}>
            {
            !img_src && <svg viewBox="0 0 1024 1024" version="1.1" xmlns="https://www.w3.org/2000/svg" p-id="6395" width="150" height="150"><path d="M643.282 991.466H19.537V35.102h987.598v604.02c0 13.893-11.618 25.167-25.989 25.167-14.373 0-25.99-11.274-25.99-25.167V85.437H71.516v855.694h571.767c14.373 0 25.989 11.275 25.989 25.167-0.001 13.892-11.617 25.168-25.99 25.168z" fill="#8a8a8a" p-id="6396" /><path d="M988.474 843.103H682.059c-14.372 0-25.989-11.274-25.989-25.167s11.617-25.167 25.989-25.167h306.415c14.373 0 25.989 11.274 25.989 25.167s-11.643 25.167-25.989 25.167z" fill="#8a8a8a" p-id="6397" /><path d="M835.24 991.466c-14.372 0-25.989-11.275-25.989-25.168V669.574c0-13.893 11.617-25.169 25.989-25.169 14.373 0 25.989 11.276 25.989 25.169v296.724c0 13.892-11.616 25.168-25.989 25.168zM504.277 406.651c0-44.393-38.393-80.461-85.381-79.352-41.831 1.11-77.359 35.514-78.505 76.022-1.719 44.947 35.528 82.681 81.943 82.681 45.27 0 81.943-35.513 81.943-79.351z" fill="#8a8a8a" p-id="6398" /><path d="M856.117 513.192L736.354 355.045c-2.292-3.33-5.73-6.104-9.169-7.769-2.865-1.665-5.73-2.22-6.303-2.22-1.146-0.555-2.865-0.555-6.304-1.11-2.292 0-5.157 0-6.304 0.555-0.573 0-9.741 1.665-16.618 9.434l-237.805 270.24-52.719-81.57c-2.864-4.44-7.449-7.77-8.595-8.325-4.584-2.773-9.169-3.885-9.741-3.885-5.73-1.108-9.742 0-10.887 0-1.147 0-5.158 1.111-10.314 3.885-1.146 0.556-3.438 2.221-5.158 3.885L207.448 685.216c-10.888 11.097-10.888 28.298 0.573 39.396a29.558 29.558 0 0 0 40.685-0.555L372.48 601.979l54.438 83.79c2.292 3.329 5.73 6.658 6.303 6.658 1.147 1.11 4.585 3.329 8.596 4.995 4.584 1.665 12.034 1.665 15.472 1.11 1.146 0 2.292-0.557 3.438-1.11 0.574 0 4.011-1.666 5.73-2.774 1.72-1.11 6.304-4.994 6.877-5.55L711.715 416.64l97.987 129.849c9.168 12.207 27.506 14.981 40.112 6.104 12.606-9.435 15.473-26.637 6.303-39.401z" fill="#8a8a8a" p-id="6399" /></svg>
            }
            {
              img_src && <img src={img_src} className={styles.img} />
            }
          </div>
          <Input.TextArea className={styles.textInput} placeholder="请输入活动描述" id="activityText" />
          <Input className={styles.timeInput} placeholder="请输入活动时间" id="activityTime" />
          <Input className={styles.locationInput} placeholder="请输入活动内容" id="activityLocation" />
          <Button type="secondary" onClick={addArticle}>添加活动</Button>
        </Cell>
      }
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
              {auth === 'admin' && <div className={styles.delete}><Button type="normal" warning onClick={() => deleteArticle(item.Id)}>删除活动</Button></div>}
            </Cell>
          );
        })
      }
    </ResponsiveGrid>
  );
}

export default Index7;
