const mp = new MercadoPago("YOUR_PUBLIC_KEY",{
    locale: "es-CO"
});

document.getElementById("chekout-button").addEventListener("click", async () => {
    try {

        const orderData = {
            title: document.querySelector(".as-producttile-tilelink").innerText,
            quantity: 1,
            unit_price: 2000,
        };

        const response = await fetch("http://oswaldonau-mp-commerce-nodejs-28febdc6beec.herokuapp.com:3000/create_preference",{
            method: "POST",
            headers:{
                "Content_Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        const preference = await response.json();
        
        createCheckoutButton(preference.id);
    }catch(error){
        alert("error :(");
    }
});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async ()  => {
        if (window.checkoutButton) window.checkoutButton.unmount();
        
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
         customization: {
          texts: {
           valueProp: 'smart_option',
          },
         }
        });
    };

    renderComponent();

}

var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.listen(port);