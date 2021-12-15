/**
 * Define fetch event observer and handler
 */
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Handle the request and fire the rewriter
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const res = await fetch(`https://serverless-korben-lesjeudis.pages.dev/`)
  const contentType = res.headers.get("Content-Type")
  
  // If the response is HTML, it can be transformed with
  // HTMLRewriter -- otherwise, it should pass through
  if (contentType.startsWith("text/html")) {
    return new HTMLRewriter()
      .on("time#worker-content", new TimeRewriter())
      .transform(res)
  } else {
    return res
  }
}

/**
 * Rewriter definition
 */
class TimeRewriter {
  element(element) {
    element.setInnerContent(new Date().toUTCString())
  }
}
