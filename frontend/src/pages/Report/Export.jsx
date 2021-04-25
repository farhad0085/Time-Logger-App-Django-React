import React from 'react'


const Export = ({ data }) => {

  return (
    <span style={{ float: "right" }}>
      <span>
        <i
          className="far fa-file-excel"
          style={{ color: "green", marginRight: '10px', cursor: 'pointer' }}
          onClick={() => data?.excel && window.open(data.excel)}
        > Excel</i>
      </span>
      <span>
        <i
          className="far fa-file-pdf"
          style={{ color: "orange", cursor: 'pointer' }}
          onClick={() => data?.pdf && window.open(data.pdf)}
        > PDF</i>
      </span>
    </span>
  )

}


export default Export