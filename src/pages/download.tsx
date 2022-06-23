export default function () {
  return null;
}
// Usage:
// Text field someone can put tiktok link wether short or long
// if long search for id in the url and can redirect to /v/:id
// if id is not there use the client to make request to get the video id
// this will save on requests from the server example url "https://abstract.land/api/proxy/tiktok.com/t/ZSd3XPeS1/?k=1"
// "abstract.land/api/proxy/" is a cors bypass just make get request to the url and get the video from final url (or Location header)
