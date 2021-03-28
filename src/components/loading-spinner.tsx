import React, { useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
    loading: boolean;
}
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const LoadingSpinner = ({ loading }: Props): JSX.Element => {
    const [color] = useState<string>("#ffffff");

    return (
        <ClipLoader color={color} loading={loading} css={override} size={150} />
    );
};

export default LoadingSpinner;
