const btnEl = document.getElementById('get-btn')
const errorMessageEl = document.getElementById('errorMessage')
const galleryEl = document.getElementById('gallery')

async function getImage() {
    const inputValue = document.getElementById('input').value

    if(inputValue > 10 || inputValue < 1) {
        errorMessageEl.style.display = 'block'
        galleryEl.style.display = 'none'
        return
    }

    const urls = []
    const alt_description = []

    try {
        // btnEl.style.display = 'none'
        const loading = `<img src="spinner.svg" />`
        galleryEl.innerHTML = loading
        const response = await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=7qbZKpnEaSqsz2dLwzzdW_iQDghbPUmGFq0-_9nhjYY`)
        const data = await response.json()

        console.log('Data from unsplash API: ', data)

        if(data) {
            data.forEach((pic) => {
                // console.log("Image URLS :", pic.urls.small)
                urls.push(`<img src=${pic.urls.small} title="${pic.alt_description}" />`)
            })
            galleryEl.style.display = 'block'
            galleryEl.innerHTML = urls.join('')
            errorMessageEl.style.display = 'none'
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error)
        errorMessageEl.style.display = 'block'
        errorMessageEl.innerHTML = "An error happened"
        btnEl.style.display = 'block'
        galleryEl.style.display = 'none'
    }
}

btnEl.addEventListener('click' , getImage)
