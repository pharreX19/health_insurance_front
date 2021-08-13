export const can = function(values) {
    if (typeof values == 'string') {
        values = values.split(',');
    }

    return values.some(permission => {
        return window.permissions[permission] ? true : false;
    });
};

export const is = function (values) {
    if (typeof values == 'string') {
        values = values.split(',');
    }

    return values.some(role => {
        return window.roles[role] ? true : false;
    });
};