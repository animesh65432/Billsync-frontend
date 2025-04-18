import { Landingpage } from "@/pages"
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
