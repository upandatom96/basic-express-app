function readCsv(csv) {
    const lines = csv.split("\r\n");
    const result = [];

    const headers = lines[0].split(",");

    lines.forEach((line, index) => {
        if (index === 0) {
            return; // headers
        }
        const obj = {};
        const currentLine = line.split(",");

        headers.forEach((header, index) => {
            obj[header] = currentLine[index];
        })

        result.push(obj);
    });

    return result;
}

module.exports = {
    readCsv,
}
