function initCalendar() {
    let current = new Date()
    let show = new Date(current.getFullYear(), current.getMonth(), 1)
    let init = false

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    function nextMonth() {
        show.setMonth(show.getMonth() + 1)
        updateVisuals()
    }

    function previousMonth() {
        show.setMonth(show.getMonth() - 1)
        updateVisuals()
    }

    function resetDate() {
        show.setMonth(current.getMonth())
        show.setFullYear(current.getFullYear())
        updateVisuals()
    }

    function updateVisuals() {
        $('h1').text(monthNames[show.getMonth()] + ', ' + show.getFullYear())
        const tds = $('#calendar td')
        const thisMonthDays = daysInMonth()
        let index = 0
        let day = new Date(show.getFullYear(), show.getMonth() - 1, daysInMonth(true) - show.getDay() + 1)
        if (init) {
            reduceOpacity(tds)
        } else {
            updateCalendarCells()
        }


        function updateCalendarCells() {
            tds.removeClass('notCurrentCell').removeClass('highlightCell').removeClass('highlightCellFromAnotherMonth')
            for (; index < tds.length; index++, day.setDate(day.getDate() + 1)) {
                tds.eq(index).data('dateString', day.getDate() + ' ' + monthNames[day.getMonth()] + ', ' + day.getFullYear()).text(day.getDate())
                if (current.getFullYear() === day.getFullYear() && current.getMonth() === day.getMonth() && current.getDate() === day.getDate() && show.getMonth() !== current.getMonth()) {
                    tds.eq(index).addClass('highlightCellFromAnotherMonth')
                } else if (show.getFullYear() !== day.getFullYear() || show.getMonth() !== day.getMonth()) {
                    tds.eq(index).addClass('notCurrentCell')
                } else if (current.getFullYear() === day.getFullYear() && current.getMonth() === day.getMonth() && current.getDate() === day.getDate()) {
                    tds.eq(index).addClass('highlightCell')
                }
            }
            if (init) {
                resetOpacity()
            }
        }

        function reduceOpacity() {
            tds.velocity({
                opacity: 0.05
            }, 150, updateCalendarCells)
        }

        function resetOpacity() {
            tds.velocity({
                opacity: 1
            }, 150)
        }

    }



    function daysInMonth(ofPreviousMonth) {
        if (ofPreviousMonth) {
            return new Date(show.getFullYear(), show.getMonth(), 0).getDate()
        } else {
            return new Date(show.getFullYear(), show.getMonth() + 1, 0).getDate()
        }
    }

    resetDate()
    init = true

    return {
        previousMonth,
        nextMonth,
        resetDate
    }
}