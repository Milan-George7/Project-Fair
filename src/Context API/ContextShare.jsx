import React, { createContext, useState } from 'react'
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()

function ContextShare({children}) {
    //creating state for state lifting using context 
 const [addProjectResponse,setAddProjectResponse]= useState("")
 const [editProjectResponse,setEditProjectResponse]= useState("")
  return (
    <>
        <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
            <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
              {children}
            </editProjectResponseContext.Provider>
        </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare