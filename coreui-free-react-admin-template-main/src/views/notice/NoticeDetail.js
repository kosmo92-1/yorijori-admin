import { CFormInput, CFormSelect, CFormTextarea, CInputGroup, CInputGroupText } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState, createRef } from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Table } from 'reactstrap'

const NoticeDetail = () => {
  const [title, setTitle] = useState('title')
  const [content, setContent] = useState('content')
  const [head, setHead] = useState('공지사항')
  const [id, setId] = useState(0)

  const noticeJson = {
    notice_id: id,
    notice_title: title,
    notice_head: head,
    notice_content: content,
  }
  // 제목설정
  const handleTitle = (e) => {
    console.log(e.target.value)
    setTitle(e.target.value)
  }
  // 내용설정
  const handleContent = (e) => {
    console.log(e.target.value)
    setContent(e.target.value)
  }
  // 타입설정
  const handleHead = (e) => {
    console.log(e.target.value)
    setHead(e.target.value)
  }
  const updateBtn = () => {
    axios
      .post('/updateNotice.do', noticeJson, {
        headers: { 'Content-type': 'application/json' },
      })
      // post 보내고 나서 실행
      .then((res) => {
        alert('성공')
        window.location.href = 'http://localhost:3001/#/notice'
      })
      .catch((err) => {
        alert('실패')
      })
  }
  // 상세페이지 불러오기
  useEffect(() => {
    const toConvert = window.location.href.substr(window.location.href.indexOf('=') + 1)
    console.log(window.location.href.substr(window.location.href.indexOf('=') + 1))
    const notice_id = parseInt(toConvert, 10)
    console.log(notice_id)
    console.log('noticeDetail')
    axios
      .get(`/readNotice.do?notice_id=${notice_id}`, {
        headers: { 'Content-type': 'application/json' },
      })
      // post 보내고 나서 실행
      .then((res) => {
        console.log(res.data)
        setTitle(res.data.read.notice_title)
        setContent(res.data.read.notice_content)
        setHead(res.data.read.notice_head)
        setId(res.data.read.notice_id)
      })
      .catch((err) => {
        alert('실패')
      })
  }, [])
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">공지상세보기</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            공지사항 게시판입니다.
          </CardSubtitle>
          <CardText>
            <CInputGroup className="mb-3">
              <CInputGroupText component="label" htmlFor="inputGroupSelect02">
                공지유형
              </CInputGroupText>
              <CFormSelect id="inputGroupSelect02" value={head} onChange={handleHead}>
                <option value="공지사항">공지사항</option>
                <option value="FAQ">FAQ</option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>제목</CInputGroupText>
              <CFormInput
                aria-label="Amount (to the nearest dollar)"
                value={title}
                onChange={handleTitle}
              />
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText>내용</CInputGroupText>
              <CFormTextarea
                aria-label="With textarea"
                value={content}
                onChange={handleContent}
              ></CFormTextarea>
            </CInputGroup>
          </CardText>
          <Button onClick={updateBtn}>수정</Button>
        </CardBody>
      </Card>
    </>
  )
}

export default NoticeDetail
