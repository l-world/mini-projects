const btn = document.querySelector(".seach_btn"),
      input = document.querySelector(".input");

btn.addEventListener("click", e => {
    console.log(11);
    input.classList.toggle('display');
})