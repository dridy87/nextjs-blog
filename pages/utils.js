export function drawLine(list, typeDay) {

    var lineToline = [];


    for (var i = 0; i < typeDay; i++) {
        lineToline.push([]);
    }

    for (var i = typeDay; i < list.length; i++) {
        var sum = 0;
        for (var j = i - typeDay; j < i; j++) {
            sum += parseInt(list[j].close)
        }

        var dayCloseSum = sum / typeDay;

        lineToline.push([list[i].dt.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'), (dayCloseSum)]);
    }
    return lineToline;
}