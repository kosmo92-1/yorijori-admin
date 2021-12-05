import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/yoridashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: '관리자',
  },
  {
    component: CNavItem,
    name: '회원보기',
    to: '/user',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '채널관리',
    to: '/channel',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: '공지사항 관리',
    to: '',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '공지사항 목록',
        to: '/notice',
      },
      {
        component: CNavItem,
        name: '공지사항 등록',
        to: '/noticeInsert',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '레시피관리',
    to: '',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '종류 관리',
        to: '/kind',
      },
      {
        component: CNavItem,
        name: '재료 관리',
        to: '/ingredient',
      },
    ],
  },
  {
    component: CNavItem,
    name: '메일 보내기',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '챗봇',
    to: '/charts',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
]

export default _nav
