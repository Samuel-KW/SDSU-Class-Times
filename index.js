const elemsClasses = document.querySelector('div.ps_box-scrollarea.psc_margin-none.psc_padding-none.psc_border-bottomonly').children;

const classData = {};

for (let i = 0; i < elemsClasses.length; ++i) {
    
    const elemParent = elemsClasses[i].getElementsByClassName('ps_box-scrollarea-row')[0];
    const [elemStatus, elemClass] = elemParent.children

    const className = elemsClasses[i].querySelector('a.ps-link').innerText;
    const [classType, startEnd, time, room] = elemClass.getElementsByClassName('ps_grid-cell');
    
    const statusCells = elemStatus.getElementsByClassName('ps_grid-cell');
    const status = statusCells[0].innerText;

    let waitlist, units, gradingBasis, grade, program, requirement;
    if (status == 'Waiting')[, waitlist, units, gradingBasis, grade, program, requirement] = [...elemStatus.getElementsByClassName('ps_grid-cell')].map(e => e = e.innerText);
    else [, units, gradingBasis, grade, program, requirement] = [...elemStatus.getElementsByClassName('ps_grid-cell')].map(e => e = e.innerText);

    const startEndDates = startEnd.innerText.match(/(\d{1,2}\/\d{1,2}\/\d{1,4})/g).map(e => new Date(e));
    
    let classDays, classTimes;
    if (!time.innerText.includes('To be Announced')) {
        classDays = time.innerText.match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/g);
        classTimes = time.innerText.match(/\d{1,2}:\d{2}(?:AM|PM)/g);
    }

    classData[className] = {
        room: room.getElementsByClassName('ps_box-value')[0].textContent,
        classType: classType.innerText,
        startDate: startEndDates[0],
        endDate: startEndDates[1],
        classDays, classTimes, waitlist,
        units, gradingBasis, grade,
        program, requirement, status,
    };
}

console.log(classData);