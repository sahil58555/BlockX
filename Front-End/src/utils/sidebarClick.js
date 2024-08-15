export const logout = (navigate, url) => {
  navigate(url);
};

const handleItemClick = (item, setSelected, navigate) => {
  if (item === "Employees") {
    navigate("/admin-employee-section");
  } else if (item === "Finance") {
    navigate("/finance-dashboard");
  } else if (item === "Dashboard") {
    navigate("/hr-dashboard");
  } else if (item === "Fun Game") {
    window.location.href =
      "https://flip-the-beats-node-js-version-frontend.onrender.com/";
  } else if (item === "Convert to Fiat") {
    window.location.href = "https://onramp.money/main/sell/?appId=1";
  }
  setSelected(item);
};

export default handleItemClick;
