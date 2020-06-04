export const getTime = (day) => {
    var d = new Date();
    d.setDate(d.getDate()+day);
    return d.getTime();
};
