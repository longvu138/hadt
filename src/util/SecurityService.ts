import lodash from "lodash"

import {localStore} from "@util/LocalStore"

export class SecurityService {
    static can = (permission: string) => {
        const permissions = localStore.getJson("permissions") || []
        return permissions.includes(permission)
    }

    static isLogged = () => {
        const loginSession = localStore.getItem("loginSession")
        // const accessToken = lodash.get(loginSession, "accessToken")
        return !!loginSession
    }

    static getUser = () => {
        if (SecurityService.isLogged()) {
            return localStore.getJson("loggedUser")
        }
        return null
    }
}