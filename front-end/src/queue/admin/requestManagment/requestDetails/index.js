import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RequsetDetails = ({ id, name, type, updateList, editRequest }) => {
  const _token = useSelector(state => state.adminReducer.token)
  const navigate = useNavigate()

  const editHandler = async id => {
    return editRequest(id)
  }

  const deleteHandler = async id => {
    let response
    let data
    try {
      response = await fetch(`${process.env.REACT_APP_URL}/requestType/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${_token}`
        }
      })
      data = await response.json()
    } catch (error) {
      console.log(error)
    }

    if (!response.ok) {
      return new Error(`error ${response.status} occured...`)
    }
    await updateList(id)
    // await setRequestTypes(data.data)
  }

  return (
    <div
      style={{ direction: 'rtl' }}
      className={`text-[12px]  border-2 p-1 my-5   border-[#ed1c24] rounded-3xl font-bold 
       place-items-center grid grid-cols-4
       `}
    >
      <span className="">{name}</span>
      <span className="">{type}</span>
      <span
        className="place-self-end cursor-pointer caret-transparent"
        onClick={() => editHandler(id)}
      >
        ویرایش
      </span>
      <span
        className="cursor-pointer caret-transparent "
        onClick={() => deleteHandler(id)}
      >
        حذف
      </span>
    </div>
  )
}

export default RequsetDetails
