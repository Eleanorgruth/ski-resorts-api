const express = require('express')
const app = express()
app.use(express.json())

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Ski Resorts';
app.locals.resorts =  [
  {id: "1", name: 'Copper Mountain', state: 'Colorado'},
  {id: "2", name: 'Ski Cooper', state: 'Colorado'},
  {id: "3", name: 'Taos Ski', state: 'New Mexico'}
]

app.get('/api/v1/resorts', (request, response) => {
  const resorts = app.locals.resorts
  response.json({ resorts })
});

app.get('/api/v1/resorts/:id', (request, response) => {
  const { id } = request.params
  const resort = app.locals.resorts.find(resort => resort.id === id)
  if (!resort) {
    return response.sendStatus(404);
  }
  response.status(200).json(resort)
});

app.post('/api/v1/resorts', (request, response) => {
  const id = Date.now();
  const resort = request.body

  for (let requiredParameter of ['name', 'state']) {
    if (!resort[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { name: <String>, state: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  const { name, state } = resort
  app.locals.resorts.push({  name, state, id });
  response.status(201).json({ name, state, id });
});

app.delete('/api/v1/resorts/:id', (request, response) => {
 //Test
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
})