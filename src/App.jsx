import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./routes/Layout";
import Me from "./routes/Me";
import Home from "./routes/Home";
import LoginPage from "./routes/LoginPage";
import NoPage from "./routes/NoPage";
import Callback from "./routes/Callback";

import { RequireAuth } from './utils/Auth';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/me" element={<RequireAuth><Me /></RequireAuth>} />
        <Route path="/callback" element={<Callback />} />
        <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;