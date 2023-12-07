import React, { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Avatar, Button, Layout, Menu, Popover, Space, Typography } from "antd"
import lodash, { find, isEmpty } from "lodash"
import { IUser } from "@domain/User"
import vn from "@assets/img/flag/vn.png"
import us from "@assets/img/flag/us.png"
import indonesiaFlagImage from "@assets/img/flag/id.png"
import thailandFlagImage from "@assets/img/flag/th.png"
import DefaultAvatarImg from "@assets/img/avatar-default.png"
import { localStore } from "@util/LocalStore"
import { trans } from "@/locale"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { usePageTitleStore } from "@store/usePageTitle"
import { SecurityService } from "@util/SecurityService"
import { headerCss } from "@component/Layout/Header/style"
dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
  collapsed: boolean
  user: IUser | null
  onCollapsed: (val: boolean) => void
  toLink?: string
}

const languages = [
  { key: "vi", title: "Viet Nam", flag: vn },
  { key: "en", title: "English", flag: us },
  { key: "indo", title: "Indonesia", flag: indonesiaFlagImage },
  { key: "thai", title: "Thailand", flag: thailandFlagImage },
]

export const Header: React.FC<Props> = (props) => {
  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false)
  const title = usePageTitleStore((state) => state.title)
  const { id } = useParams()
  const navigate = useNavigate()
  const userInfo = SecurityService.getUser()

  const handleChangeLang = (lang: string) => {
    localStore.setItem("language", lang)
    window.location.reload()
  }

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      dayjs.tz.setDefault(userInfo?.zoneinfo || "Asia/Ho_Chi_Minh")
      localStorage.setItem("timezone", userInfo?.zoneinfo || "Asia/Ho_Chi_Minh")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  const renderDropDownUser = () => {
    return (
      <Menu
        items={[
          {
            label: trans("login.logout_btn"),
            key: "3",
            icon: <i className="fa-light fa-right-from-bracket"></i>,
            onClick: () => navigate("/logout"),
          },
        ]}
      />
    )
  }

  const { user, collapsed } = props

  const handleLanguageDropdownVisibleChange = (visible: boolean) => {
    setLanguageDropdownVisible(visible)
  }

  const renderDropDownLang = () => {
    return (
      <>
        {languages.map((item) => (
          <div
            key={item.key}
            className={`px-3 w-32 pointer header-language ${localStore.getItem("language") === item.key ? "bg-gray-200" : ""}`}
            onClick={() => handleChangeLang(item.key)}>
            <img
              className={"image-language inline"}
              src={item.flag}
              alt={item.flag}
            />{" "}
            {item.title}
          </div>
        ))}
      </>
    )
  }
  const currentLang: any = useMemo(() => find(languages, { key: localStore.getItem("language") }), [])

  return (
    <Layout.Header
      css={headerCss}
      className={`header fixed ${!collapsed ? "collapsed-more-site" : "collapsed-less-site"}`}>
      <div className="header-inner">
        <div className="header-inner-inner h-full">
          {/* <Space>
            <Button
              type="default"
              className="btn-collapsed"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                props.onCollapsed(!collapsed)
              }}></Button>
            {title !== "PBlocked" && (
              <div className="left__header">
                {id && (
                  <Button
                    onClick={() => {
                      props?.toLink ? navigate(props?.toLink) : navigate(-1)
                    }}
                    type="link"
                    icon={
                      <i
                        className="fa fa-arrow-left mr-2"
                        aria-hidden="true"></i>
                    }></Button>
                )}
                <b className="title">{title}</b>
              </div>
            )}
          </Space> */}
          <span className="text-center font-medium font-roboto text-xl ml-6">
            HÀ DT ỨNG DỤNG GÌ ĐÓ
          </span>
          <div className="right-header flr mr-8">
            <div className="line-1 mg-l-26 mg-r-26" />
            <span className="user cursor-pointer item">
              <Typography.Text
                strong
                className="mr-2">
               Xin chào: {userInfo?.email}
              </Typography.Text>
              <Popover
                placement="bottomRight"
                trigger="click"
                overlayClassName={"header-popover-dropdown-user"}
                content={renderDropDownUser()}>
                <Avatar
                  shape="circle"
                  src={lodash.get(user, "avatar") ? lodash.get(user, "avatar")?.toString() : DefaultAvatarImg}
                />
              </Popover>
              {/* {!isEmpty(currentLang) && (
                <img
                  className={"image-language inline"}
                  src={currentLang?.flag}
                  alt={currentLang?.flag}
                />
              )}
              <Popover
                placement="bottom"
                open={languageDropdownVisible}
                onOpenChange={handleLanguageDropdownVisibleChange}
                content={renderDropDownLang()}
                trigger="click">
                <i className={"fa-solid fa-globe cursor-pointer item"} />
              </Popover> */}
            </span>
          </div>
        </div>
      </div>
    </Layout.Header>
  )
}
