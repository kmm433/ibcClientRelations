import React from 'react';
import Menu from './Menu.js';
import NoticeBoard from './NoticeBoard';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <NoticeBoard />
      </div>
    );
  }
};

export default Layout;
