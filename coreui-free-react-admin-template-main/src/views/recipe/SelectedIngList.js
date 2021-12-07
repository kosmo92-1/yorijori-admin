/* eslint-disable prettier/prettier */
import { CBadge } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge, Button, PopoverBody, PopoverHeader, UncontrolledPopover } from 'reactstrap'
const SelectedIngList = (props) => {
console.log(props)
const [badge, setBadge] = useState([{ ing_id: '', ing_name: '' }])
useEffect(()=>{
    // axios.get(`/listIngredient.do?searchType=kind&keyword=ingredient_1`)
    axios.get(`/listIngredient.do?searchType=kind&keyword=${props.ingKind}`)
    .then((res) => {
        setBadge(res.data.list)
        console.log(res.data.list)
        console.log(badge)
    })
    },[props.ingKind])
  return (
      badge.map((item) => (
        <>
            <Badge color="primary" id={item.ing_id} key={item.ing_id}>{item.ing_name}</Badge>
            {/* <UncontrolledPopover placement="bottom" target={item.ing_id} trigger="legacy">
            <PopoverHeader>선택한재료를 삭제할까요?</PopoverHeader>
            <PopoverBody>
              <Button>예</Button>
            </PopoverBody>
            </UncontrolledPopover> */}
        </>
   
      ))
  )
}
export default SelectedIngList
