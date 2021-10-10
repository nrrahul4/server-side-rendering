import React, { useEffect, useState } from "react";

export default function Home() {
  const [state, setstate] = useState(window && window.preloadedData);
  useEffect(() => {
    if (window && !window.preloadedData) {
      fetch("/api/getUsername")
        .then((response) => response.json())
        .then((data) => setstate(data));
    }
  }, []);

  return <div>Hi ${state}</div>;
}
