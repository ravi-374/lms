import React from "react";
import {Tooltip} from 'reactstrap';

class TooltipItem extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
        this.state = {
            placement: !props.placement ? 'top' : props.placement
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {
        return (
            <span>
                <Tooltip placement={this.state.placement} isOpen={this.state.tooltipOpen}
                         target={this.props.target} toggle={this.toggle}>
                    {this.props.tooltip}
                </Tooltip>
             </span>
        );
    };
}

export default TooltipItem;
