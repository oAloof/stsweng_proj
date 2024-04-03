import React, { useState, useContext } from 'react'
import { EditContext } from '../../contexts/EditContext'

export default function View ({ }) {
  const [table, setTable] = useState(false)
  const [type, setType] = useState(false)
  const [editPass, setEditPass] = useState(false)
  const [newIcon, setNewIcon] = useState(false)
  const { edit, noEdit, accountView, noAccount, account } = useContext(EditContext)

  const Account = () => {
    accountView()
    setTable(false)
    setEditPass(false)
    setNewIcon(false)
    noEdit()
  }

  const Overdue = () => {
    noAccount()
    setTable(true)
    setType('Overdue Tasks')
    noEdit()
  }

  const Finished = () => {
    noAccount()
    setTable(true)
    setType('Finished Tasks')
    noEdit()
  }

  const EditPass = () => {
    setEditPass(true)
  }

  const NewIcon = () => {
    setNewIcon(true)
  }

  const handleSubmit = (event) => {
    console.log('submitted')
    Account()
    event.preventDefault()
  }

  return (
    <div className=' min-w-[800px] max-w-[1200px]'>
      <ul className='mt-5 menu menu-horizontal bg-base-200 rounded-box flex space-x-3'>
        <li>
          <button className='btn shadow' onClick={Account}>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' /><circle cx='12' cy='7' r='4' /></svg>
            Account
          </button>
        </li>
        <li>
          <button className='btn shadow' onClick={Overdue}>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 stroke-primary' viewBox='0 0 24 24' fill='none' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' /><line x1='12' y1='9' x2='12' y2='13' /><line x1='12' y1='17' x2='12.01' y2='17' /></svg>
            Overdue Tasks
            {type == 'Overdue' && <span className='badge badge-sm badge-warning'>NEW</span>}
          </button>
        </li>
        <li>
          <button className='btn shadow' onClick={Finished}>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='9 11 12 14 22 4' /><path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' /></svg>
            Finished Tasks
          </button>
        </li>
      </ul>

      <div className='shadow items-center space-y-5 p-5 mt-5'>
        {table &&
          <div className='overflow-x-auto'>
            <p class='font-bold'>{type}</p>
            <table className='table'>
              <thead>
                <tr>
                  <th />
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
              </tbody>
            </table>
          </div>}
        {account &&
          <div>
            <form className=' flex flex-col space-y-3' onSubmit={handleSubmit}>
              {edit &&
                <p class='font-semibold text-base mb-2'>All Input Fields Are Now Editable!</p>}
              <div className='flex space-x-5'>
                <label className='input input-bordered flex items-center gap-2 min-w-[375px] text-sm'>
                  Username:
                  <input type='text' className='grow font-bold text-sm' placeholder='Change Username' defaultValue='Gaelord' disabled={!edit && 'disabled'} />
                </label>
                <label className='input input-bordered flex items-center gap-2 min-w-[375px] text-sm'>
                  Email:
                  <input type='text' className='grow font-bold text-sm' placeholder='Change Email' defaultValue='Email@mail' disabled={!edit && 'disabled'} />
                </label>
              </div>
              <div className='flex space-x-5'>
                <label className='input input-bordered flex items-center gap-2 min-w-[375px] text-sm'>
                  First Name:
                  <input type='text' className='grow font-bold text-sm' placeholder='Change First Name' defaultValue='Tron' disabled={!edit && 'disabled'} />
                </label>
                <label className='input input-bordered flex items-center gap-2 min-w-[375px] text-sm'>
                  Last Name:
                  <input type='text' className='grow font-bold text-sm' placeholder='Change Last Name' defaultValue='Uy' disabled={!edit && 'disabled'} />
                </label>
              </div>
              {editPass && edit &&
                <div className='flex space-x-5'>
                  <label className='input input-bordered flex items-center gap-2 text-sm '>
                    {editPass && 'New'} Password:
                    <input type='text' className='grow font-bold text-sm' placeholder='New Password' disabled={!edit && 'disabled'} />
                  </label>
                  <label className='input input-bordered flex items-center gap-2 text-sm '>
                    Confirm Password:
                    <input type='text' className='grow font-bold text-sm' placeholder='Confirm Password' disabled={!edit && 'disabled'} />
                  </label>
                </div>}
              {/* {newIcon && edit &&
                <div className="flex space-x-5 items-center">
                  <p class="font-semibold mt-2">Upload New Profile Picture</p>
                  <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs mt-2" />
                </div>
                } */}
              <div className='flex space-x-5'>
                {!editPass && edit && <button className='btn shadow max-w-[250px]' onClick={EditPass}>Edit Password</button>}
                {/* {!newIcon && edit && <button className="btn shadow max-w-[250px]" onClick={NewIcon}>Edit Profile Picture</button>} */}
                {edit && <button className='btn shadow max-w-[250px]' type='submit'>Save Changes</button>}
              </div>
            </form>
          </div>}
      </div>
    </div>
  )
}
