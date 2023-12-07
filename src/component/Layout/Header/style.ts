import { css } from "@emotion/react"

export const headerCss = css`
  background-color: #fff;
  position: sticky;
  top: 0;
  padding-right: 0;
  padding-left: 0;

  &.fixed {
    position: sticky;
    top: 0;
    line-height: unset;
    z-index: 997;
  }

  &.collapsed-more-site {
  }

  &.collapsed-less-site {
    @media screen and (max-width: 768px) {
      margin-left: 0;
    }
  }

  .header-inner {
    position: relative;
    height: 64px;
    padding: 0;
    width: 100%;

    &-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px 0 0;

      & .anticon-menu {
        color: #000;
      }

      .title {
        font-size: 16px;
        line-height: 24px;
      }
    }

    .btn-collapsed {
      border: none !important;
      box-shadow: none !important;
    }
  }

  .left__header {
    display: flex;
    align-items: center;
  }

  .trigger {
    font-size: 22px;
    cursor: pointer;
  }

  .right-header {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      gap: 10px;
    }

    .notify {
      display: flex;

      .ant-scroll-number-only-unit {
        color: white;
      }
    }
  }
`
