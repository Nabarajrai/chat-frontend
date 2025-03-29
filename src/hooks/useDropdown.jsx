import { useState, useCallback } from "react";
export const useDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggle = useCallback(() => setShowDropdown((prev) => !prev), []);
  return { showDropdown, setShowDropdown, toggle };
};
