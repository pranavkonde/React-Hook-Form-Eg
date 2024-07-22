import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";


import AccordionComponent from "./AccordionComponent";
import DraftData from "./DraftData";
import Slider from "./Slider";



function StepperForm() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/submit" element={<AccordionComponent />} />
        <Route path="/draft" element={<DraftData />} />
        <Route path="/edit/:id" element={<Slider />} />
      </Routes>
    </Router>
  );
}

export default StepperForm;
