export default ({text, textLength = 100}) => {
    const truncate = () => {
        if (text.length > textLength) {
            return text.slice(0, textLength) + '...';
        }
        return text;
    };
    return truncate(text);
};
