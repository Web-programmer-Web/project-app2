import { serveFile } from "https://deno.land/std@0.184.0/http/file_server.ts";

// Import the http server from std/http.
import { serve } from "https://deno.land/std@0.184.0/http/mod.ts";

// URL patterns can be used to match request URLs. They can contain named groups
// that can be used to extract parts of the URL, e.g. the book ID.
const BOOK_ROUTE = new URLPattern({ pathname: "/:id" });

async function handler(req: Request): Promise<Response> {
  // Match the incoming request against the URL patterns.
  const match = BOOK_ROUTE.exec(req.url);
  // If there is a match, extract the book ID and return a response...
  const id = match
  //console.log(match); 


  if (new URL(req.url).pathname == "/") {
    return await serveFile(req,"الغلاف.html");
  } else if (match) {
    const id = decodeURI(match.pathname.groups.id);
    //console.log(id); 
    return await serveFile(req,id);
  }

  // If there is no match, return a 404 response.
  return new Response("Not found ", {
    status: 404,
  });
}

// To start the server on the default port, call `serve` with the handler.
console.log("Listening on http://localhost:8000");
serve(handler);
