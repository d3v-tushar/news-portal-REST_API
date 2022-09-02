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
      console.log(category_id);
      // const news_id = parseInt(category_id);
      //       console.log(news_id);
       const categorieDiv = document.createElement('div');
       categorieDiv.innerHTML = `
       <button class="btn btn-outline-primary" onclick="loadNews(${category_id})"><h5>${category_name}</h5></button>
       `;
       categoriesContainer.appendChild(categorieDiv);
    })
}

// const loadNews = async(categorieId) =>{
//   console.log(categorieId);
//     const url = `https://openapi.programming-hero.com/api/news/category/${categorieId}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     displayNews(data.data);
// }

const loadNews = (category_id) =>{
  const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  console.log(category_id);
  console.log(url);
  fetch(url)
  .then(Response => Response.json())
  .then(data => displayNews(data.data))
}

const displayNews = (data) =>{
    // console.log(data);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    data.forEach(news =>{
      console.log(news);
        const {title, thumbnail_url, details, total_view, author} = news;
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
                              <h6>${author.name}</h6>
                              <p>${author.published_date}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p><i class="fa-regular fa-eye"></i> <strong>${total_view}</strong></p>
                        </div>
                        <div>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div>
                          <i class="fa-solid fa-arrow-right fs-4"></i>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}



loadCategories();
loadNews(08);