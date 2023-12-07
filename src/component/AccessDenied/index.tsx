import React, { useEffect } from "react"

import { Result } from "antd"
import { trans } from "@/locale"
import { usePageTitleStore } from "@store/usePageTitle"

export const AccessDenied = () => {
  const pageTitleStore = usePageTitleStore()

  useEffect(() => {
    pageTitleStore.changeTitle("Access Denied")
  }, [pageTitleStore])

  return (
    <Result
      status="403"
      title="403"
      subTitle={trans("login.notPermission")}
    />
  )
}
