import React from "react";

const HorizontalDivider = React.forwardRef((_, ref) => {
    return <hr ref={ref} className="my-4 text-dark opacity-100" />;
});

export default HorizontalDivider;
