function initPrompt() {

    function isPromptVisible() {
        return $('#prompt').css('display') === 'block'
    }

    function showPrompt(dateString) {
        const $prompt = $('#prompt')
        $prompt.show('fast').modal()
        $('#prompt h2').text('New Event at ' + dateString)
        $('#prompt button').off('click').on('click', () => {
            $prompt.hide('fast', () => {
                $prompt.modal('hide')
            })
        })
    }

    return {
        showPrompt,
        isPromptVisible
    }
}