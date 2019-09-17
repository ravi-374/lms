import React, {useState} from "react";
import {Tooltip} from 'reactstrap';

const TooltipItem = ({ tooltip, target, placement = 'top' }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => {
        setTooltipOpen(!tooltipOpen)
    };
    return (
        <Tooltip placement={placement} isOpen={tooltipOpen} target={target} toggle={toggle}>
            {tooltip}
        </Tooltip>
    );
};

export default TooltipItem;
