import React, {useEffect, useState} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

const baseUrl = "http://localhost:3001"
const pizzaUrl = baseUrl + "/pizzas"

function App() {
  const [pizzas, setPizzas] = useState([])
  const [pizzaToEdit, setPizzaToEdit] = useState()

  useEffect(() => {
    fetch(pizzaUrl)
    .then(r => r.json())
    .then(data => setPizzas(data))
  }, [])

  function handleChangeForm(name, value) {
    setPizzaToEdit({...pizzaToEdit, [name]: value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(pizzaUrl + "/" + pizzaToEdit.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, body: JSON.stringify(pizzaToEdit)
    })
    .then(r => r.json())
    .then(updatedPizza => handleEditPizza(updatedPizza))
  }

  function handleEditPizza(updatedPizza) {
    const updatedPizzas = pizzas.map((pizza) => (
      pizza.id === updatedPizza.id ? updatedPizza : pizza
    ))
    setPizzaToEdit(updatedPizza)
    setPizzas(updatedPizzas)
  }

  return (
    <>
      <Header />
      <PizzaForm 
      pizzaToEdit={pizzaToEdit}
      handleChangeForm={handleChangeForm}
      handleEditPizza={handleEditPizza}
      handleSubmit={handleSubmit}
      />
      <PizzaList 
      pizzas = {pizzas}
      setPizzaToEdit={setPizzaToEdit}
      />
    </>
  );
}

export default App;
