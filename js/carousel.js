// Carousel buttons onclick events depending on view width
(()=>{
    let leftButtons = document.getElementsByClassName("carousel-control-prev");
    for (button of leftButtons) {
        button.onclick = (event)=>{
            let collection = document.getElementById(event.target.getAttribute("data-bs-target"));
            let xscroll = collection.scrollLeft;
            let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
            let filmwidth = 13.5 * rem;
            let scrolln = (~~((document.body.scrollWidth-24-4*rem)/filmwidth));
            scrolln = (scrolln == 0)?1:scrolln;
            let scrollto = (~~(filmwidth*(~~((xscroll - filmwidth*scrolln)/filmwidth))));
            scrollto = (scrollto<0)?0:scrollto;
            collection.scroll({
                top: 0,
                left: scrollto,
                behavior: 'smooth'
              });
        };
    }
    let rightButtons = document.getElementsByClassName("carousel-control-next");
    for (button of rightButtons) {
        button.onclick = (event)=>{
            let collection = document.getElementById(event.target.getAttribute("data-bs-target"));
            let xscroll = collection.scrollLeft;
            let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
            let filmwidth = 13.5 * rem;
            let scrolln = (~~((document.body.scrollWidth-24-4*rem)/filmwidth));
            scrolln = (scrolln == 0)?1:scrolln;
            let scrollto = (~~(filmwidth*(~~((xscroll + filmwidth*scrolln)/filmwidth))));
            scrollto = (scrollto<0)?0:scrollto;
            collection.scroll({
                top: 0,
                left: scrollto,
                behavior: 'smooth'
              });;
        };
    }
})();