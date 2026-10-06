"use strict";

const form = document.querySelector("#answer-form");
const answer = document.querySelector("#answer");
const feedback = document.querySelector("#feedback");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = answer.value.trim().replace(",", ".");
  if (!/^[+-]?\d+(?:\.\d+)?$/.test(value) || !Number.isFinite(Number(value))) {
    answer.setAttribute("aria-invalid", "true");
    feedback.textContent = "Введи ответ числом, затем нажми «Проверить».";
    answer.focus();
    return;
  }
  answer.removeAttribute("aria-invalid");
  feedback.textContent = Number(value) === 25
    ? "Верно! x = 42 − 17 = 25. Проверка: 25 + 17 = 42."
    : "Пока не сходится. Вычти 17 из 42 и попробуй ещё раз.";
});

answer.addEventListener("input", () => {
  feedback.textContent = "";
  answer.removeAttribute("aria-invalid");
});

form.addEventListener("reset", () => {
  feedback.textContent = "";
  answer.removeAttribute("aria-invalid");
  document.querySelector("details").open = false;
  answer.focus();
});
