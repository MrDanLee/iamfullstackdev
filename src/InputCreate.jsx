import { useState } from "react";

function InputCreate ({setUpdate}) {
  const [title, setTitle] = useState('');
  const [res, setRes] = useState('Listo para enviar')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const urlApi = 'http://localhost:3000/create'
    const payload = { title }

    try {
      const response = await fetch(urlApi, {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Indicamos que el contenido es JSON
        },
        body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
      })
      if (response.ok) {
        const data = await response.json()
        console.log("enviado", data)
        setRes(`Enviado: ${data.title}`)
        setTitle('')
        setUpdate(prev => !prev)
      } else {
        throw new Error("Se ha roto")
      }
    } catch(err) {
      console.error("Error", err)
    }
  }
  return (

    <>
    <form onSubmit={handleSubmit}>
      <input 
      type="text"
      placeholder="Escribe la tarea"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
    {res}
    </>
  )
}

export default InputCreate;