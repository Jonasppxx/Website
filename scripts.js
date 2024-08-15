document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products');
            data.products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <div class="image-container">
                        <img src="${product.image}" alt="${product.name}" class="default-image">
                        <img src="${product.image.replace('.png', '_hover.png')}" alt="${product.name}" class="hover-image">
                    </div>
                    <h2>${product.name}</h2>
                    <p>Price: $${product.price}</p>
                    <p>${product.set}</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                productsContainer.appendChild(productDiv);

                const defaultImage = productDiv.querySelector('.default-image');
                const hoverImage = productDiv.querySelector('.hover-image');

                defaultImage.addEventListener('click', () => {
                    defaultImage.style.display = 'none';
                    hoverImage.style.display = 'block';
                });

                hoverImage.addEventListener('click', () => {
                    hoverImage.style.display = 'none';
                    defaultImage.style.display = 'block';
                });

                const addToCartButton = productDiv.querySelector('.add-to-cart');
                addToCartButton.addEventListener('click', () => {
                    addToCart(product);
                });
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    const cartItems = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    function addToCart(product) {
        if (!cartItems.some(item => item.name === product.name)) {
            cartItems.push(product);
            updateCart();
        }
    }

    function removeFromCart(productName) {
        const index = cartItems.findIndex(item => item.name === productName);
        if (index !== -1) {
            cartItems.splice(index, 1);
            updateCart();
        }
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - $${item.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromCart(item.name);
            });
            cartItem.appendChild(removeButton);
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const postalVillage = document.getElementById('postal-village').value;
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;

        // Process the form data as needed
        console.log('Postleitzahl und Dorf:', postalVillage);
        console.log('Emailadresse:', email);
        console.log('Vorname und Nachname:', name);
        console.log('Strasse mit Nummer:', address);

        // Redirect to a confirmation page or perform other actions
        window.location.href = 'confirmation.html';
    });
});