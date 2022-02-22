const form = document.querySelector('#searchForm');
let container = document.querySelector('.movie-container');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    getTvShow();
    e.target.elements.query.value = '';
})

const makeImgs = (shows) => {

    for (let result of shows) {
        if (result.show.image) {
            const card = document.createElement('div');
            const img = document.createElement('img');
            const cardBody = document.createElement('div');
            const cardTitle = document.createElement('h2');
            const cardText = document.createElement('p');
            const cardLink = document.createElement('a');
            card.classList.add('card');
            img.classList.add('card-img-top');
            cardBody.classList.add('card-body');
            cardTitle.classList.add("card-title");
            cardText.classList.add('card-text');
            cardLink.classList.add('btn', 'btn-secondary');
            img.src = result.show.image.original;
            img.alt = `${result.show.name} tv show picture`;
            cardTitle.textContent = result.show.name;
            let text = result.show.summary;
            cardText.innerHTML = text;
            cardLink.setAttribute('href', result.show.url);
            cardLink.textContent = 'Read More';
            cardBody.append(cardTitle, cardText, cardLink);
            card.append(img, cardBody);
            container.append(card);
        }
    }
}

const getTvShow = async () => {
    try {
        let searchTerm = form.elements.query.value;
        const config = {
            params: {
                q: searchTerm
            }
        };
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        makeImgs(res.data);
    } catch (error) {
        console.log('Something went wrong', error);
    }

}