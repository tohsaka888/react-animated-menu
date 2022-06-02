import React, { useCallback, useContext, useEffect, useRef, useState, HTMLAttributes } from 'react'
import { MenuContainer } from './menu.style'
import { CommonProps, MenuItemProps, MenuProps } from './type'
import { animated, config as springConfig, useSpring } from 'react-spring'
import { ActiveItemContext, MenuContext } from './Context'
function AnimatedMenuItem(
  { label, icon, itemStyle, menuKey, config, ...props }
    : MenuItemProps & CommonProps & { menuKey: React.Key }) {
  const { activeKeys, setActiveKeys } = useContext(MenuContext)!
  const activeItemRef = useContext(ActiveItemContext)!
  const isActive = !!activeKeys.find(item => item === menuKey)
  const anime = useSpring({
    color: isActive ? '#1890ff' : '#000',
    config: config && springConfig.gentle
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

const AnimatedUnderLine = React.memo(function ({ activeKey, underlineStyle, config }: { activeKey: React.Key } & CommonProps) {
  const activeItemRef = useContext(ActiveItemContext)!
  const [anime, setAnime] = useSpring(() => (
    {
      width: '0px',
      left: 0,
      config: config && springConfig.gentle
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
    <animated.div style={{ position: 'absolute', height: '2px', bottom: '0px', backgroundColor: '#1890ff', ...underlineStyle, ...anime }} />
  )
})



function AnimatedMenu({ items, itemStyle, config, defaultSelectedKeys, underlineStyle, ...props }: MenuProps & CommonProps & HTMLAttributes<HTMLDivElement>) {
  const [activeKeys, setActiveKeys] = useState<React.Key[]>(defaultSelectedKeys || [])
  const activeItemRef = useRef<HTMLDivElement>(null!)
  return (
    <MenuContext.Provider value={{ activeKeys, setActiveKeys }}>
      <ActiveItemContext.Provider value={activeItemRef}>
        <MenuContainer {...props}>
          {items.map((item) => {
            return <AnimatedMenuItem {...item} itemStyle={itemStyle} menuKey={item.key} config={config} />
          })}
          <AnimatedUnderLine activeKey={JSON.stringify(activeKeys)} underlineStyle={underlineStyle} config={config} />
        </MenuContainer>
      </ActiveItemContext.Provider>
    </MenuContext.Provider>
  )
}

export default AnimatedMenu