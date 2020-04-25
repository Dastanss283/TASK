async function getCountry(name){
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
    const responseData = await response.json();  debugger
    return responseData;
}

$("form").submit(function(e) {
    e.preventDefault();
    $("#display");
    let name =  e.currentTarget.name.value;
    if(!name) {
        alert("Вы не ввели название Страны!");
        return;
    }else if (name.length < 2) {
        alert("Вы ввели недостаточно символа");

    }

    getCountry(name)
        .then(result =>{
            result.forEach(element => {
                const list = $('<div>', {class: "list"}).appendTo('#display');
                const countryName = $('<div>', {class: "countryName"}).appendTo(list);
                const flaq = $('<div>', {class: "flaq"}).appendTo(countryName);
                $('<img>', {src: element.flag}).appendTo(flaq);
                const info = $('<div>', {class: "right-text"}).appendTo(countryName);
                $('<p>', {text: "Название : " + element.name}).appendTo(info);
                $('<p>', {text: "регион : " + element.region}).appendTo(info);
                $('<p>', {text: "Столица : " + element.capital}).appendTo(info);
                $('<h4>', {text: 'Валюта :'}).appendTo(info);
                $(`<a href=https://www.wikipedia.org/wiki/${name} target="_blank">больше информиции</a>` ).appendTo(info);
                element.currencies.forEach(element =>{
                    const currencies = $('<div>', {
                        class: "currencies"
                    }).appendTo(info);
                    $('<span>', {text: element.code + " "}).appendTo(currencies);
                })
            });

        })
        .catch(err =>console.log(err));
});
