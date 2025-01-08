export function parseMovieData(movie: any) {
    const title = movie[1];
    const year = parseInt(movie[0], 10);
    const studios = movie[2]
        .split(/,| and /)
        .map((studio: string) => studio.trim())
        .filter((studio: string) => studio);;
    const producers = movie[3]
        .split(/,| and /)
        .map((producer: string) => producer.trim())
        .filter((producer: string) => producer);
    const winner = movie[4];

    return { title, year, studios, producers, winner };
}