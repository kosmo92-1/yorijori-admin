import { CFormTextarea, CInputGroup, CInputGroupText } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState, createRef } from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Table } from 'reactstrap'

const NoticeDelete = (notice_id) => {
  //버튼을 클릭하면 해당 글 삭제진행
  const deleteBtn = (e) => {
    e.preventDefault()
    axios
      .post('/deleteNotice.do', notice_id, {
        headers: { 'Content-type': 'application/json' },
      })
      // post 보내고 나서 실행
      .then((res) => {
        alert('성공')
        window.location.reload()
      })
      .catch((err) => {
        alert('실패')
      })
  }
  return (
    <>
      <Button onClick={deleteBtn}>삭제</Button>
    </>
  )
}

export default NoticeDelete
