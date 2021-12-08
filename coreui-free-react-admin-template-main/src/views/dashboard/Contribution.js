import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Contribution = (member_id) => {
  const memberId = member_id
  // const [memberId, setMemberId] = useState(member_id['member_id'])
  // console.log(member_id['member_id'])
  const [contribution, setContribution] = useState(0)

  useEffect(() => {
    axios
      .get('/memberContribution.do?member_id=' + memberId['member_id'])
      .then((res) => {
        setContribution(res.data[Object.keys(res.data)[0]])
        console.log(res.data[Object.keys(res.data)[0]])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // const memberContribution = (member_id) => {axios.get('memberContribution.do?member_id='+member_id).then((res) => contribution(res) )}
  return <>{contribution}</>
}

export default Contribution
