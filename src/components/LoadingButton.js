import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoadingButton = ({ isLoading, title, className, onClick, disabled }) => {
  return (
    <React.Fragment>
      <button
        type="submit"
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {isLoading ? (
          <>
            <ClipLoader
              css={override}
              aria-label={title}
              size={20}
              color={"#fff"}
            />
          </>
        ) : (
          title
        )}
      </button>
    </React.Fragment>
  );
};

export default LoadingButton;
