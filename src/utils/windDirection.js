export function windDirection(deg = 315) {
  const directions = ['Северный', 'Северо-восточный', 'Восточный', 'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'];
  const degreesPerDirection = 360 / directions.length;
  const direction = Math.floor((deg + degreesPerDirection / 2) / degreesPerDirection) % directions.length;
  const rotation = direction * 45;

  return {
    direction: directions[direction],
    rotation: rotation,
  };
};


