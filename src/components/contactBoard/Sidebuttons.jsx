import "./SideButtons.css";
import { FaPencilAlt, FaMapMarkerAlt } from "react-icons/fa";
import { HiDocument } from "react-icons/hi";

export default function SideButtons() {
  return (
    <div className="left-panel">

      {/* INTRO */}
      <button className="side-button">
        <span className="screw top-left"></span>
        <span className="screw top-right"></span>
        <span className="screw bottom-left"></span>
        <span className="screw bottom-right"></span>
        <FaPencilAlt className="button-icon" />
        <h3>INTRO</h3>
      </button>

      {/* RESUME */}
      <button className="side-button">
        <span className="screw top-left"></span>
        <span className="screw top-right"></span>
        <span className="screw bottom-left"></span>
        <span className="screw bottom-right"></span>
        <HiDocument className="button-icon" />
        <h3>RESUME</h3>
      </button>

      {/* LOCATION */}
      <button className="side-button">
        <span className="screw top-left"></span>
        <span className="screw top-right"></span>
        <span className="screw bottom-left"></span>
        <span className="screw bottom-right"></span>
        <FaMapMarkerAlt className="button-icon" />
        <h3>BOKARO STEEL CITY, JHARKHAND (READY TO RELOCATE)</h3>
      </button>

    </div>
  );
}
