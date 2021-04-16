import React from 'react'

// this is a class based component and catched only error while component loading in react
class ErrorBoundary extends React.Component  {

	constructor(props) {
		super(props)
		this.state = { hasError : false }
	}

	static getDerivedStateFromError(error) {
    	 return { hasError: true };
  	}

  	componentDidCatch(error, errorInfo) {
    	//logErrorToMyService(error, errorInfo);
    	console.log('component catched errors')
  	}

  	render() {
	    if (this.state.hasError) {
	      return <h1>Something went wrong </h1>
	    }
	    return this.props.children; 
  	}
}
export default ErrorBoundary