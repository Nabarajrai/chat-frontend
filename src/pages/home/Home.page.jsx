import { useCallback, useContext } from "react";
//context
import { UserContext } from "../../context";
//helpers
import { clearLocalStorage } from "../../helpers/LocatStorage.helper";

//component
import HeaderComponent from "../../components/header/Header.component";
import SidebarComponent from "../../components/sidebar/Sidebar.component";
const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  console.log("HomePage", currentUser);
  const handleLogOut = useCallback(() => {
    clearLocalStorage();
    window.location.href = "/";
  }, []);
  return (
    <div className="dashboard-container">
      <HeaderComponent />
      <div className="dashboard-main-section">
        <div className="dashboard-right">
          <SidebarComponent />
        </div>
        <div className="dashboard-left  ">Home HomePage</div>
      </div>
      {/* <div className="dashboard-wrapper">Home HomePage</div>
      <button onClick={handleLogOut}>Loutout</button> */}
    </div>
  );
};

export default HomePage;
