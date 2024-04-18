import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import MarsRoverPhotos from "./components/Dashboard/MarsRoverPhotos";
import APOD from "./components/Dashboard/APOD";
import ImageSearch from "./components/Dashboard/ImageSearch";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/" || location.pathname === "/registration";

  return (
    <>
      {!hideHeader && <Header />}
      <main className="container mx-auto flex-grow my-8">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route exact path="/mars" element={<MarsRoverPhotos />} />
          <Route exact path="/apod" element={<APOD />} />
          <Route exact path="/image-search" element={<ImageSearch />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
