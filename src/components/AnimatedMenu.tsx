import React, { useCallback, useContext, useState } from 'react'
import { MenuContainer } from './menu.style'
import { CommonProps, MenuItemProps, MenuProps } from './type'
import { animated, config, useSpring } from 'react-spring'
import { MenuContext } from './Context'
function AnimatedMenuItem(
  { label, icon, itemStyle, menuKey, ...props }
    : MenuItemProps & CommonProps & { menuKey: React.Key }) {
  const { activeKeys, setActiveKeys } = useContext(MenuContext)!
  const isActive = !!activeKeys.find(item => item === menuKey)
  const anime = useSpring({
    color: isActive ? '#1890ff' : '#000',
    config: config.gentle
  })

  const clickEvent = useCallback(() => {
    setActiveKeys([menuKey])
  }, [menuKey, setActiveKeys])

  return (
    <animated.div
      onClick={clickEvent}
      {...props}
      style={{ padding: '8px 12px', userSelect: 'none', cursor: 'pointer', ...itemStyle, ...anime }}
    >
      {icon}
      {label}
    </animated.div>
  )
}

function AnimatedMenu({ items, itemStyle, defaultSelectedKeys }: MenuProps & CommonProps) {
  const [activeKeys, setActiveKeys] = useState<React.Key[]>(defaultSelectedKeys || [])
  return (
    <MenuContext.Provider value={{ activeKeys, setActiveKeys }}>
      <MenuContainer>
        {items.map((item) => {
          return <AnimatedMenuItem {...item} itemStyle={itemStyle} menuKey={item.key} />
        })}
      </MenuContainer>
    </MenuContext.Provider>
  )
}

export default AnimatedMenu