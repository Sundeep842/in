// main component 
import React , { useEffect , useState } from 'react'
import {
	Grid,
	TextField,
	Button
} from '@material-ui/core'
import { Formik } from 'formik'
import { useDispatch, useSelector } from "react-redux"
import { useFormSlice } from './slice'
import {
	selectError,
	selectLoading, 
	selectIsFormSubmitted,
	selectName,
	selectAddress
} from './slice/selectors'

const RD = () => {

	const { actions } = useFormSlice()
	const dispatch = useDispatch()
	const loading = useSelector(selectLoading)
	const error  = useSelector(selectError)
	const isSubmitted  = useSelector(selectIsFormSubmitted)
	const _name  = useSelector(selectName)
	const _address = useSelector(selectAddress)

	const params = {
		name: _name,
		address: _address
	}

	const submitForm = (values) => {
		dispatch(actions.submitForm(values))
	}

	const useEffectOnMount = (effect) => {
    	useEffect(effect, []);
  	};

	useEffectOnMount(() => {
		dispatch(actions.loadFormDetails());
  	});

	console.dir(params)  
		
	return (
		<div className="container">
			{ !isSubmitted  && (
			<Formik
				initialValues={params}
				onSubmit={ (values) => {
					submitForm(values)
				}}
				enableReinitialize={true}
			>
				{({ values, handleBlur, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<TextField
									name="name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									label="name"
									fullWidth
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									name="address"
									value={values.address}
									onChange={handleChange}
									onBlur={handleBlur}
									label="address"
									fullWidth
									variant="outlined"
								/>
							</Grid>
						</Grid>
						<Button 
							type="submit"
							variant="contained"
							disabled={loading}
						> Submit Form</Button>
					</form>
				)}
			</Formik> )}

			{ loading && ( <div> Loading something</div>)}

			{ error && ( <div> an error in the component</div>)}

			{ isSubmitted && ( <div> Thanks for submitting form</div>)}
		</div>
	)
}
export default RD