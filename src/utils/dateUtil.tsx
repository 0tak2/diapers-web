const twoDigitsHelper = (val: string) => {
    if (val.length === 1) {
        return '0' + val;
    } else {
        return val;
    }
}

export const dateHelper = (dateRaw: string, withTime: boolean = false) => {
    const dt = new Date(dateRaw);

    const YY = dt.getFullYear().toString();
    const MM = (dt.getMonth()+1).toString();
    const DD = dt.getDate().toString();
    const hh = dt.getHours().toString();
    const mm = dt.getMinutes().toString();

    if(withTime) {
        return YY+'-'+twoDigitsHelper(MM)+'-'+twoDigitsHelper(DD) + ' ' + twoDigitsHelper(hh) + ':' +  twoDigitsHelper(mm);
    } else {
        return YY+'-'+twoDigitsHelper(MM)+'-'+twoDigitsHelper(DD);
    } 
}

export const timeNowHelper = (withTime: boolean = false) => {
    const dt = new Date();

    const YY = dt.getFullYear().toString();
    const MM = (dt.getMonth()+1).toString();
    const DD = dt.getDate().toString();
    const hh = dt.getHours().toString();
    const mm = dt.getMinutes().toString();

    if(withTime) {
        return YY+'-'+twoDigitsHelper(MM)+'-'+twoDigitsHelper(DD) + ' ' + twoDigitsHelper(hh) + ':' +  twoDigitsHelper(mm);
    } else {
        return YY+'-'+twoDigitsHelper(MM)+'-'+twoDigitsHelper(DD);
    } 
}