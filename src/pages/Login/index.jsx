import React from 'react';
import { ResponsiveGrid, Tab, Input, Button, Message } from '@alifd/next';
import store from '@/store';
import { useHistory } from 'ice';
import styles from './index.module.scss';

function Login() {
  const { Cell } = ResponsiveGrid;
  const [, dispatcher_user] = store.useModel('user');
  const history = useHistory();
  const login = () => {
    const loginId = document.getElementById('loginId').value;
    const loginPassword = document.getElementById('loginPassword').value;
    dispatcher_user.login({ id: loginId, password: loginPassword }).then((res) => {
      if (res.code === 100) {
        if (loginId === 'admin') {
          sessionStorage.setItem('auth', 'admin');
        } else {
          sessionStorage.setItem('auth', 'user');
        }
        Message.success(res.msg);
        setTimeout(() => {
          history.push('/home');
        }, 1000);
      } else {
        Message.error(res.msg);
      }
    });
  };
  const logUp = () => {
    const logUpId = document.getElementById('logUpId').value;
    const logUpPassword1 = document.getElementById('logUpPassword1').value;
    const logUpPassword2 = document.getElementById('logUpPassword2').value;
    if (logUpPassword1 !== logUpPassword2) {
      Message.error('两次密码不一致,请检查后重试');
    } else {
      dispatcher_user.logUp({ id: logUpId, password: logUpPassword1 }).then((res) => {
        if (res.code === 100) {
          if (logUpId === 'admin') {
            sessionStorage.setItem('auth', 'admin');
          } else {
            sessionStorage.setItem('auth', 'user');
          }
          Message.success(res.msg);
          setTimeout(() => {
            history.push('/home');
          }, 1000);
        } else {
          Message.error(res.msg);
        }
      });
    }
  };
  return (
    <ResponsiveGrid>
      <Cell colSpan={4} />
      <Cell colSpan={4} className={styles.cell}>
        <div className={styles.container}>
          <Tab>
            <Tab.Item title="登录">
              <div className={styles.item}>用户名:&nbsp;&nbsp;<Input placeholder="请输入用户名" id="loginId" /></div>
              <div className={styles.item}>&nbsp;&nbsp;&nbsp;&nbsp;密码:&nbsp;&nbsp;<Input.Password placeholder="请输入密码" id="loginPassword" /></div>
              <div className={styles.item}><Button type="secondary" onClick={login}>登录</Button></div>
            </Tab.Item>
            <Tab.Item title="注册">
              <div className={styles.item}>&nbsp;&nbsp;&nbsp;&nbsp;用户名:&nbsp;&nbsp;<Input placeholder="请输入用户名" id="logUpId" /></div>
              <div className={styles.item}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码:&nbsp;&nbsp;<Input.Password placeholder="请输入密码" id="logUpPassword1" /></div>
              <div className={styles.item}>确认密码:&nbsp;&nbsp;<Input.Password placeholder="请确认密码" id="logUpPassword2" type="password" /></div>
              <div className={styles.item}><Button type="secondary" onClick={logUp}>注册</Button></div>
            </Tab.Item>
          </Tab>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default Login;
