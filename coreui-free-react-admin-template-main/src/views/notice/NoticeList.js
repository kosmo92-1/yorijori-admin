import axios from 'axios'
import React, { useEffect, useState, createRef } from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Table } from 'reactstrap'
import NoticeDelete from './NoticeDelete'

const NoticeList = () => {
  const [noticeList, setNoticeList] = useState({
    list: [
      { notice_id: 0, notice_head: '', notice_title: '', notice_content: '', notice_regdate: '' },
    ],
    pageMaker: {
      totalCount: 16,
      startPage: 1,
      endPage: 2,
      prev: false,
      next: false,
      displayPageNum: 10,
      cri: { page: 1, pageNum: 10, rowStart: 1, rowEnd: 10, pageStart: 0 },
    },
  })
  const noticeComponent = noticeList.list.map((item) => (
    // eslint-disable-next-line react/jsx-key
    <tr>
      <td>{item.notice_id}</td>
      <td>{item.notice_head}</td>
      <td onClick={() => actionRead(item.notice_id)}>{item.notice_title}</td>
      <td>
        <NoticeDelete notice_id={item.notice_id} />
      </td>
    </tr>
  ))

  // eslint-disable-next-line no-undef
  const actionRead = (notice_id) => {
    window.location.href = `/#/noticeDetail?notice_id=${notice_id}`
    // window.location.href = `/#/channel`
  }
  useEffect(() => {
    axios
      .get('/listNotice.do')
      .then((res) => {
        console.log(res.data)
        setNoticeList(res.data)
      })
      .catch((err) => {
        alert(err)
      })
  }, [])

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">공지목록</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            공지사항 목록입니다.
          </CardSubtitle>
          <CardText>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>유형</th>
                  <th>제목</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>{noticeComponent}</tbody>
            </Table>
          </CardText>
        </CardBody>
      </Card>
    </>
  )
}
export default NoticeList
