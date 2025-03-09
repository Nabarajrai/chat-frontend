import { memo } from "react";
import { useCallback } from "react";
import { PropTypes } from "prop-types";

const CustomInputComponent = ({
  id,
  value,
  setValue,
  type,
  label,
  icon,
  ...rest
}) => {
  const handleValue = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );
  console.log("Custom");
  return (
    <div className="custom-input">
      <div className="input-group">
        <input
          type={type}
          value={value}
          {...rest}
          onChange={handleValue}
          id={id}
          placeholder=""
          className="input-group__input"
        />
        <label htmlFor="input" className="input-group__label">
          {label}
        </label>
        {icon && <span className="input-group__icon">{icon}</span>}
      </div>
    </div>
  );
};

export default memo(CustomInputComponent);

CustomInputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.node,
};
