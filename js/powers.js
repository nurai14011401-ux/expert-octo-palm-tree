'use strict';
(() => {
 const tasks = window.POWERS_TASKS;
 const el = id => document.getElementById(id);
 let index = 0, score = 0, locked = false, mistakes = [];
 function render() {
  locked = false;
  const task = tasks[index];
  el('counter').textContent = 'Қадам: ' + (index + 1) + ' / ' + tasks.length;
  el('score').textContent = 'Ұпай: ' + score + ' / ' + tasks.length;
  el('stage').textContent = task.title;
  el('instruction').textContent = task.instruction;
  el('answer-label').textContent = task.instruction.includes('көрсеткішін') ? 'Дәреженің көрсеткіші' : 'Өрнектің мәні';
  el('expression').innerHTML = task.expression;
  el('answer').value = ''; el('answer').disabled = false; el('check').disabled = false;
  el('feedback').textContent = ''; el('feedback').className = 'feedback';
  el('next').hidden = true; el('answer-form').hidden = false; el('result').hidden = true;
  el('progress').value = index; el('answer').focus();
 }
 el('answer-form').addEventListener('submit', event => {
  event.preventDefault(); if (locked) return;
  const value = el('answer').value.trim().replace(/−/g, '-');
  if (!/^[+-]?\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
   el('feedback').textContent = 'Бүтін сан енгіз. Мысалы: 5 немесе −8.';
   el('feedback').className = 'feedback wrong'; el('answer').focus(); return;
  }
  locked = true; const task = tasks[index], correct = Number(value) === task.answer;
  if (correct) score++; else mistakes.push(index);
  el('score').textContent = 'Ұпай: ' + score + ' / ' + tasks.length;
  el('feedback').textContent = (correct ? 'Дұрыс! +1 ұпай. ' : 'Бұл жолы қате. Дұрыс жауап: ' + task.answer + '. ') + task.explanation;
  el('feedback').className = 'feedback ' + (correct ? 'correct' : 'wrong');
  el('answer').disabled = true; el('check').disabled = true;
  el('progress').value = index + 1;
  el('next').textContent = index === tasks.length - 1 ? 'Нәтижені көру →' : 'Келесі қадам →';
  el('next').hidden = false; el('next').focus();
 });
 el('next').addEventListener('click', () => {
  if (!locked) return;
  if (index < tasks.length - 1) {index++; render(); return;}
  el('next').hidden = true; el('answer-form').hidden = true;
  el('stage').textContent = 'Саяхат аяқталды!';
  el('instruction').textContent = 'Нәтижең: ' + score + ' / ' + tasks.length + ' ұпай.';
  el('expression').textContent = score === tasks.length ? 'Шың бағынды! 🏔' : 'Жарайсың, алға!';
  el('feedback').textContent = score >= 10 ? 'Дәреженің қасиеттерін жақсы меңгердің!' : score >= 7 ? 'Жақсы нәтиже! Қате кеткен ережелерді қайтала.' : 'Формулаларды қарап, тағы бір рет байқап көр. Әр қадам — тәжірибе!';
  const result = el('result'); result.replaceChildren(); result.hidden = false;
  const heading = document.createElement('h3'); heading.textContent = mistakes.length ? 'Қайталауға арналған қадамдар' : 'Барлық жауап дұрыс!'; result.append(heading);
  const list = document.createElement('ul');
  mistakes.forEach(i => {const li = document.createElement('li'); li.textContent = (i + 1) + '-қадам. ' + tasks[i].explanation; list.append(li);}); result.append(list);
 });
 el('restart').addEventListener('click', () => {index = 0; score = 0; mistakes = []; render();});
 el('fullscreen').addEventListener('click', async () => {
  try {if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen();}
  catch {el('feedback').textContent = 'Толық экран үшін браузердегі F11 пернесін қолдан.';}
 });
 document.addEventListener('fullscreenchange', () => {el('fullscreen').textContent = document.fullscreenElement ? 'Экраннан шығу' : 'Толық экран';});
 render();
})();
