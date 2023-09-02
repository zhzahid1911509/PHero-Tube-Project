let storedId = '1000';
const videoCategory = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    //console.log(data.data[0]);
    displayVideoCategory(data);
}

const displayVideoCategory = async (data) => {
    const categoryContainer = document.getElementById('category-btn-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="category-btn" onclick="handleShowingVideo(${category.category_id}, ${isSort=false})" class="btn hover:text-white hover:bg-[#FF1F3D]">${category.category}</button>
        `;
        categoryContainer.appendChild(div)
        
    });
    
}

const videoDetails = async (id, isSort) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    //console.log(data.data);
    displayVideoDetails(data, isSort);
    
}

const displayVideoDetails = async (data, isSort) => {
   // let hasData = true;
    const videoCardContainer = document.getElementById('video-card-container');
    
    videoCardContainer.textContent = "";
    if(isSort){
        data.data.sort((a,b) => parseFloat(b.others.views)-parseFloat(a.others.views));
    }
    
    if(!data.status){ 
        videoCardContainer.textContent = '';
        videoCardContainer.classList = 'no-data-found-message';
        messageDiv = document.createElement('div');
        messageDiv.classList = 'flex flex-col justify-center items-center text-center mt-12';
        messageDiv.innerHTML = `
        <img src="images/Icon.png">
        <p class="text-3xl font-bold mt-2">Oops!! Sorry, There is <br> no content here</p>
        `;
        videoCardContainer.appendChild(messageDiv);
        return;
    }
    
    data.data.forEach((video) => {
        videoCardContainer.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4";
        const videoCard = document.createElement('div');
        videoCard.classList = "card card-compact bg-base-100 mt-2 rounded-lg";
        const isVerified = video.authors[0].verified;
        const imgUrl = 'images/icons8-blue-tick-32.png';
        const durationHour = parseInt(video.others.posted_date/3600);
        const durationMinute = parseInt((video.others.posted_date%3600)/60);
        videoCard.innerHTML = `
        <figure class="relative"><img src="${video.thumbnail}" alt="Shoes" class="w-full h-[300px] rounded-lg"/>
        <div class="absolute bg-black text-white mt-64 ml-72 rounded-lg p-1">${durationHour} hours ${durationMinute} min ago</div>
        </figure>
        <div class="card-body">
        <div class="flex flex-row gap-2 items-center">
        <img src="${video.authors[0].profile_picture}" alt="Profile Photo" class="w-[60px] h-[60px] rounded-[50px]">
        <div>
        <h2 class="card-title">${video.title}</h2>
        <div class="flex flex-row gap-2 items-center">
        <p>${video.authors[0].profile_name}</p>
        <img id="verified-check" src="${isVerified ? imgUrl : ''}" alt="${isVerified?'blue-tick':''}">
        </div>
        <p>${video.others.views}</p>
        </div>
        </div>
        </div>
        `;
        videoCardContainer.appendChild(videoCard);
    });
}


const handleShowingVideo = (category_id, isSort) => {
    videoDetails(category_id, isSort);
    storedId = category_id;
}

const sortVideos = () => {
    var isSort = true;
    handleShowingVideo(storedId, isSort);
}

videoCategory();
videoDetails(1000)