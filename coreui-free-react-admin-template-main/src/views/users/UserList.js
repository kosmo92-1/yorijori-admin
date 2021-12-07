import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState, createRef } from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Table } from 'reactstrap'

const UserList = () => {
  const [list, setList] = useState([
    {
      member_basic_address: '',
      member_detail_address: '',
      member_email: '',
      member_id: '',
      member_idKey: 0,
      member_name: '',
      member_photo: '',
      member_pw: '',
      member_regdate: 0,
      member_tel: '',
      member_type: '',
    },
  ])

  const [searchtype, setSearchType] = useState('')
  const [inputValue, setInputValue] = useState('')

  const listComponent = list.map((item) => (
    <tr key={item.member_id}>
      <th scope="row">{item.member_id}</th>
      <td>{item.member_name}</td>
      <td>{new Date(item.member_regdate).toLocaleDateString()}</td>
    </tr>
  ))

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }
  const handleSelect = (e) => {
    setSearchType(e.target.value)
  }

  const searchAction = () => {
    console.log(`/listMember.do?searchType=${searchtype}&keyword=${inputValue}`)
    axios
      .get(`/listMember.do?searchType=${searchtype}&keyword=${inputValue}`)
      .then((res) => {
        console.log(res.data.list)
        setList(res.data.list)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    axios
      .get('/listMember.do')
      .then((res) => {
        console.log(res.data.list)
        setList(res.data.list)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">회원 보기</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            전체 회원 리스트를 불러옵니다.
          </CardSubtitle>
          <CardText>
            <CInputGroup>
              <CFormSelect value={searchtype} onChange={handleSelect}>
                <option value="">검색종류</option>
                <option value="id">아이디</option>
                <option value="name">이름</option>
              </CFormSelect>
              <CFormInput
                placeholder="검색할 단어를 입력해주세요"
                aria-label="Recipient&#39;s username"
                aria-describedby="basic-addon2"
                onChange={handleInput}
                value={inputValue}
              />
              <CInputGroupText type="button" id="basic-addon2" onClick={searchAction}>
                검색
              </CInputGroupText>
            </CInputGroup>
            <Table>
              <thead>
                <tr>
                  <th>회원아이디</th>
                  <th>회원이름</th>
                  <th>등록날짜</th>
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

export default UserList
