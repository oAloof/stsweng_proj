import React, { useState } from 'react'

export default function ModalMaker () {
  const [modals] = useState([
    {
      title: 'title',
      dueDate: 'DueDate',
      category: 'category'
    }
  ])
}
