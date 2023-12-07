import { IUser } from "@domain/User"
import { defaultApiClient } from "@util/ApiClient"

export default class UserApi {
  static getCurrentUser() {
    return defaultApiClient.get<IUser>("/users/current")
  }

  static updateUserTimeZone(body: { zoneInfo: string }): Promise<any> {
    return defaultApiClient.patch(`users`, body)
  }
}
