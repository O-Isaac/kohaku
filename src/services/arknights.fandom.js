/**
 * Crea un endpoint con la busqueda de la wiki de arknights
 * @param {string} text Lo que se desea buscar en la wikia
 * @returns {string}
 */
function query(text) {
  const query = `/api.php?action=query&format=json&prop=&list=search&meta=&srsearch=${text}&srlimit=20&srinfo=&srprop=`;
  const endpoint = "https://arknights.fandom.com";
  return endpoint + query;
}

module.exports = query;
