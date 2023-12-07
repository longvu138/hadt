import { trans } from "@/locale"
import { Button, message, Select } from "antd"
import { isEmpty } from "lodash"
import React, { useEffect, useState } from "react"
import { SecurityService } from "@util/SecurityService"
import { useTimeZoneList, useUpdateTimeZone } from "@hook/useTimeZone"

type Props = {
  goBack: () => void
}

export const TimezoneSetting: React.FC<Props> = ({ goBack }) => {
  const { data: timezones } = useTimeZoneList()
  const userInfo: any = SecurityService.getUser()
  const [currentTimezone, setCurrentTimezone] = useState("")
  const useUpdateTimeZoneAction = useUpdateTimeZone()

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      setCurrentTimezone(userInfo?.zoneinfo || "")
    }
  }, [userInfo])

  const onChangeTimezone = (value: string) => {
    useUpdateTimeZoneAction
      .mutateAsync({
        zoneInfo: value,
      })
      .then((result: any) => {
        if (result?.status === 200) {
          message.success(trans("message.success"))
          window.location.reload()
        }
      })
  }

  return (
    <div className="w-56">
      <div className="flex items-center">
        <Button
          type="link"
          onClick={() => goBack()}
          icon={<i className="fa-sharp fa-solid fa-chevrons-left"></i>}
        />

        <h5 className="font-medium m-0">{trans("setting.time_zone")}</h5>
      </div>
      <p className="m-0">{trans("setting.time_zone_select")}</p>
      <Select
        onChange={(value) => {
          onChangeTimezone(value)
          setCurrentTimezone(value)
        }}
        value={currentTimezone}
        optionFilterProp="children"
        filterOption={(input: any, option: any) => {
          return (option?.children ?? "")?.toLowerCase()?.includes(input?.toLowerCase())
        }}
        filterSort={(optionA: any, optionB: any) => {
          return (optionA?.children ?? "")?.toLowerCase()?.localeCompare((optionB?.children ?? "")?.toLowerCase())
        }}
        className="w-full">
        {timezones?.data?.map((item) => (
          <Select.Option
            key={item?.id}
            value={item?.code}>
            {item?.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}
