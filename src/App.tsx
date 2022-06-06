import React from 'react';
import { config } from 'react-spring';
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
      <AnimatedMenu
        items={items}
        itemStyle={{ padding: '8px 16px' }}
        defaultSelectedKeys={['news']}
        style={{ height: '60px' }}
        underlineStyle={{ height: '2px' }}
        config={config.gentle}
        color={"red"}
      />
    </>
  );
}

export default App;
