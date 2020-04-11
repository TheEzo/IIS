import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => (
    <div className="d-flex justify-content-center">
        <ScaleLoader
            color={"black"}
            height={100}
            width={50}
            radius={10}
            margin={5}
        />
    </div>
);

export default Loader;