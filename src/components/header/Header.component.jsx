/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
//component
import CustomInputComponent from "../cutomInput/CustomInput.component";

//icons
import { FaSearch } from "react-icons/fa";
import classnames from "classnames";

const HeaderComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();
  const inputBoxRef = useRef();

  const dummyData = [
    "Dropdown1",
    "Dropdown2",
    "Dropdown3",
    "Dropdown4",
    "Apple",
    "Banana",
    "Orange",
  ];

  const filteredData = useMemo(() => {
    if (!searchValue) {
      return dummyData;
    }
    return dummyData.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [dummyData, searchValue]);

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
  const handleCloseOut = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      inputBoxRef &&
      !inputBoxRef.current.contains(e.target)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseOut);
    return () => document.removeEventListener("mousedown", handleCloseOut);
  }, []);

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
              ref={inputBoxRef}
            />
            <div className={combineClassNames} ref={dropdownRef}>
              {filteredData.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderComponent);
