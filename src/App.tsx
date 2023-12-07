import React from "react"
import { QueryClientProvider, QueryClient } from "react-query"
import AppRoutes from "./routes"
import { ConfigProvider } from "antd"
import { themeConfig } from "@config/antd"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  // Setting Modal、Message、Notification static config.
  ConfigProvider.config({
    prefixCls: "ant",
    iconPrefixCls: "anticon",
    theme: themeConfig,
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: "#e8262d",
          colorLink: " #3498db",
          borderRadius: 6,
          colorBgContainer: "#fff",
        },
        components: {
          Tabs: {
            cardBg: '#eaeaea',
            colorBorderSecondary:'eaeaea',
            borderRadiusLG:12,
            fontWeightStrong: 500,
          },
          Layout: {
            bodyBg: "#cbcbcb"
          }
        }
      }}>
        <AppRoutes />
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
