import React, {useEffect, useState} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

const baseUrl = "http://localhost:3001"
const pizzaUrl = baseUrl + "/pizzas"

function App() {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch(pizzaUrl)
    .then(r => r.json())
    .then(data => setPizzas(data))
  }, [])

  return (
    <>
      <Header />
      <PizzaForm />
      <PizzaList 
      pizzas = {pizzas}
      />
    </>
  );
}

export default App;
