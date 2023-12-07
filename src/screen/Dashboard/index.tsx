import React, { useEffect, useState } from "react"
import DefaultLayout from "@component/Layout/Default"
import { trans } from "@/locale"
import { usePageTitleStore } from "@store/usePageTitle"
import { Button, Result, Tabs, TabsProps, Upload, notification } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from "axios"
import appConfig from "@/config/app"
import { useSearchParams } from "react-router-dom"
import { localStore } from "@/util/LocalStore"
import { SmileOutlined } from "@ant-design/icons"

// import chucmung from '../../assets/img/a.gif'

export const Dashboard = (props: any) => {
  const changePageTitle = usePageTitleStore((state) => state.changeTitle)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<any>([])
  const [dataUser, setDataUser] = useState(null)
  const currentUser = localStore.getJson("loggedUser") as any
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "tab1"
  useEffect(() => {
    changePageTitle(trans("HÀ ĐT"))
  }, [changePageTitle])

  console.log("currentUser")

  const onChange = (key: string) => {
    setSearchParams({ tab: key })
  }

  const onChangeUpload = ({ fileList }: any) => {
    setFile(fileList)
  }

  const handleUploadImage = () => {
    if (file.length < 1) {
      notification.warning({
        message: "Đã có lỗi xảy ra",
        description: "Vui lòng tải ảnh",
        key: "err",
        duration: 3,
      })
      return
    }
    const formData: any = new FormData()
    formData.append("file", file[0].originFileObj as any)
    formData.append("type", "6")
    setLoading(true)
    const token = localStorage.getItem("loginSession")
    axios
      .post(`${appConfig.apiUrl}/user/verify`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res) {
          axios
            .get(`${appConfig.apiUrl}/user/detail`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setFile([])
              setLoading(false)
              localStore.setJson("loggedUser", response.data)
              setDataUser(response.data)
              notification.success({
                message: "Thành công",
                description: "Giấy tờ của bạn đã được xác thực thành công",
                key: "ss",
                duration: 3,
              })
            })
            .catch((error) => {
              setLoading(false)
            })
        }
      })
      .catch((err) => {
        console.log("err", err)
        setFile([])
        setLoading(false)
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: "Tải ảnh lên thất bại",
          key: "err",
          duration: 3,
        })
      })
  }

  const items: TabsProps["items"] = [
    {
      key: "tab1",
      label: <span className="px-4">Sử dụng chứng minh thư nhân dân</span>,
      children: (
        <Upload
          action={""}
          listType="picture"
          maxCount={1}
          fileList={file}
          onChange={onChangeUpload}>
          <Button icon={<UploadOutlined />}>Tải ảnh căn cước công dân</Button>
        </Upload>
      ),
    },
    {
      key: "tab2",
      label: <span className="px-4">Sử dụng bằng lái xe</span>,
      children: (
        <Upload
          action={""}
          listType="picture"
          maxCount={1}
          fileList={file}
          onChange={onChangeUpload}>
          <Button icon={<UploadOutlined />}>Tải ảnh bằng lái xe</Button>
        </Upload>
      ),
    },
  ]

  const infomationUser = currentUser?.documents[0]?.data
  console.log("infomationUser", infomationUser)

  return (
    <DefaultLayout
      {...props}
      loading={false}
      title={trans("sidebar.dashboard")}>
      <div className="text-center grid items-center justify-center">
        {currentUser.verified ? (
          <div className="bg-slate-50 w-[500px] rounded-xl p-6">
            <div className="grid items-center justify-center">
              <div className="flex items-center justify-start ml-10 font-roboto">
                <span className="font-medium text-base mr-1">Loại giấy tờ:</span>
                {infomationUser.card_type || "---"}
              </div>
              <div className="flex items-center justify-start ml-10 font-roboto">
                <span className="font-medium text-base mr-1"> Họ tên:</span> {infomationUser.name || "---"}
              </div>
              <div className="flex items-center justify-start ml-10 font-roboto">
                <span className="font-medium text-base mr-1"> Ngày sinh:</span> {infomationUser.birth_day || "---"}
              </div>
              <div className="flex items-center justify-start ml-10 font-roboto">
                <span className="font-medium text-base mr-1"> Quốc tịch:</span> {infomationUser.nationality || "---"}
              </div>
              <div className="flex items-center justify-start ml-10 font-roboto">
                <span className="font-medium text-base mr-1"> Địa chỉ:</span> {infomationUser.recent_location || "---"}
              </div>
              <div className="flex items-center justify-start ml-10 font-roboto">
                <span className="font-medium text-base mr-1"> Loại bằng lái: </span> {infomationUser.rank || "---"}
              </div>
              <div className="flex items-center justify-start ml-10 font-roboto">
                <span className="font-medium text-base mr-1"> Giá trị sử dụng: </span> {infomationUser.valid_date || "---"}
              </div>
              <Result
                status="success"
                title="Chúc mừng"
                icon={<SmileOutlined />}
                subTitle={<h2>Thông tin của bạn đã được xác thực</h2>}
              />
            </div>
          </div>
        ) : (
          <>
            <Tabs
              type="card"
              activeKey={activeTab}
              items={items}
              onChange={onChange}
              className="flex items-center justify-center"
            />
            <Button
              loading={loading}
              onClick={handleUploadImage}
              type="primary"
              size="large"
              className="mt-20">
              Tải ảnh lên
            </Button>
          </>
        )}
      </div>
    </DefaultLayout>
  )
}
