import { useMutation, useQuery } from "react-query"
import TimeZoneApi from "@api/TimeZoneApi"
import { message } from "antd"
import { trans } from "@/locale"
import UserApi from "@api/UserApi"

export const useTimeZoneList = () => {
  return useQuery({
    queryKey: ["common.timezone"],
    queryFn: () => TimeZoneApi.getTimezones(),
  })
}

export const useUpdateTimeZone = () => {
  return useMutation("common.updateTimezone", (data: { zoneInfo: string }) => UserApi.updateUserTimeZone(data), {
    onError: (errors: any) => {
      message.error(errors?.response?.data?.message || trans("message.fail"))
    },
  })
}
