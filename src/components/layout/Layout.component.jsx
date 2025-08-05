import PropsTypes from "prop-types";
import HeaderComponent from "../header/Header.component";
import SidebarComponent from "../sidebar/Sidebar.component";

const LayoutComponent = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <HeaderComponent />
      <div className="layout-section">
        <div className="layout-content">
          <SidebarComponent />
        </div>
        <div className="layout-main">{children}</div>
      </div>
    </div>
  );
};

export default LayoutComponent;

LayoutComponent.propTypes = {
  children: PropsTypes.node.isRequired,
};
