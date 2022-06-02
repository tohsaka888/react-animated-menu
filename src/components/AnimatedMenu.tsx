import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { MenuContainer } from './menu.style'
import { CommonProps, MenuItemProps, MenuProps } from './type'
import { animated, config, useSpring } from 'react-spring'
import { ActiveItemContext, MenuContext } from './Context'
function AnimatedMenuItem(
  { label, icon, itemStyle, menuKey, ...props }
    : MenuItemProps & CommonProps & { menuKey: React.Key }) {
  const { activeKeys, setActiveKeys } = useContext(MenuContext)!
  const activeItemRef = useContext(ActiveItemContext)!
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
      style={{
        padding: '8px 12px',
        userSelect: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...itemStyle,
        ...anime
      }}
      ref={isActive ? activeItemRef : null}
    >
      {icon && <div style={{ marginRight: '8px' }}>{icon}</div>}
      {label}
    </animated.div>
  )
}

const AnimatedUnderLine = React.memo(function ({ activeKey }: { activeKey: React.Key }) {
  const activeItemRef = useContext(ActiveItemContext)!
  const [anime, setAnime] = useSpring(() => (
    {
      width: '0px',
      left: 0,
      config: config.gentle
    }
  ), [])

  useEffect(() => {
    if (activeItemRef) {
      setAnime.start({
        width: activeItemRef.current.offsetWidth + 'px',
        left: activeItemRef.current.offsetLeft,
      })
    }
  }, [activeItemRef, setAnime, activeKey])

  return (
    <animated.div style={{ position: 'absolute', height: '2px', bottom: '0px', backgroundColor: '#1890ff', ...anime }} />
  )
})



function AnimatedMenu({ items, itemStyle, defaultSelectedKeys }: MenuProps & CommonProps) {
  const [activeKeys, setActiveKeys] = useState<React.Key[]>(defaultSelectedKeys || [])
  const activeItemRef = useRef<HTMLDivElement>(null!)
  return (
    <MenuContext.Provider value={{ activeKeys, setActiveKeys }}>
      <ActiveItemContext.Provider value={activeItemRef}>
        <MenuContainer>
          {items.map((item) => {
            return <AnimatedMenuItem {...item} itemStyle={itemStyle} menuKey={item.key} />
          })}
          <AnimatedUnderLine activeKey={JSON.stringify(activeKeys)} />
        </MenuContainer>
      </ActiveItemContext.Provider>
    </MenuContext.Provider>
  )
}

export default AnimatedMenu