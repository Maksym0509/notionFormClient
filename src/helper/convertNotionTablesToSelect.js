const convertNotionTablesToSelect = (tables) => {
  const states = tables.results.map((table) => {
    return { value: table.id, label: table.title[0].plain_text };
  });

  return states;
};

export default convertNotionTablesToSelect;
