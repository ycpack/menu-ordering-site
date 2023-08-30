import { menuArray } from "./data.js"

let addedItemsArray = []
let totalPrice = 0

document.addEventListener('click', function(e){

    if(e.target.dataset.id){
        handleAddItems(e.target.dataset.id)
    }else if(e.target.dataset.remove){
        hadnleRemoveBtn(e.target.dataset.remove)
    }else if(e.target.id == 'completeOrder'){
        handelPay()
    }
   
})


function handleAddItems(itemId){

    renderCheckout(itemId)
}
function hadnleRemoveBtn(itemId){

    const removedItem = addedItemsArray.filter(function(item){
        return item.id == itemId
    })[0]
    
    // remove where id == itemId
    addedItemsArray = addedItemsArray.filter(function(item) {
        return item !== removedItem
    })

    renderCheckout()
}

function handelPay(){
    if(totalPrice !== 0){
        let popUp = ''

        popUp +=`
     
            <div class="popUp id="kpop">
                <h2>Enter card details</h2>
                <form id="pay-form">
                    <input 
                        type="text"
                        placeholder="Enter your name"
                        name="fullName"
                        aria-label="Full name" 
                        required
                    >
                    <input 
                        type="number"
                        placeholder="Enter card number"
                        name="cardNumber"
                        aria-label="card Number" 
                        required
                        >
                    <input 
                        type="number"
                        placeholder="Enter CVV"
                        name="CVV"
                        aria-label="CVV" 
                        required
                        >
                    <input type="submit" value="Pay" id="submit">
                    <button class="close-btn">X</button>
                   
                  
                </form>
            </div>
        `
    
        document.querySelector('.popUp-holder').innerHTML = popUp
    
        document.querySelector('.popUp').style.display = 'block'
        
        
    
        // form submit handle 
        document.getElementById('pay-form').addEventListener('submit', function(e){
            handleSuccess(e)
    
        })
        // form close handle
        document.querySelector('.close-btn').addEventListener('click', function(e){
           document.querySelector('.popUp').style.display = 'none'
    
        })
    }
}

function handleSuccess(e){
    //get form data 
     document.querySelector('.popUp').style.display = 'none'
     e.preventDefault()
    const payForm = document.getElementById('pay-form')

    const payFormData = new FormData(payForm)
    const name = payFormData.get('fullName')

    //display success text 
    document.querySelector('.output').innerHTML=`
            <div class="success-result">
                <p>Thanks, <span id="user">${name}!</span> Your order is on its way!</p>
            </div>
    `
   
     addedItemsArray = []
}

function getHtmlData(){
    let data = ''
    menuArray.forEach(function(item){

        let ingredientHtml = ''
        if(item.ingredients.length > 0){
            item.ingredients.forEach(function(ingredient){
                ingredientHtml += `<span>
                                    ${ingredient}
                                </span> `
            })
        }

        data+=`
        <div class="item">
                    <span class="emoji">${item.emoji}</span>
                    <h3>${item.name}</h3>
                    <p>
                        ${ingredientHtml}
                    </p>
                    <span>₹${item.price}</span>
                 
                         <button class="d-flex-center" data-id="${item.id}">
                        <svg data-id="${item.id}" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 14" fill="none">
                            <path  data-id="${item.id}" d="M6.83949 13.8068V0.011363H8.16903V13.8068H6.83949ZM0.612216 7.57955V6.23864H14.3963V7.57955H0.612216Z" fill="#3C3C3C"/>
                        </svg>
                       
                    </button>
                </div>
        `
    })

    return data
}

function renderData(){
    document.querySelector('.items').innerHTML = getHtmlData()
}
function renderCheckout(itemId){

    //add item if true 
    if(itemId){
         //get the added item
        const addedItem = menuArray.filter(function(item){
            return item.id == itemId
        })[0]

        // add it to the array 
        addedItemsArray.unshift({
            name:addedItem.name,
            price:addedItem.price,
            id:addedItem.id
        })
    }

    let itemData = ''

    totalPrice=0
    // display array data 
    for(const item of addedItemsArray){
        totalPrice += item.price
        itemData +=`
        <div class="item-data">
            <div class="data">
                <h3>${item.name}</h3>
                <span data-remove=${item.id}>remove</span>
            </div>
            <span>₹${item.price}</span>
        </div>    
        `
    }
   
    
    let checkoutHtml = ''
    checkoutHtml += `
        <div class="checkout">
            <h3>Your order</h3>
            ${itemData}
            <div class="total-price">
                <h3>Total price:</h3>
                <span>₹${totalPrice}</span>
            </div>
            <button class="purchase-btn" id="completeOrder">
                Complete order
            </button>
        </div>
    `
    document.querySelector('.output').innerHTML = checkoutHtml
}
renderData()