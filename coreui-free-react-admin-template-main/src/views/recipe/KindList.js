import { CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState, createRef } from 'react'
import { Badge, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'

const KindList = () => {
  const [kindName, setKindName] = useState('')
  const [kind, setKind] = useState('ingredient')
  const [kindMap, setKindMap] = useState([{ kind_id: '', kind_name: '' }])
  // 페이지가 로드되면 처음에 재료종류에 관한 종류리스트를 가져온다.
  useEffect(() => {
    //해당 종류의 리스트를불러온다.
    axios.get(`/getSelectedKindList.do?name=${kind}`).then((res) => {
      console.log(res.data)
      setKindMap(res.data)
    })
  }, [kind])

  //종류 리스트를 컴포넌트로 만듬
  const listComponent = kindMap.map((item) => <Badge key={item.kind_id}>{item.kind_name}</Badge>)

  // 셀렉트박스 제어
  const handleSelect = (e) => {
    console.log(e.target.value)
    setKind(e.target.value)
  }
  // 종류이름 제어
  const handleKindName = (e) => {
    console.log(e.target.value)
    setKindName(e.target.value)
  }

  // 재료종류 정보 담기
  const jsonForm = {
    kind_id: kind,
    kind_name: kindName,
  }
  //선택한 재료종류 추가
  const addIngredient = () => {
    axios
      .post('insertKind.do', jsonForm, {
        headers: {
          'Content-type': 'application/json',
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
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">종류목록 보기</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            레시피에 사용될 재료를 보여줍니다.
          </CardSubtitle>
          <CardText>
            <CInputGroup className="mb-3">
              <CFormInput
                placeholder="추가할 재료 이름을 입력해주세요"
                aria-label="Recipient&#39;s username"
                aria-describedby="basic-addon2"
                value={kindName}
                onChange={handleKindName}
              />
              <CInputGroupText type="button" id="basic-addon2" onClick={addIngredient}>
                추가하기
              </CInputGroupText>
            </CInputGroup>
            <CFormSelect aria-label="Default select example" value={kind} onChange={handleSelect}>
              <option value="ingredient">재료종류</option>
              <option value="food">음식종류</option>
            </CFormSelect>
          </CardText>
          {listComponent}
          {/* <UncontrolledPopover placement="bottom" target="PopoverLegacy" trigger="legacy">
            <PopoverHeader>선택한재료를 삭제할까요?</PopoverHeader>
            <PopoverBody>
              <Button>예</Button>
            </PopoverBody>
          </UncontrolledPopover> */}
        </CardBody>
      </Card>
    </>
  )
}

export default KindList
