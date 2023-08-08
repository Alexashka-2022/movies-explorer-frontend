import { shortMovieDuration } from "./constants";

export function filteredByName(movies, searchValue) {
    const searchQuery = searchValue.toLowerCase().trim();
    const filterResult = movies.filter((item) => {
        const correctNameRu = item.nameRU.toLowerCase().trim();
        const correctNameEn = item.nameEN.toLowerCase().trim();

        return (correctNameRu.includes(searchQuery) || correctNameEn.includes(searchQuery));
    });

    return filterResult;
}

export function filteredByDuration(movies) {
    return movies.filter((item) => {
        return item.duration <= shortMovieDuration;
    })
}