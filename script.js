"use strict";

const closeModalBtn = document.querySelectorAll(".btn-close-modal");
const rulesBtn = document.querySelector(".btn-rules");
const modalBox = document.querySelector(".modal-box");
const overlay = document.querySelector(".overlay");

closeModalBtn.forEach((btn) =>
  btn.addEventListener("click", function () {
    modalBox.classList.add("hidden");
    overlay.classList.add("hidden");
  })
);

rulesBtn.addEventListener("click", function () {
  modalBox.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
