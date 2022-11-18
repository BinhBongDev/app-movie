const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "ffbd83a0215dfb770bff9b6e51b13620",
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig