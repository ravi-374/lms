import React from 'react';
import {connect} from 'react-redux';
import TopBarProgress from 'react-topbar-progress-indicator';
import progressConfig from '../../config/progressbarConfig';

TopBarProgress.config({progressConfig});

const ProgressBar = (props) => {
    const {isLoading} = props;
    if (isLoading) {
        return (<TopBarProgress/>)
    } else {
        return ('');
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.isLoading || ownProps.isLoading
    };
};

export default connect(mapStateToProps)(ProgressBar);
