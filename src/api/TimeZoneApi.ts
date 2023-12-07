import { defaultApiClient } from "@util/ApiClient"
import { ITimeZone } from "@domain/TimeZone"

export default class TimeZoneApi {
  static getTimezones(): Promise<{ data: ITimeZone[] }> {
    return defaultApiClient.get(`time-zones`)
  }
}
