import React, { useState } from 'react';
import './Trivia.css';
import Confetti from 'react-confetti';
import { useSpring, animated } from 'react-spring';

const Trivia = () => {
  const [puntaje, setPuntaje] = useState(0);
  const [mostrarRespuestas, setMostrarRespuestas] = useState(false);
  const [respuestas, setRespuestas] = useState([]);
  const [preguntasIndex, setPreguntasIndex] = useState(0);

  const preguntas = [
    {
      pregunta: '¿Cuál es la capital de Canadá?',
      opciones: ['Ottawa', 'Toronto', 'Montreal', 'Vancouver'],
      respuesta: 'Ottawa'
    },
    {
      pregunta: '¿Cuál es el mamífero más grande de la Tierra?',
      opciones: ['Elefante', 'Jirafa', 'Cocodrilo', 'Ballena'],
      respuesta: 'Ballena'
    },
    {
      pregunta: '¿Cuál es el río más largo del mundo?',
      opciones: ['Danubio', 'Nilo', 'Amarillo', 'Amazonas'],
      respuesta: 'Nilo'
    },
    {
      pregunta: '¿En qué año se independizó Argentina?',
      opciones: ['1776', '1810', '1853', '1816'],
      respuesta: '1816'
    },
    {
      pregunta: '¿Qué significa en química H2O?',
      opciones: ['Oxígeno doble', 'Nitrógeno', 'Cloruro de Sodio', 'Agua'],
      respuesta: 'Agua'
    },
    {
      pregunta: '¿Cuál es el país más pequeño del mundo?',
      opciones: ['Mónaco', 'Vaticano', 'Nauru', 'Tuvalu'],
      respuesta: 'Vaticano'
    },
    {
      pregunta: '¿Quién pintó la Mona Lisa?',
      opciones: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
      respuesta: 'Leonardo da Vinci'
    },
    {
      pregunta: '¿En qué deporte se utiliza un bate y una pelota?',
      opciones: ['Fútbol', 'Golf', 'Béisbol', 'Tenis'],
      respuesta: 'Béisbol'
    },
    {
      pregunta: '¿Cuál es el país más extenso de Sudamérica?',
      opciones: ['Argentina', 'Perú', 'Colombia', 'Brasil'],
      respuesta: 'Brasil'
    },
    {
      pregunta: '¿Cuál es el país más poblado del mundo?',
      opciones: ['China', 'India', 'Estados Unidos', 'Rusia'],
      respuesta: 'China'
    },
    {
      pregunta: '¿Quién escribió la novela "1984"?',
      opciones: ['J.R.R. Tolkien', 'Jane Austen', 'George Orwell', 'Fyodor Dostoevsky'],
      respuesta: 'George Orwell'
    },
    {
      pregunta: '¿Cuál es el océano más grande del mundo?',
      opciones: ['Atlántico', 'Pacífico', 'Índico', 'Ártico'],
      respuesta: 'Pacífico'
    }
    // ... y así sucesivamente ...
  ];


  const preguntaActual = preguntas[preguntasIndex];

  const reiniciarTrivia = () => {
    setPuntaje(0);
    setRespuestas([]);
    setPreguntasIndex(0);
    setMostrarRespuestas(false);
  };

  const responder = (respuesta) => {
    const respuestaCorrecta = respuesta === preguntaActual.respuesta;
    const nuevaRespuesta = { pregunta: preguntaActual.pregunta, respuestaCorrecta };
    setRespuestas((prevRespuestas) => [...prevRespuestas, nuevaRespuesta]);
    if (respuestaCorrecta) {
      setPuntaje((prevPuntaje) => prevPuntaje + 1);
    }
    siguientePregunta();
  };

  const siguientePregunta = () => {
    if (preguntasIndex < preguntas.length - 1) {
      setPreguntasIndex((prevIndex) => prevIndex + 1);
    } else {
      setMostrarRespuestas(true);
    }
  };

  const respuestasCorrectas = respuestas.filter((respuesta) => respuesta.respuestaCorrecta);
  const respuestasIncorrectas = respuestas.length - respuestasCorrectas.length;
  const puntajePromedio = (puntaje / preguntas.length * 100).toFixed(2);

  const confettiStyle = useSpring({
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 1000 }
  });

  const congratulationsStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  return (
    <div className="app-container">
      <h1 className="title">Trivia</h1>
      <h1 className="title1">¡Dime cuanto sabes!</h1>
      <div className="trivia-container">
        {!mostrarRespuestas && (
          <div className="main">
            <p>Puntos: <strong>{puntaje}</strong></p>
            <div className="card">
              <div className="card-header">
                {preguntaActual.pregunta}
              </div>
              <div className="card-body">
                <div className='cardText'>
                  <p>
                    <strong>Opciones:</strong>
                  </p>
                  {preguntaActual.opciones.map((opcion, index) => (
                    <p key={index}>
                      <button onClick={() => responder(opcion)} className="btn btn-link">
                        {opcion}
                      </button>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {mostrarRespuestas && (
          <div>
            <h2>Resultados:</h2>
            <p>Puntos totales: <strong>{puntaje}</strong></p>
            <p>Respuestas incorrectas: <strong>{respuestasIncorrectas}</strong> / {preguntas.length}</p>
            {puntajePromedio === '100.00' && (
              <animated.div style={confettiStyle}>
                <p className="feedback_success">¡Éxito! ¡Puntaje perfecto!</p>
                <Confetti />
              </animated.div>
            )}
            {puntajePromedio > 70 && puntajePromedio <= 99 && (
              <animated.p style={congratulationsStyle} className="feedback success">¡Felicidades! ¡Buen trabajo!</animated.p>
            )}
            {puntajePromedio <= 70 && puntajePromedio > 39 && (
              <p className="feedback">Ojo ¡Está mal! ... ¡Pero no tan mal! </p>
            )}
            {puntajePromedio <= 39 && puntajePromedio >= 0 && (
              <p className="feedback">Por favor, no te rindas. ¡Sigue intentando!</p>
            )}
            <p>Puntaje promedio: <strong>{puntajePromedio}</strong></p>
            <ul>
              {respuestas.map((respuesta, index) => (
                <li key={index}>
                  {respuesta.pregunta}: {respuesta.respuestaCorrecta ? '¡Correcta! 😃' : 'Incorrecta ❌'}
                </li>
              ))}
            </ul>
            <button onClick={reiniciarTrivia} className="btn reset-button">
              Intentar nuevamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trivia;
