import axios from 'axios'
import React from 'react'
import { Button } from 'reactstrap'

const NoticeDelete = (channel_id) => {
  //버튼을 클릭하면 해당 글 삭제진행
  const deleteBtn = (e) => {
    e.preventDefault()
    axios
      .post('/deleteChannel.do', channel_id, {
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
