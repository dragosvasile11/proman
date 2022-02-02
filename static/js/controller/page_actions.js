document.addEventListener('click', e => {
    if (e.target.id === 'id01' || e.target.id === 'id02') {
        e.target.style = 'none'
    }
})
