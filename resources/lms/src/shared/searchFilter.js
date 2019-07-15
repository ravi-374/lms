export default (items = [], searchText = '') => {
    if (searchText) {
        return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
    }
    else {
        return items;
    }
}
