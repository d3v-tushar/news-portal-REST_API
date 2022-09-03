const loadCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = (data) =>{
    // console.log(data);
    const categoriesContainer = document.getElementById('categories-container');
    data.forEach(categorie =>{
      const {category_id, category_name} = categorie;
      // console.log(category_id);
       const categorieDiv = document.createElement('div');
       categorieDiv.innerHTML = `
       <button class="btn btn-outline-primary" onclick="loadNews(${category_id})"><h5>${category_name}</h5></button>
       `;
       categoriesContainer.appendChild(categorieDiv);
    })
}

const loadNews = async category_id =>{
  // console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

// const loadNews = (category_id) =>{
//   const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
//   console.log(category_id);
//   console.log(url);
//   fetch(url)
//   .then(Response => Response.json())
//   .then(data => displayNews(data.data))
// }

const displayNews = (data) =>{
    // console.log(data);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    data.forEach(news =>{
      // console.log(news);
        const {title, thumbnail_url, details, total_view, author, _id} = news;
        // console.log(_id);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3 p-3" style="max-width: 75rem;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${thumbnail_url}" class=""...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${title}</h5>
                          <p class="card-text">${details.slice(0,400)}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                        <div>
                          <div><img class="rounded-circle sticky-bottom" style="width: 6rem;" src="${author.img}" alt="">
                            <div>
                              <h6>${author.name ? author.name : 'No Author'}</h6>
                              <p>${author.published_date}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p><i class="fa-regular fa-eye"></i> <strong>${total_view ? total_view : 0}</strong></p>
                        </div>
                        <div>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div>
                         <button onclick="loadNewsDetails('${_id}')"><i class="fa-solid fa-arrow-right fs-4 my-2"></i> </button>
                         <button onclick="loadNewsDetails('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Modal</button>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}

const loadNewsDetails = async news_id =>{
  // console.log(news_id);
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

// const displayNewsDetails = (data) =>{
//   console.log(data);
//   const newsDetailsContainer = document.getElementById('modal-pop');
//   data.forEach(news =>{
//     const detailedNews = document.createElement('div');
//     detailedNews.innerHTML = `
//     <div class="modal-content text-center">
//     <div class="modal-header">
//       <h5 class="modal-title text-danger" id="exampleModalLabel">Title</h5>
//       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">
//     <h6>--- Instructions ---</h6>
//         <p>Details</p>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
//     </div>
//   </div>
//     `;
//     newsDetailsContainer.appendChild(detailedNews);
//   })
// }

const displayNewsDetails = details =>{
  console.log(details);
  const {title} = details;
  console.log(title);
  const detailsContainer = document.getElementById('modal-pop');
  detailsContainer.innerHTML = '';
  const newsLabel = document.getElementById('newsDetailsLabel');
  newsLabel.innerText = title;

}

loadCategories();
loadNews(08);