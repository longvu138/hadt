import React, { ReactElement } from "react"
import { Dashboard } from "@screen/Dashboard"
import { Login } from "@screen/Login"
import { Logout } from "@screen/Logout"
import { Authentication } from "@screen/Authentication"
import { AuthenticateRoute } from "@component/AuthenticateRoute"
import { AccessDenied } from "@component/AccessDenied"
import { Register } from "@/screen/Register/Register"

export interface IRouteConfig {
  name: string
  path: string
  component: ReactElement
}

export const routes: Array<IRouteConfig> = [
  {
    name: "dashboard",
    path: "/",
    component: (
      <AuthenticateRoute>
        <Dashboard />
      </AuthenticateRoute>
    ),
  },
  {
    name: "login",
    path: "/login",
    component: <Login />,
  },
  {
    name: "register",
    path: "/register",
    component: <Register />,
  },
  {
    name: "logout",
    path: "/logout",
    component: <Logout />,
  },
  {
    name: "authentication",
    path: "/authentication",
    component: <Authentication />,
  },
  {
    name: "403",
    path: "/403",
    component: <AccessDenied />,
  },
]
