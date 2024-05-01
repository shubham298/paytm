import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Dashboard from './profiles/Dashboard'
import SignUp from './profiles/SignUp'
import SignIn from './profiles/SignIn'
import SendMoney from './profiles/SendMoney'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
