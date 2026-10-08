const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/,"");

if(!apiBaseUrl) {

  throw new Error("vite url not available")
}

export const apiurl= (path)=> {
  `${apiBaseUrl}${path.startwith("/")? path : `/${path}`}`
}