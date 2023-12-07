import React, { ReactElement } from "react"
import { trans } from "@/locale"

export interface IMenuItem {
  key: string
  label: string
  icon: ReactElement
  url: string
  show: boolean
  children?: Array<IMenuItem>
}

export const menuItems: IMenuItem[] = [
  {
    key: "dashboard",
    label: trans("sidebar.dashboard"),
    icon: <i className="fa-solid fa-gauge-low" />,
    url: "/",
    show: true,
  },
]
