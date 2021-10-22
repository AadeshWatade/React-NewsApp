import React from 'react'
import loading from './loading.gif'

const Spinner = (props) => {
        return (
            <div className='text-center my-5' style={{color:props.mode==='light'?'black':'white' }}>
                <img src={loading} alt="loading" />Loading...
            </div>
        )
    }

export default Spinner