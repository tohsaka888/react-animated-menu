import React from 'react';
import './App.css';
import AnimatedMenu from './components/AnimatedMenu';
import { MenuItemProps } from './components/type';

const items: MenuItemProps[] = [
  {
    label: 'HomePage',
    key: 'index',
    icon: <div>111</div>,
  },
  {
    label: 'Music',
    key: 'music'
  },
  {
    label: 'News',
    key: 'news'
  }
]

function App() {
  return (
    <>
      <AnimatedMenu items={items} itemStyle={{ padding: '8px 12px' }} defaultSelectedKeys={['news']} />
    </>
  );
}

export default App;
