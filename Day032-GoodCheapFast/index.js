const toggles = document.querySelectorAll('.toggle'),
      good = document.getElementById('good'),
      cheap = document.getElementById('cheap'),
      fast = document.getElementById('fast');

toggles.forEach( checkbox => {
    checkbox.addEventListener('change', e => {
        doTheTrick(e.target)
    })
})

function doTheTrick(target) {
    if(good.checked && cheap.checked && fast.checked) {
        if(good === target) {
            fast.checked = false
        }

        if(cheap === target) {
            good.checked = false
        }

        if(fast === target) {
            cheap.checked = false
        }
    }
}
