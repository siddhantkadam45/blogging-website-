
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Create from './pages/Create'
import Showblgo from './pages/Showblgo'
import { RecoilRoot } from 'recoil'
import Defaultpage from './pages/Home'

export default function App() {
	return (
		<RecoilRoot>
			<BrowserRouter>
			<Routes>
				<Route path='/' element={<Defaultpage />} />
				<Route path='signup' element={<Signup />} />
				<Route path='signin' element={<Signin />} />
				<Route path='blog' element={<Blog />} />
				<Route path='create' element={<Create />} />
				<Route path='showpath' element={<Showblgo />} />
				{/* <Route path */}
			</Routes>
		</BrowserRouter>
		</RecoilRoot>
	)
}


