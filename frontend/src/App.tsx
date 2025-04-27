import { Landingpage, Dashborad, Singup, Singin } from "@/pages"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { ThemeColorProvider, MainLayout } from "@/components"
function App() {
  return (
    <ThemeColorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/singup" element={<Singup />}></Route>
          <Route path="/singin" element={<Singin />}></Route>
          <Route path="/Dashborad" element={
            <MainLayout>
              <Dashborad />
            </MainLayout>
          }></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ThemeColorProvider>
  )
}

export default App
