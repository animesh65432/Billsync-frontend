import { Landingpage, Dashborad, Singup, Singin, InvoiceFrom, Viewinvoice, UpdateInoicePage } from "@/pages"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeColorProvider, MainLayout } from "@/components"
import { useStore } from "@/store"
function App() {
  const { token } = useStore()
  const isLogin = !!token
  return (
    <ThemeColorProvider>
      <GoogleOAuthProvider clientId="971564642749-kob8boemlh2paosvq95ko2cc1mcplce7.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/singup" element={<Singup />} />
            <Route path="/singin" element={<Singin />} />


            {isLogin ? (
              <>
                <Route
                  path="/Dashborad"
                  element={
                    <MainLayout>
                      <Dashborad />
                    </MainLayout>
                  }
                />
                <Route
                  path="/create-invoice"
                  element={
                    <MainLayout>
                      <InvoiceFrom />
                    </MainLayout>
                  }
                />
                <Route
                  path="/update-invoice/:id"
                  element={
                    <MainLayout>
                      <UpdateInoicePage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/view-invoice/:id"
                  element={
                    <MainLayout>
                      <Viewinvoice />
                    </MainLayout>
                  }
                />
              </>
            ) : (
              <>
                <Route path="/Dashborad" element={<Navigate to="/singin" />} />
                <Route path="/create-invoice" element={<Navigate to="/singin" />} />
                <Route path="/update-invoice/:id" element={<Navigate to="/singin" />} />
                <Route path="/view-invoice/:id" element={<Navigate to="/singin" />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
      <ToastContainer />
    </ThemeColorProvider>
  )
}

export default App
