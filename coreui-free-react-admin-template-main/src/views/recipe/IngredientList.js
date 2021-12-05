import {
  CBadge,
  CFormInput,
  CFormSelect,
  CImage,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import axios from 'axios'
import { array } from 'prop-types'
import React, { useEffect, useState, createRef, useRef } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from 'reactstrap'
import Tables from '../base/tables/Tables'
import SelectedIngList from './SelectedIngList'

const IngredientList = () => {
  const [ingName, setIngName] = useState('')
  const [ingKind, setIngKind] = useState('ingredient_1')
  const [ingMap, setIngMap] = useState([{ kind_id: '', kind_name: '' }])
  const [file, setFile] = useState(null)

  const listComponent = ingMap.map((item) => (
    <option key={item.kind_id} value={item.kind_id}>
      {item.kind_name}
    </option>
  ))
  // const badgeComponent = badge.map((item) => <p key={item.kind_id}>{item.kind_name}</p>)

  const handleIngName = (e) => {
    console.log(e.target.value)
    setIngName(e.target.value)
  }

  const handleSelect = (e) => {
    console.log(e.target.value)
    setIngKind(e.target.value)
  }
  const handleIcon = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  var frm = new FormData()
  frm.append('ing_name', ingName)
  frm.append('kind_id', ingKind)
  frm.append('file', file)

  //선택한 재료종류에 재료추가
  const addIngredient = () => {
    axios
      .post('insertIngredient.do', frm, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('성공')
        window.location.reload()
      })
      .catch((err) => {
        console.log('실패')
      })
  }
  useEffect(() => {
    axios.get('/getSelectedKindList.do?name=ingredient').then((res) => {
      setIngMap(res.data)
    })
  }, [ingKind])
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">재료목록 보기</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            레시피에 사용될 재료를 보여줍니다.
          </CardSubtitle>
          <CardText>
            <CInputGroup className="mb-3">
              <CFormInput type="file" onChange={handleIcon} />
              <CFormInput
                placeholder="추가할 재료 이름을 입력해주세요"
                aria-label="Recipient&#39;s username"
                aria-describedby="basic-addon2"
                value={ingName}
                onChange={handleIngName}
              />
              <CInputGroupText type="button" id="basic-addon2" onClick={addIngredient}>
                추가하기
              </CInputGroupText>
            </CInputGroup>
            <CFormSelect
              aria-label="Default select example"
              value={ingKind}
              onChange={handleSelect}
            >
              {listComponent}
            </CFormSelect>
            <SelectedIngList ingKind={ingKind} />
          </CardText>
        </CardBody>
      </Card>
    </>
  )
}

export default IngredientList
