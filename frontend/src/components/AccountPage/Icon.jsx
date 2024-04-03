import React, { useState } from 'react'

export default function Icon({ iconLink , userName}) {

  let initial = userName.charAt(0);

  if (iconLink){
    return (
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={ iconLink } />
        </div>
      </div>
      )
  }else{
    return (
      <div className="avatar placeholder justify-items-center">
        <div className="bg-neutral text-neutral-content rounded-full w-24">
          <span className="text-3xl">{ initial }</span>
        </div>
      </div> 
      )
  }   
}