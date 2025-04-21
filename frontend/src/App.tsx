import { Landingpage, Dashborad, Singup, Singin } from "@/pages"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/singup" element={<Singup />}></Route>
          <Route path="/singin" element={<Singin />}></Route>
          <Route path="/Dashborad" element={<Dashborad />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
