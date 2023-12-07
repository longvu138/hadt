import { get } from "lodash"
import {localStore} from "@util/LocalStore"
import en from "./locals/en/en.json"
import vi from "./locals/vn/vn.json"
import indo from "./locals/indonesia/indonesia.json"
import thai from "./locals/thailand/thailand.json"

const language = localStore.getItem("language")

const lang = (function lang(_language) {
    switch (_language) {
        case "en":
            return en
        case "vi":
            return vi
        case "indo":
            return indo
        case "thai":
            return thai
        default:
            return vi
    }
})(language)

const fallback = vi

export const trans = (key: string): string => {
    const value = get(lang, key, key)
    if (value === key || !value) {
        return get(fallback, key, key)
    }

    return value
}
