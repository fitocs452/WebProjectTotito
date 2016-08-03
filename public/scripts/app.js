var jugador = 1;
var grid_matrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

function evaluar_empate() {
  // Se verifican todas las casillas y si no hay mas formas de moverse y no hay ganador
  // es empate, se retorna true
  for (var fila = 0; fila <= 2; fila++) {
    for (var columna = 0; columna <= 2; columna++) {
      if (grid_matrix[fila][columna] === 0) {
        return false;
      }
    }
  }

  return true;
}

function verificar_jugada(j, i) {
  if (evaluar_empate()){
    return -1;
  }

  if (grid_matrix[j][0] === grid_matrix[j][1] && grid_matrix[j][1] === grid_matrix[j][2]){
    return grid_matrix[j][i];
  }

  if (grid_matrix[0][i] === grid_matrix[1][i] && grid_matrix[1][i] === grid_matrix[2][i]){
    return grid_matrix[j][i];
  }

  if (grid_matrix[0][0] !== 0 && grid_matrix[1][1] !== 0 && grid_matrix[2][2] !== 0) {
    if (grid_matrix[0][0] === grid_matrix[1][1] && grid_matrix[1][1] === grid_matrix[2][2]){
      return grid_matrix[j][i];
    }
  }
  
  if (grid_matrix[0][2] !== 0 && grid_matrix[1][1] !== 0 && grid_matrix[2][0] !== 0) {
    if (grid_matrix[0][2] === grid_matrix[1][1] && grid_matrix[1][1] === grid_matrix[2][0]){
      return grid_matrix[j][i];
    }
  }

  return null;
}

function marcar_jugada(grid_element_id, jugador) {
  var grid_element = document.getElementById(grid_element_id);
  if (jugador === 1) {
    grid_element.innerHTML = 'X';
    turno_jugador = 2;
  } else {
    grid_element.innerHTML = 'O';
    turno_jugador = 1;
  }

  return turno_jugador;
}

function finalizar_juego(resultado) {
  var fin_juego = document.getElementById("finished");
  fin_juego.innerHTML = "Empate!";

  if (resultado !== -1) {
    fin_juego.innerHTML = "Ganador:  Jugador-" + resultado;
  }

  return resultado;
}

function new_click() {
  var fila = this.id.split('_')[0] - 1;
  var columna = this.id.split('_')[1] - 1;

  // Evaluamos si la posición ya fue utilizada, de ser así ya no se puede cambiar
  if (grid_matrix[fila][columna] !== 0) {
    return;
  }

  grid_matrix[fila][columna] = jugador;

  jugador = marcar_jugada(this.id, jugador)
  var resultado = verificar_jugada(fila, columna);

  if (!resultado) {
    return;
  }

  finalizar_juego(resultado);

  var result = document.getElementById('result');
  var grid = document.getElementById('grid');
  grid.style.display = 'none';
  result.style.display = 'block';
}

for (var fila = 1; fila <= 3; fila++) {
  for (var columna = 1; columna <= 3; columna++) {
    document.getElementById('' + fila + '_' + columna).onclick = new_click;
  }
}

function restart() {
    location.reload();
}
