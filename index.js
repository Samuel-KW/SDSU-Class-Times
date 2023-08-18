const elemsClasses = document.querySelector('div.ps_box-scrollarea.psc_margin-none.psc_padding-none.psc_border-bottomonly').children;

const classData = {};

for (let i = 0; i < elemsClasses.length; ++i) {
    
    const elemParent = elemsClasses[i].getElementsByClassName('ps_box-scrollarea-row')[0];
    const [elemStatus, elemClass] = elemParent.children

    const className = elemsClasses[i].querySelector('a.ps-link').innerText;
    const [classType, startEnd, time, room] = elemClass.getElementsByClassName('ps_grid-cell');

    const startEndDates = startEnd.innerText.match(/(\d{1,2}\/\d{1,2}\/\d{1,4})/g).map(e => new Date(e));
    
    let timeStart, timeEnd;

    if (!time.innerText.includes('To be Announced')) {
        timeStart = time.innerText.match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/g);
        timeEnd = time.innerText.match(/\d{1,2}:\d{2}(?:AM|PM)/g);
    }

    classData[className] = {
        classType: classType.innerText,
        startDate: startEndDates[0],
        endDate: startEndDates[1],
        room: room.textContent,
        timeStart,
        timeEnd,
    };
}

console.log(classData);