const wraps = document.querySelectorAll(".wrap");
wraps.forEach(ele => {
    ele.addEventListener("click", () => {
        removeActiveClass();
        ele.classList.add('active');
    })
});

function removeActiveClass() {
    wraps.forEach(ele => {
        ele.classList.remove('active');
    });
}