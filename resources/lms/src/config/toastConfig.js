let id = 0;

const defaultOptions = {
    color: "#28a745"
};

export default (options) => {
    return {...defaultOptions, ...options, id: id++}
};
