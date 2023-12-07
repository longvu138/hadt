import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout, Menu } from "antd"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import { menuItems } from "@config/sidebar"
import { useCurrentRoute } from "@hook/useCurrentRoute"
import logo from "@assets/img/logo.png"
import minilogo from "@assets/img/vela64.png"
import { omit } from "lodash"
import { slidebarCss } from "@component/Layout/Sidebar/style"
const { Sider } = Layout

interface Props {
  collapsed: boolean
  onCollapsed: (val: boolean) => void
}

export const SideBar: React.FC<Props> = ({ collapsed, onCollapsed }) => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([])
  const { xs, md } = useBreakpoint()
  const currentRoute = useCurrentRoute()
  const navigate = useNavigate()
  const [isHover, setIsHover] = useState<boolean>(false)
  const isOpenSidebar = !collapsed || isHover

  useEffect(() => {
    if (currentRoute) {
      setSelectedKeys([currentRoute.name])
    }
  }, [currentRoute])

  const handleSelectMenuItem = (itemSelect: any) => {
    navigate(itemSelect?.item?.props?.url)
    setSelectedKeys(itemSelect?.selectedKeys)
  }

  const filteredMenuItems = menuItems
    .filter((menuItem) => menuItem?.show)
    .map((menuItem) => {
      const filteredChild = menuItem?.children?.filter((item) => item?.show).map((item) => omit(item, "show"))
      const returnMenuItem = omit(menuItem, "show")
      return { ...returnMenuItem, children: filteredChild }
    })

  return (
    <>
      {!md && !isOpenSidebar ? null : (
        <Sider
          onMouseEnter={() => {
            if (collapsed) setIsHover(true)
          }}
          onMouseLeave={() => {
            if (collapsed) setIsHover(false)
          }}
          collapsed={!isOpenSidebar}
          onCollapse={onCollapsed}
          collapsedWidth={56}
          css={slidebarCss}
          className={`sidebar min-h-screen [box-shadow:0_8px_16px_rgba(0,_0,_0,_0.07)] fixed top-[0] overflow-y-auto border-r-[1px_solid_#f0f0f0] !max-w-[unset] bg-[#fff] ${
            !isOpenSidebar ? "sidebar--collapse !w-[24px]" : "sidebar--expand !w-[280px]"
          }`}
          trigger={null}>
          {/* <div className={`sidebar__trigger-top ${xs ? "closable" : ""}`}>
            {!isOpenSidebar ? (
              <>
                <img
                  src={minilogo}
                  alt={"Vela One"}
                  className="object-contain w-[32px] h-[32px]"
                />
              </>
            ) : (
              <>
                <img
                  src={logo}
                  alt={"Vela One"}
                  className="max-w-[170px] p-[12px] object-contain"
                />
              </>
            )}
          </div> */}
          {/* <Menu
            className="sidebar__menu menu__scrollbar"
            defaultOpenKeys={[]}
            mode="inline"
            selectedKeys={selectedKeys}
            onClick={handleSelectMenuItem}
            items={filteredMenuItems}
          /> */}
        </Sider>
      )}
    </>
  )
}
