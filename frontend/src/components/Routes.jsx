import { useState } from 'react';
import { useQuery } from 'react-query';

const Routes = () => {
  const { isLoading, error, data: routes, refetch: RefetchRoutes } = useQuery('routes', () => {
    return fetch('http://localhost:8000/AddGetRoutes/', {
      method: 'GET',
    }).then(res => {
      return res.json();
    });
  });


  const [submitData, setSubmitData] = useState({ distance: '', pointNumber: '', plantsNumber: '' });
  const [route, setRoute] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!route) return;
    route.points.splice(submitData.pointNumber, 0, { dis: parseInt(submitData.distance), sh: parseInt(submitData.plantsNumber) });
    console.log(JSON.stringify(routes));
    fetch('http://localhost:8000/AddGetRoutes/', {
      method: 'POST',
      body: JSON.stringify(routes),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }


  if (isLoading || error) return null;

  return (<div className='p-3 w-full flex gap-12 min-h-screen bg-gray-50'>
    <div>
      {routes?.length &&
        <div>
          <span>Маршрут: </span>
          <select onChange={event => {
            setRoute(routes.find(r => r.id == event.target.value));
          }}>
            {routes.map(route => {
              return <option value={route.id} key={route.id}>{route.id}</option>
            })}
          </select>
        </div>}
      {route && <div>
        <h3>Дни: {route.days}</h3>
        <h3>Оставшиеся ресурсы: {route.resources}</h3>
        <h3>Ресурсы, расходуемые в текущий момент: {route.current}</h3>
        <h3>Распределение мощности реактора: {route.power}</h3>
        <h3>Характеристика автоклава и популяция: {route.population}</h3>
        <ul>
          {route.points.map((point, i) =>
            <li key={i}>
              {i}: {point.dis} {point.sh}
            </li>
          )}
        </ul>
      </div>}
    </div>
    <form action="update" className='flex flex-col gap-2'>
      <h2 className="text-center">Добавить точку</h2>
      <input type="number" placeholder='Дистанция' min={1} value={submitData?.distance} onChange={(e) => setSubmitData({ ...submitData, distance: e.target.value })} />
      <input type="number" placeholder='Количество растений' min={1} value={submitData?.plantsNumber} onChange={(e) => setSubmitData({ ...submitData, plantsNumber: e.target.value })} />
      <input type="number" min={0} placeholder='Номер точки' value={submitData?.pointNumber} onChange={(e) => setSubmitData({ ...submitData, pointNumber: e.target.value })} />
      <button type="submit" className="rounded-md bg-zinc-200 hover:bg-zinc-300 p-2" onClick={handleSubmit}>Добавить</button>
    </form>
  </div>);
}

export default Routes