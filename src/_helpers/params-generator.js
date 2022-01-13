export const generaParams = (obj) => {
    var str = [];
    var params = []
    for (var p in obj) {
        params = []

        if (obj[p].length) {
            for (var k in obj[p])
                params.push(obj[p][k])
            str.push(encodeURIComponent(p) + "=" + params.join(","));
        }
    }
    return str.length ? "?" + str.join("&") : "";
}

export default generaParams;