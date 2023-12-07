import React, { PropsWithChildren, useEffect, useState } from "react"
import { App, Layout, Spin } from "antd"
import { Header } from "@component/Layout/Header"
import { SideBar } from "@component/Layout/Sidebar"
import { IUser } from "@domain/User"
import { SecurityService } from "@util/SecurityService"
import { trans } from "@/locale"
import { usePageTitleStore } from "@store/usePageTitle"

const { Content, Footer } = Layout

interface Props extends PropsWithChildren<any> {
  loading?: boolean
  toLink?: string
}

export const DefaultLayout = (props: Props) => {
  const [collapsed, setCollapsed] = useState(true)
  const [user] = useState<IUser>(SecurityService.getUser())
  const title = usePageTitleStore((state) => state.title)

  useEffect(() => {
    document.title = title
  }, [title])

  const onCollapsed = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  return (
    <App>
      <Layout className="main-layout">
        {/* <SideBar
          collapsed={collapsed}
          onCollapsed={onCollapsed}
        /> */}
        <Layout>
          <Header
            collapsed={collapsed}
            user={user}
            onCollapsed={onCollapsed}
            toLink={props.toLink}
          />
          <Content className={`main-content h-100pc ${!collapsed ? "collapsed-more-site" : "collapsed-less-site"}`}>
            <div className={props.loading ? "h-100pc" : "main-inner h-100pc overflow-auto h-[calc(100vh_-_64px)]"}>
              <Spin
                tip={trans("message.loading")}
                spinning={props.loading}>
                <div className="p-6">{props.children}</div>
              </Spin>
            </div>
          </Content>
         
        </Layout>
      </Layout>
    </App>
  )
}

export default DefaultLayout
