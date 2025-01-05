function fetchAndRender(url, containerId, templateCallback) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            data.forEach(item => {
                const element = document.createElement("div");
                let links = Object.keys(item.links)
                    .map(key => `<a href="${item.links[key]}">[${key}]</a>`)
                    .join('\n');
                element.innerHTML = templateCallback(item, links);
                container.appendChild(element);
            });
        })
        .catch(error => {
            console.error(`Error fetching data from ${url}:`, error);
        });
}

function renderPublication(item, links) {
    return `
        <div style="padding:20px;width:20%;vertical-align:middle;float:left;">
            <div class="one">
                <video playsinline autoplay loop preload muted style="width:100%;max-width:100%;position:absolute;">
                    <source src="${item.video}">
                </video>
            </div>
        </div>
        <div class="information" style="float:left;">
            <papertitle>${item.title}</papertitle><br>
            ${item.authors.replace("Aarav Dave", '<strong>Aarav Dave</strong>')}<br>
            ${item.published}<br>
            ${links}<br><br>
            ${item.description}
        </div>
    `;
}

function renderReport(item, links) {
    return `
        <div class="information">
            <papertitle>${item.title}</papertitle><br>
            ${item.authors.replace("Aarav Dave", '<strong>Aarav Dave</strong>')}<br>
            ${links}<br><br>
            ${item.description}
        </div>
    `;
}

function updateNewsFromFile() {
    fetch('news.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('news').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching data from news.txt:', error);
        });
}

fetchAndRender('publications.json', 'publications', renderPublication);
fetchAndRender('reports.json', 'reports', renderReport);
updateNewsFromFile();
