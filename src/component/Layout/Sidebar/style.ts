import { css } from "@emotion/react"
import { themeConfig } from "@config/antd"

export const slidebarCss = css`
  .sidebar__menu .ant-menu-submenu .ant-menu-submenu-title .ant-menu-item-icon {
    display: block !important;
    color: #d0d0d0;
  }

  .sidebar__trigger-top {
    display: flex;
    justify-content: center;
    padding: 8px 12px;
  }

  &.sidebar--collapse {
    .sidebar__trigger-top {
      padding: 16px 12px;
    }
  }

  .sidebar__menu {
    .ant-menu-submenu .ant-menu-submenu-title {
      pointer-events: none;
    }

    .ant-menu-item .ant-menu-item-icon {
      color: ${themeConfig.token.colorPrimary};
    }

    .ant-menu-submenu {
      background-color: #fff !important;

      .ant-menu-submenu-title {
        .ant-menu-title-content {
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .ant-menu-item-icon {
          display: none;
        }

        .ant-menu-submenu-arrow {
          display: none;
        }
      }

      .ant-menu-sub .ant-menu-item .ant-menu-item-icon {
        color: ${themeConfig.token.colorPrimary};
      }
    }
  }

  .ant-menu-item-selected {
    color: #e8252d;
    background-color: #fff1f2;
  }

  &__trigger {
    &-top {
      width: 100%;
      display: flex;
      background-color: #fff;
      padding: 15px 20px;
      justify-content: space-between;
      align-items: center;
      position: relative;

      .trigger-icon {
        color: ${themeConfig.token.colorPrimary};
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
      }

      .trigger-logo {
        height: 50px;
      }

      .collasped-logo {
        height: 32px;
        display: block;
      }

      &.closable {
        display: flex;
        align-items: center;

        & .anticon-close {
          position: absolute;
          top: 25px;
          right: 8px;
          color: #000;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  .ant-layout-sider-trigger {
    background-color: #fff;

    .trigger-icon {
      color: ${themeConfig.token.colorPrimary};
    }
  }

  .ant-menu-sub {
    background-color: #fff !important;
  }
`
