import React from "react";
import EmptyIcon from "../assets/imgs/empty.png";
import "../styles/empty.scss";

const EmptyData = (): JSX.Element => {
    return (
        <div className="empty-data">
            <img src={EmptyIcon} alt="empty-icon" width={158} height={158} />
            <p className="empty-message">
                We could not find weather information for the location above
            </p>
        </div>
    );
};

export default EmptyData;
