import React, { useState } from 'react'

export default function ModalMaker () {
  const [modals] = useState([
    {
      title: 'title',
      dueDate: 'DueDate',
      category: 'category'
    }
  ])

  return <div className='sticky bottom-0 bg-light-purple z-10'>ModalMaker</div>
}
