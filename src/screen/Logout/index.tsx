import { useEffect } from "react"

import { Spin } from "antd"
import { localStore } from "@util/LocalStore"
import appConfig from "@config/app"

export const Logout = () => {
  useEffect(() => {
    localStore.removeItem("loginSession")
    localStore.removeItem("loggedUser")
    window.location.href = '/login'
  }, [])

  return (
    <div className={"mg-t-10 mg-l-10"}>
      Đang chuyển trang, vui lòng đợi một chút.... <Spin />
    </div>
  )
}
