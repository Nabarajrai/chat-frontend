import { useCallback } from "react";
import classnames from "classnames";

export const useClassName = () => {
  const activeClassName = useCallback((boolean, className) => {
    return boolean ? className : "";
  }, []);

  const combinedClassName = useCallback((classNames, activeStatusClass) => {
    const combined = classnames(classNames, activeStatusClass);
    return combined;
  }, []);

  return { activeClassName, combinedClassName };
};
