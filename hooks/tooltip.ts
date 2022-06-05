import { useEffect, useState } from "react";

const tooltip = () => {
  const [tooltip1Visible, setTooltip1Visible] = useState("hidden");
  const [tooltip2Visible, setTooltip2Visible] = useState("hidden");

  useEffect(() => {
    setTimeout(() => {
      setTooltip1Visible("");
    }, 3000);
    setTimeout(() => {
      setTooltip2Visible("");
    }, 4000);
  }, []);

  return {
    tooltip1Visible,
    setTooltip1Visible,
    tooltip2Visible,
    setTooltip2Visible,
  };
};

export default tooltip;
