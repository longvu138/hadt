import { useEffect, useState } from "react"
import querystring from "query-string"
import lodash from "lodash"
import axios from "axios"
import appConfig from "@config/app"
import loadingGif from "@assets/img/loading.gif"
import errorPng from "@assets/img/stop.png"
import { localStore } from "@util/LocalStore"

export const Authentication = () => {
  const locationHash = window.location.search
  const params: any = querystring.parse(locationHash)
  const [isNotPermission, setIsNotPermission] = useState(false)
  const [msg, setMsg] = useState("Đang kiểm tra xác thực, vui lòng đợi")

  // reset loginSession
  localStore.removeItem("loginSession")
  useEffect(() => {
    document.title = "Xác thực"

    if (lodash.has(params, "access-token")) {
      setMsg("Bạn sẽ được chuyển đến Bảng điều khiển ngay bây giờ")
    } else {
      setIsNotPermission(true)
      setMsg("Không thể đăng nhập")
    }
    const redirectBackUrl = localStore.getItem("redirectBackUrl") ? localStore.getItem("redirectBackUrl") : btoa("/")
    axios({
      url: appConfig.apiUrl + "/auth/user/info",
      method: "GET",
      headers: {
        Authorization: "Bearer " + params["access-token"],
      },
    })
      .then((response) => {
        localStore.setJson("loginSession", {
          accessToken: params["access-token"],
        })
        localStore.setJson("loggedUser", response.data)
        localStore.setJson("permissions", response.data?.permissions)
        localStore.setItem("expiresAt", params["expires-at"])
        localStore.setItem("timezone", response.data?.zoneinfo)
        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore
          window.location.href = atob(redirectBackUrl)
        }, 1000)
      })
      .catch((error) => {
        localStore.removeItem("loginSession")
        localStore.removeItem("loggedUser")
        localStore.removeItem("permissions")
        localStore.removeItem("timezone")
        setIsNotPermission(true)
        setMsg(lodash.get(error, "response.data.message", ""))
      })
    // eslint-disable-next-line
  }, [])

  return (
    <div className={"absolute m-auto top-0 bottom-0 right-0 left-0 flex items-center justify-center"}>
      {!isNotPermission ? (
        <div className={"text-center margin-auto"}>
          <img
            src={loadingGif}
            alt={""}
          />
          <p className="text-lg font-normal">{msg}</p>
        </div>
      ) : (
        <div className={"text-center margin-auto"}>
          <div>
            <img
              src={errorPng}
              alt={""}
            />
          </div>
          <div className="txt-center">
            <p className="splash-text txt-color-black2 mgt20">Không thể xác thực</p>
            <p className="splash-text txt-color-black2 mgt20">Vui lòng liên hệ với Admin</p>
            <div className={"mgt50"}>
              <a
                href="/"
                className="splash-text txt-color-blue2 mg-r-20">
                <i className="fas fa-undo-alt mgr5" /> <span>Thử lại</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
