import { Suspense } from 'react'
import { ThemeProvider } from '@material-ui/core'
import theme from './inv/util/themes/theme'
import Routes from './Routes'
import { useRoutes } from "react-router-dom"


const Loader = () => {
  return (
    <div>App Loading ....</div>
  )
}


function App() {
  let routes = useRoutes(Routes)
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loader />}>
        {routes}
      </Suspense>
    </ThemeProvider>
  );
}

export default App
