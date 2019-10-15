import React from "react";

function Header({ children }) {
  return (
    <nav style={{ background: "lightgrey" }}>
      <h1>{children}</h1>
    </nav>
  );
}

export default Header;
