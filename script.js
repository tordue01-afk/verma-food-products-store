"use strict";


const BUSINESS_NAME =
    "Verma Logistics Services";

const BUSINESS_OWNER =
    "Regina Mbaveren Ande";

const BUSINESS_WHATSAPP =
    "2347062206682";

const BUSINESS_LOCATION =
    "Adamawa State, Nigeria";


const header =
    document.getElementById("header");

const navbar =
    document.getElementById("navbar");

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.querySelectorAll(".nav-link");

const pageSections =
    document.querySelectorAll("main section[id]");

const revealElements =
    document.querySelectorAll(".reveal");

const productButtons =
    document.querySelectorAll(".product-order-button");

const galleryButtons =
    document.querySelectorAll(".gallery-order-button");

const orderForm =
    document.getElementById("orderForm");

const orderProduct =
    document.getElementById("orderProduct");

const orderStatus =
    document.getElementById("orderStatus");

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* Header */

function updateHeader() {
    if (!header) {
        return;
    }

    header.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );
}


window.addEventListener(
    "scroll",
    updateHeader
);

updateHeader();


/* Mobile Menu */

function openMenu() {
    if (!navbar || !menuButton) {
        return;
    }

    navbar.classList.add("open");
    document.body.classList.add("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    menuButton.innerHTML =
        '<i class="fa-solid fa-xmark"></i>';
}


function closeMenu() {
    if (!navbar || !menuButton) {
        return;
    }

    navbar.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuButton.innerHTML =
        '<i class="fa-solid fa-bars"></i>';
}


if (menuButton) {
    menuButton.addEventListener(
        "click",
        function () {
            if (
                navbar.classList.contains("open")
            ) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    );
}


navLinks.forEach(
    function (link) {
        link.addEventListener(
            "click",
            closeMenu
        );
    }
);


document.addEventListener(
    "click",
    function (event) {
        if (!navbar || !menuButton) {
            return;
        }

        const clickedNavbar =
            navbar.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            navbar.classList.contains("open") &&
            !clickedNavbar &&
            !clickedButton
        ) {
            closeMenu();
        }
    }
);


window.addEventListener(
    "resize",
    function () {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    }
);


/* Active Navigation */

function updateActiveLink() {
    let activeSection = "home";

    pageSections.forEach(
        function (section) {
            const sectionTop =
                section.offsetTop - 160;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                activeSection =
                    section.getAttribute("id");
            }
        }
    );

    navLinks.forEach(
        function (link) {
            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${activeSection}`
            ) {
                link.classList.add("active");
            }
        }
    );
}


window.addEventListener(
    "scroll",
    updateActiveLink
);

updateActiveLink();


/* Reveal Animation */

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(
                    function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    }
                );
            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(
        function (element) {
            revealObserver.observe(element);
        }
    );

} else {

    revealElements.forEach(
        function (element) {
            element.classList.add("visible");
        }
    );

}


/* Select Product */

function moveToOrderForm(productName) {
    if (!orderProduct) {
        return;
    }

    orderProduct.value = productName;

    const orderSection =
        document.getElementById("order");

    if (orderSection) {
        orderSection.scrollIntoView({
            behavior: "smooth"
        });
    }

    window.setTimeout(
        function () {
            orderProduct.focus();
        },
        650
    );
}


productButtons.forEach(
    function (button) {
        button.addEventListener(
            "click",
            function () {
                moveToOrderForm(
                    button.dataset.product
                );
            }
        );
    }
);


/* Random Gallery */

const products = [
    {
        name: "Melon Seed",
        image: "images/melon-seed.jpg"
    },
    {
        name: "Ogbono",
        image: "images/ogbono.jpg"
    },
    {
        name: "Groundnut Oil",
        image: "images/groundnut-oil.jpg"
    },
    {
        name: "Red Palm Oil",
        image: "images/palm-oil.jpg"
    },
    {
        name: "Honey",
        image: "images/honey.jpg"
    },
    {
        name: "Dried Pepper",
        image: "images/dried-pepper.jpg"
    }
];


const galleryImages = [
    document.getElementById("galleryImage1"),
    document.getElementById("galleryImage2"),
    document.getElementById("galleryImage3")
];


const galleryTitles = [
    document.getElementById("galleryTitle1"),
    document.getElementById("galleryTitle2"),
    document.getElementById("galleryTitle3")
];


let displayedProducts = [
    products[0],
    products[1],
    products[3]
];


function shuffleProducts(productList) {
    const shuffled = [...productList];

    for (
        let index = shuffled.length - 1;
        index > 0;
        index -= 1
    ) {
        const randomIndex =
            Math.floor(
                Math.random() *
                (index + 1)
            );

        [
            shuffled[index],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[index]
        ];
    }

    return shuffled;
}


function updateGallery() {
    displayedProducts =
        shuffleProducts(products).slice(0, 3);

    galleryImages.forEach(
        function (image, index) {
            const product =
                displayedProducts[index];

            const title =
                galleryTitles[index];

            if (!image || !title || !product) {
                return;
            }

            image.classList.add("changing");

            window.setTimeout(
                function () {
                    image.src = product.image;
                    image.alt = product.name;
                    title.textContent = product.name;

                    image.classList.remove(
                        "changing"
                    );
                },
                300
            );
        }
    );
}


galleryButtons.forEach(
    function (button) {
        button.addEventListener(
            "click",
            function () {
                const index =
                    Number(
                        button.dataset.galleryIndex
                    );

                const product =
                    displayedProducts[index];

                if (product) {
                    moveToOrderForm(product.name);
                }
            }
        );
    }
);


window.setInterval(
    updateGallery,
    5000
);


/* Form Validation */

function clearFieldError(field) {
    if (!field) {
        return;
    }

    field.classList.remove("invalid");

    const formGroup =
        field.closest(".form-group");

    const errorMessage =
        formGroup
            ? formGroup.querySelector(
                ".error-message"
            )
            : null;

    if (errorMessage) {
        errorMessage.textContent = "";
    }
}


function showFieldError(
    field,
    message
) {
    if (!field) {
        return;
    }

    field.classList.add("invalid");

    const formGroup =
        field.closest(".form-group");

    const errorMessage =
        formGroup
            ? formGroup.querySelector(
                ".error-message"
            )
            : null;

    if (errorMessage) {
        errorMessage.textContent = message;
    }
}


function validPhoneNumber(phoneNumber) {
    const cleanedPhone =
        phoneNumber.replace(
            /[\s()+-]/g,
            ""
        );

    return /^[0-9]{7,15}$/.test(
        cleanedPhone
    );
}


function validateOrderForm() {
    const customerName =
        document.getElementById(
            "customerName"
        );

    const customerPhone =
        document.getElementById(
            "customerPhone"
        );

    const product =
        document.getElementById(
            "orderProduct"
        );

    const orderType =
        document.getElementById(
            "orderType"
        );

    const quantity =
        document.getElementById(
            "quantity"
        );

    const deliveryLocation =
        document.getElementById(
            "deliveryLocation"
        );

    const requiredFields = [
        customerName,
        customerPhone,
        product,
        orderType,
        quantity,
        deliveryLocation
    ];

    requiredFields.forEach(
        function (field) {
            clearFieldError(field);
        }
    );

    let formIsValid = true;


    if (
        customerName.value.trim().length < 2
    ) {
        showFieldError(
            customerName,
            "Enter your full name."
        );

        formIsValid = false;
    }


    if (
        !validPhoneNumber(
            customerPhone.value.trim()
        )
    ) {
        showFieldError(
            customerPhone,
            "Enter a valid phone number."
        );

        formIsValid = false;
    }


    if (product.value === "") {
        showFieldError(
            product,
            "Select a product."
        );

        formIsValid = false;
    }


    if (orderType.value === "") {
        showFieldError(
            orderType,
            "Select the order type."
        );

        formIsValid = false;
    }


    if (quantity.value.trim() === "") {
        showFieldError(
            quantity,
            "Enter the required quantity."
        );

        formIsValid = false;
    }


    if (
        deliveryLocation.value
            .trim()
            .length < 2
    ) {
        showFieldError(
            deliveryLocation,
            "Enter your delivery location."
        );

        formIsValid = false;
    }


    return formIsValid;
}


/* WhatsApp Order */

if (orderForm) {
    orderForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            orderStatus.className =
                "form-status";

            orderStatus.textContent = "";

            if (!validateOrderForm()) {
                orderStatus.classList.add(
                    "error"
                );

                orderStatus.textContent =
                    "Please complete the highlighted fields.";

                return;
            }


            const customerName =
                document
                    .getElementById(
                        "customerName"
                    )
                    .value
                    .trim();

            const customerPhone =
                document
                    .getElementById(
                        "customerPhone"
                    )
                    .value
                    .trim();

            const selectedProduct =
                document
                    .getElementById(
                        "orderProduct"
                    )
                    .value;

            const selectedOrderType =
                document
                    .getElementById(
                        "orderType"
                    )
                    .value;

            const quantity =
                document
                    .getElementById(
                        "quantity"
                    )
                    .value
                    .trim();

            const deliveryLocation =
                document
                    .getElementById(
                        "deliveryLocation"
                    )
                    .value
                    .trim();

            const additionalMessage =
                document
                    .getElementById(
                        "orderMessage"
                    )
                    .value
                    .trim();


            const whatsappMessage = `
Hello ${BUSINESS_NAME}.

I would like to place a food product order.

Customer Name: ${customerName}
Phone Number: ${customerPhone}
Product: ${selectedProduct}
Order Type: ${selectedOrderType}
Quantity: ${quantity}
Delivery Location: ${deliveryLocation}

Additional Information:
${additionalMessage || "None"}

Business Location: ${BUSINESS_LOCATION}
Contact Person: ${BUSINESS_OWNER}

Please confirm availability, price and delivery arrangement.
            `.trim();


            const whatsappLink =
                `https://wa.me/${BUSINESS_WHATSAPP}` +
                `?text=${encodeURIComponent(
                    whatsappMessage
                )}`;


            orderStatus.classList.add(
                "success"
            );

            orderStatus.textContent =
                "Your order is ready. WhatsApp is opening.";


            window.open(
                whatsappLink,
                "_blank",
                "noopener,noreferrer"
            );
        }
    );


    const formFields =
        orderForm.querySelectorAll(
            "input, select, textarea"
        );

    formFields.forEach(
        function (field) {
            field.addEventListener(
                "input",
                function () {
                    clearFieldError(field);

                    orderStatus.className =
                        "form-status";

                    orderStatus.textContent = "";
                }
            );

            field.addEventListener(
                "change",
                function () {
                    clearFieldError(field);

                    orderStatus.className =
                        "form-status";

                    orderStatus.textContent = "";
                }
            );
        }
    );
}