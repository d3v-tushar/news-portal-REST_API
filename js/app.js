const loadCategories = async() =>{
  try{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  }
  catch(error){
    console.log(error);
  }
  loadingSpinner(true);
}

const displayCategories = (data) =>{
    toggleSpinner(false);
    const categoriesContainer = document.getElementById('categories-container');
    data.forEach(categorie =>{
    const {category_id, category_name} = categorie;
    const categorieDiv = document.createElement('div');
    categorieDiv.innerHTML = `
    <div onclick="foundCate('${category_name}')"><a class="btn" onclick="loadNews(${category_id})"><h5>${category_name}</h5></a</div>
    `;
    categoriesContainer.appendChild(categorieDiv);
      })
}

const loadNews = async (category_id) =>{
    try{
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    }
    catch(error){
      console.log(error);
    }
    toggleSpinner(true);
}

const foundCate = (category_name) =>{
  console.log(category_name);
  const categorieResult = document.getElementById('category-result');
  categorieResult.innerText = category_name;
}

const displayNews = (data) =>{
    const newsContainer = document.getElementById('news-container');
    const foundCount = document.getElementById('found-news');
    foundCount.innerText = data.length;
    console.log(data.length)
    if(data.length !== 0){
      const noNews = document.getElementById('no-news-found');
      noNews.classList.add('d-none');
    }
    else{
      const noNews = document.getElementById('no-news-found');
      noNews.classList.remove('d-none');
    }
    newsContainer.textContent = '';
    data.sort((x, y) => y.total_view - x.total_view);
    data.forEach(news =>{
        console.log(news)
        const {title, thumbnail_url, details, total_view, author, _id, rating} = news;
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card p-3 shadow ms-0 mb-5 bg-body rounded" style="max-width: 75rem;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${thumbnail_url}" class=""...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${details.slice(0,400)}...</p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
        <div class="d-flex">
            <div>
                 <img class="rounded-circle sticky-bottom me-2" style="width: 4rem;" src="${author.img}" alt="">
            </div>
            <div class="d-flex align-items-center">
              <h6>Author Name: <span class="text-danger">${author.name ? author.name : 'No Data'}</span></h6>
              
            </div>
        </div>
        <div>
          <p><i class="fa-regular fa-eye"></i> <strong class="text-secondary">${total_view ? total_view : 'No Views'}</strong></p>
        </div>
        <div class="mx-2">
          <p><span class="text-warning"><i class="fa-solid fa-star"></i></span><strong> ${rating.number}</strong></p>
        </div>
        <div>
            <button onclick="loadNewsDetails('${_id}')" type="button" class="btn text-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-arrow-right fs-4 my-2"></i></button>
            </div>
          </div>
          </div>
        </div>
      </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
    toggleSpinner(false);
}

const loadNewsDetails = async news_id =>{
  try{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
  }
   catch(error){
    console.log(error);
  }
  toggleSpinner(true);
}

const displayNewsDetails = newsdetails =>{
  console.log(newsdetails);
  const {title, thumbnail_url, image_url, details, author, total_view} = newsdetails;
  const detailsContainer = document.getElementById('modal-pop');
  detailsContainer.innerHTML = `
  <img class="img-fluid" src="${image_url}">
  <p>${details}</p>
  `;
  const modalAuthor = document.getElementById('modal-author');
  modalAuthor.innerText = `${author.name}`;
  const modalViews = document.getElementById('modal-views');
  modalViews.innerText = `${total_view}`
  const newsLabel = document.getElementById('newsDetailsLabel');
  newsLabel.innerText = title;
  toggleSpinner(false)
}

const toggleSpinner = (status) =>{
 const spinner = document.getElementById('spinner-id');
 if(status){
  spinner.classList.add('d-none');
 }
 else{
  spinner.classList.remove('d-none');
 }
}

loadCategories();
loadNews(08);