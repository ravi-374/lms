export const prepareRoles = (roles) => {
    let rolesArray = [];
    roles.forEach(role => rolesArray.push({ id: role.id, name: role.display_name }));
    return rolesArray;
};