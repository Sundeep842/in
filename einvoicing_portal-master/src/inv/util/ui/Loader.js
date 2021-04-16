import React from 'react'
import {
	Backdrop ,
	CircularProgress 
} from '@material-ui/core'
import './ui.css'


const Loader = (props) => {

	const { isLoading } = props
	
	return (
		<div className="service_loader">
			<Backdrop 
				open={isLoading}
				aria-labelledby = "ajax loader"
			>
				<div><CircularProgress /></div>
			</Backdrop>
		</div>
	)
}


export default Loader