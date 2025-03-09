import { PropTypes } from "prop-types";
import { memo, useMemo } from "react";
import classnames from "classnames";

const ButtonComponent = ({ size, varient, children, ...rest }) => {
  const sizeName = useMemo(() => {
    return size && `btn-wrapper-${size}`;
  }, [size]);

  const varientName = useMemo(() => {
    return varient && `btn-${varient}`;
  }, [varient]);

  const combineClassNames = useMemo(() => {
    return classnames("btn-wrapper", sizeName);
  }, [sizeName]);

  const combineVarientNames = useMemo(() => {
    return classnames("btn", varientName);
  }, [varientName]);

  return (
    <div className={combineClassNames}>
      <button className={combineVarientNames} {...rest}>
        {children}
      </button>
    </div>
  );
};

export default memo(ButtonComponent);

ButtonComponent.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string.isRequired,
  varient: PropTypes.string.isRequired,
};
