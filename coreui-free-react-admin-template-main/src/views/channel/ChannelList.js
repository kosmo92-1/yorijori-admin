import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Table } from 'reactstrap'
import axios from 'axios'
import NoticeDelete from './ChannelDelete'

const ChannelList = () => {
  const [channelList, setChannelList] = useState([
    {
      channel_id: '',
      channel_name: '',
      member_id: '',
      channel_content: '',
      channel_photo: null,
      channel_regdate: '',
    },
  ])
  const listComponent = channelList.map((item) => (
    <tr key={item.channel_id}>
      <th scope="row">{item.channel_name}</th>
      <td>{item.channel_content}</td>
      <td>{item.member_id}</td>
      <td>{new Date(item.channel_regdate).toLocaleDateString()}</td>
      <td>
        <NoticeDelete channel_id={item.channel_id} />
      </td>
    </tr>
  ))
  useEffect(() => {
    axios
      .get('/chanList.do')
      .then((res) => {
        console.log(res.data)
        setChannelList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">채널 관리</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            채널 리스트를 불러옵니다.
          </CardSubtitle>
          <CardText>
            <Table>
              <thead>
                <tr>
                  <th>채널이름</th>
                  <th>채널소개</th>
                  <th>유저아이디</th>
                  <th>작성날짜</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>{listComponent}</tbody>
            </Table>
          </CardText>
        </CardBody>
      </Card>
    </>
  )
}

export default ChannelList
