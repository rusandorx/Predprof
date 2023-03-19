import { useState } from "react";
import { QueryClientProvider } from "react-query";

const fetchRouteNames = () => {
  return fetch('http://localhost:8000')
    .then(res => res.json());
}

const fetchRoute = (route) => {

}


const App = () => {
  const [route, setRoute] = useState(null);

  return (
    
    <QueryClientProvider>
      <select onChange={event => {
        setRoute(event.target.value);
      }}>
        {routes}
      </select>
      {route && <div>
        <h3>Дни: {route.days}</h3>
        <h3>Оставшиеся ресурсы: {route.resources}</h3>
        <h3>Ресурсы, расходуемые в текущий момент: {route.resources}</h3>
        <h3>Распределение мощности реактора: {route.resources}</h3>
        <h3>Характеристика автоклава и популяция: {route.resources}</h3>
      </div>}
    </QueryClientProvider>
  );
}

export default App;
