// function to create link header
const parseLinkHeader = (linkHeader) => {
  const linkHeadersArray = linkHeader
    .split(", ")
    .map((header) => header.split("; "));

  const linkHeadersMap = linkHeadersArray.map((header) => {
    const thisHeaderRel = header[1].replace(/"/g, "").replace("rel=", "");
    const thisHeaderUrl = header[0].slice(1, -1);
    return [thisHeaderRel, thisHeaderUrl];
  });
  return Object.fromEntries(linkHeadersMap);
};

// paginate function

let currentUrl = "  http://localhost:3000/posts?_limit=20&_page=1";
function paginate(direction) {
  fetch(currentUrl).then((response) => {
    let linkHeaders = parseLinkHeader(response.headers.get("Links"));
    if (!linkHeader[direction]) {
      currentUrl = linkHeaders[direction];
      fetchPosts(linkHeaders[direction]);
    }
  });
}
