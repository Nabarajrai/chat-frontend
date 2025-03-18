import { memo, useMemo } from "react";
import { PropTypes } from "prop-types";
import classnames from "classnames";

const CustomInputComponent = ({
  id,
  size,
  onChange,
  type,
  label,
  icon,
  handleShowPassword,
  ...rest
}) => {
  const sizeClassName = useMemo(() => {
    return size && `custom-input-${size}`;
  }, [size]);

  const combineClassNames = useMemo(() => {
    return classnames("custom-input", sizeClassName);
  }, [sizeClassName]);

  return (
    <div className={combineClassNames}>
      <div className="input-group">
        <input
          type={type}
          {...rest}
          onChange={onChange}
          id={id}
          placeholder=""
          className="input-group__input"
        />
        {label && (
          <label htmlFor="input" className="input-group__label">
            {label}
          </label>
        )}
        {icon && (
          <span
            className="input-group__icon"
            onClick={id === "password" ? handleShowPassword : undefined}>
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(CustomInputComponent);

CustomInputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.node,
  size: PropTypes.string,
  handleShowPassword: PropTypes.func,
};
