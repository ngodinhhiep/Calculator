const form = document.querySelector('#searchForm');
const container = document.querySelector('#container');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    container.innerHTML = ""; // to update images every time you submit a new text
    const searchText = form.elements.query.value;
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchText}`);
     makeImages(res.data);
     form.elements.query.value = "";
})

const makeImages = (shows) => {
    for (let result of shows ) {
        if(result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            container.append(img);}
        
    }
}

