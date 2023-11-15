/* eslint-disable react/prop-types */

import Part from "../Part/Part"

const Content = ({data}) => {

  const parts = data.map((item) => item.exercises)
  // console.log(parts)
  //console.log(data)
  const total = parts.reduce((s,p) => {
    return s + p
  })
  //console.log(total)
  return (
    <>
        {data.map(dat => {            
            return (
                <Part key={dat.id} data={dat}></Part>                                
            )
        })
        }
        <h4>Total of {total} exercises</h4>
    </>
  )
}

export default Content