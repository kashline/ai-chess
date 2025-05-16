import React from "react";
import "./LoadingSpinner.css"; // External CSS file

export default function LoadingSpinner() {
  return (
    <div className="pawn-spinner">
      <div className="dot head" />
      <div className="dot neck" />
      <div className="dot shoulder-left" />
      <div className="dot shoulder-right" />
      <div className="dot body-left" />
      <div className="dot body-right" />
      <div className="dot base-left" />
      <div className="dot base-right" />
      <div className="dot base-center" />
    </div>
  );
}
