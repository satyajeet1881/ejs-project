import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import { Home } from './components/home'
import { Route, Routes } from 'react-router-dom'
import { LoginComponent } from './components/login'
import { ResultData } from './components/resultData'
import { NotFound } from './components/notFound'
import CheckAuth from './authenticatedRoutes/authenticatedRoute'
import { Dashboard } from './components/dashboard'
import { storageActions } from './actions'
function App() {
  let dateUrl = new Date()
  const isAuthenticated = storageActions.getItem('isAuthenticated')
  const day = dateUrl.getDate()
  const month = dateUrl.getMonth() + 1
  const logURL = "login"
  console.log(logURL);
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/result' element={<ResultData />} />
        <Route exact path={logURL} element={<LoginComponent />} />\
        <Route
          // exact path='/board'
          element={
            <CheckAuth>
              <Dashboard />
            </CheckAuth>
          }
        >
          <Route exact path='/board' element={<Dashboard />}></Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App