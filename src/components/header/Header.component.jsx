import { memo, useCallback, useMemo, useState } from "react";
//component
import CustomInputComponent from "../cutomInput/CustomInput.component";

//icons
import { FaSearch } from "react-icons/fa";
import classnames from "classnames";

const HeaderComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleFocused = useCallback(() => {
    setShow(true);
  }, []);

  const activeClass = useMemo(() => {
    return show && "active";
  }, [show]);

  const combineClassNames = useMemo(() => {
    return classnames("header-dropdown", activeClass);
  }, [activeClass]);

  return (
    <div className="header-container">
      <div className="header-wrapper">
        <div className="header-searchbar">
          <div className="header-searchbar__label">
            <p>Search from Here</p>
          </div>
          <div className="header-searchbox">
            <CustomInputComponent
              id="search"
              size="lg"
              type="text"
              name="search"
              onChange={handleChange}
              onFocus={handleFocused}
              icon={<FaSearch />}
            />
            <div className={combineClassNames}>
              <p>Dropdown1</p>
              <p>Dropdown2</p>
              <p>Dropdown3</p>
              <p>Dropdown4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderComponent);
