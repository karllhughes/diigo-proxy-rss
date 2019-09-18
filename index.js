const fetch = require('node-fetch');
const Feed = require('feed').Feed;
const querystring = require('querystring');

const handleError = (e, response) => {
  console.error(e);
  response.writeHead(500, {
    'Content-Type': 'text/html ',
  });
  response.end('Something went wrong. Please check the server logs for more info.')
}

const generateFeed = (data) => {
  const feed = new Feed({
    id: "https://diigo-proxy.karllhughes.now.sh",
    title: "Diigo API to RSS feed",
    description: "An automatically generated feed using the Diigo API",
  });

  data.forEach(item => {
    feed.addItem({
      title: item.title,
      id: item.url,
      link: item.url,
      description: item.desc,
      date: new Date(item.created_at),
    })
  });

  return feed.atom1();
}

module.exports = (request, response) => {
  if (!request.query || !request.headers['authorization']) {
    handleError('`auth` not set on querystring', response);
  }

  const qs = querystring.encode(request.query);
  fetch(
    'https://secure.diigo.com/api/v2/bookmarks?' + qs,
    {headers: {'Authorization': request.headers['authorization']}}
  )
    .then(res => res.json())
    .then(data => {
      response.send(generateFeed(data));
    })
    .catch(e => handleError(e, response));
};
