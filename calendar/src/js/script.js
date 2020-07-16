$(() => {
    const table = initCalendar()
    const prompt = initPrompt()
    $('#back').on('click', table.previousMonth)
    $('#forward').on('click', table.nextMonth)
    $('#today').on('click', table.resetDate)
    $('#calendar td').on('click', (event) => {
        if (!prompt.isPromptVisible()) prompt.showPrompt($(event.target).data('dateString'))
    })
})