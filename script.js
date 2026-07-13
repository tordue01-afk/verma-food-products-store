"use strict";

const BUSINESS_NAME = "Verma Logistics Services";
const BUSINESS_OWNER = "Regina Mbaveren Ande";
const BUSINESS_WHATSAPP = "2347062206682";
const BUSINESS_LOCATION = "Adamawa State, Nigeria";

const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelectorAll(".nav-link");
const pageSections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const productButtons = document.querySelectorAll(
    ".product-order-button"
);
const galleryButtons = document.querySelectorAll(
    ".gallery-order-button"
);
const orderForm = document.getElementById("orderForm");
const orderProduct = document.getElementById("orderProduct");
const orderStatus = document.getElementById("orderStatus");
const currentYear = document.getElementById("currentYear");


/* Current Year */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* Image Placeholder */

function escapeSvgText(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}


function divideLabelIntoLines(label) {
    const words = label.trim().split(/\s+/);

    if (words.length <= 2) {
        return [label, ""];
    }

    const middle = Math.ceil(words.length / 2);

    return [
        words.slice(0, middle).join(" "),
        words.slice(middle).join(" ")
    ];
}


function createImagePlaceholder(label) {
    const safeLabel =
        label.toLowerCase().includes("logo")
            ? "Verma Logistics"
            : label;

    const [firstLine, secondLine] =
        divideLabelIntoLines(safeLabel);

    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="900"
            height="650"
            viewBox="0 0 900 650"
        >
            <defs>
                <linearGradient
                    id="background"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                >
                    <stop
                        offset="0%"
                        stop-color="#034d28"
                    />

                    <stop
                        offset="55%"
                        stop-color="#08783f"
                    />

                    <stop
                        offset="100%"
                        stop-color="#d62828"
                    />
                </linearGradient>

                <filter id="shadow">
                    <feDropShadow
                        dx="0"
                        dy="12"
                        stdDeviation="16"
                        flood-opacity="0.22"
                    />
                </filter>
            </defs>

            <rect
                width="900"
                height="650"
                fill="url(#background)"
            />

            <circle
                cx="760"
                cy="100"
                r="180"
                fill="#ffffff"
                opacity="0.07"
            />

            <circle
                cx="100"
                cy="570"
                r="220"
                fill="#ffffff"
                opacity="0.06"
            />

            <rect
                x="170"
                y="145"
                width="560"
                height="360"
                rx="45"
                fill="#ffffff"
                opacity="0.96"
                filter="url(#shadow)"
            />

            <circle
                cx="450"
                cy="260"
                r="62"
                fill="#eaf7ef"
            />

            <path
                d="
                    M420 280
                    C420 230 455 195 505 198
                    C500 248 470 280 420 280
                    Z
                "
                fill="#08783f"
            />

            <path
                d="
                    M430 276
                    C450 250 470 230 493 210
                "
                fill="none"
                stroke="#d62828"
                stroke-width="10"
                stroke-linecap="round"
            />

            <text
                x="450"
                y="375"
                text-anchor="middle"
                font-family="Arial, Helvetica, sans-serif"
                font-size="42"
                font-weight="700"
                fill="#17251d"
            >
                ${escapeSvgText(firstLine)}
            </text>

            ${
                secondLine
                    ? `
                        <text
                            x="450"
                            y="430"
                            text-anchor="middle"
                            font-family="Arial, Helvetica, sans-serif"
                            font-size="42"
                            font-weight="700"
                            fill="#17251d"
                        >
                            ${escapeSvgText(secondLine)}
                        </text>
                    `
                    : ""
            }

            <text
                x="450"
                y="475"
                text-anchor="middle"
                font-family="Arial, Helvetica, sans-serif"
                font-size="22"
                font-weight="600"
                fill="#08783f"
            >
                Verma Logistics Services
            </text>
        </svg>
    `;

    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg)
    );
}


function displayImagePlaceholder(image) {
    if (!image) {
        return;
    }

    if (image.dataset.placeholderActive === "true") {
        return;
    }

    image.dataset.placeholderActive = "true";

    const label =
        image.getAttribute("alt") ||
        "Verma Food Product";

    image.src = createImagePlaceholder(label);
}


function prepareImageFallback(image) {
    if (!image) {
        return;
    }

    image.addEventListener("error", function () {
        displayImagePlaceholder(image);
    });

    if (
        image.complete &&
        image.naturalWidth === 0
    ) {
        displayImagePlaceholder(image);
    }
}


document.querySelectorAll("img").forEach(
    function (image) {
        prepareImageFallback(image);
    }
);


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


window.addEventListener("scroll", updateHeader);

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
            const menuIsOpen =
                navbar.classList.contains("open");

            if (menuIsOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    );
}


navLinks.forEach(function (link) {
    link.addEventListener(
        "click",
        closeMenu
    );
});


document.addEventListener(
    "click",
    function (event) {
        if (!navbar || !menuButton) {
            return;
        }

        const clickedInsideNavbar =
            navbar.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

        if (
            navbar.classList.contains("open") &&
            !clickedInsideNavbar &&
            !clickedMenuButton
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
                sectionTop +
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                activeSection =
                    section.getAttribute("id");
            }
        }
    );

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${activeSection}`
        ) {
            link.classList.add("active");
        }
    });
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
                        if (
                            entry.isIntersecting
                        ) {
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


/* Product Selection */

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


/* Product Gallery */

const products = [
    {
        name: "Melon Seed",
        image: "./images/melon-seed.jpg"
    },
    {
        name: "Ogbono",
        image: "./images/ogbono.jpg"
    },
    {
        name: "Groundnut Oil",
        image: "./images/groundnut-oil.jpg"
    },
    {
        name: "Red Palm Oil",
        image: "./images/palm-oil.jpg"
    },
    {
        name: "Honey",
        image: "./images/honey.jpg"
    },
    {
        name: "Dried Pepper",
        image: "./images/dried-pepper.jpg"
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
    const shuffledProducts = [
        ...productList
    ];

    for (
        let index =
            shuffledProducts.length - 1;
        index > 0;
        index -= 1
    ) {
        const randomIndex =
            Math.floor(
                Math.random() *
                (index + 1)
            );

        [
            shuffledProducts[index],
            shuffledProducts[randomIndex]
        ] = [
            shuffledProducts[randomIndex],
            shuffledProducts[index]
        ];
    }

    return shuffledProducts;
}


function updateGallery() {
    displayedProducts =
        shuffleProducts(products)
            .slice(0, 3);

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
                    image.dataset.placeholderActive =
                        "false";

                    image.alt = product.name;
                    image.src = product.image;

                    title.textContent =
                        product.name;

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
                        button.dataset
                            .galleryIndex
                    );

                const product =
                    displayedProducts[index];

                if (product) {
                    moveToOrderForm(
                        product.name
                    );
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


function showFieldError(field, message) {
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

            if (orderStatus) {
                orderStatus.className =
                    "form-status";

                orderStatus.textContent = "";
            }

            if (!validateOrderForm()) {
                if (orderStatus) {
                    orderStatus.classList.add(
                        "error"
                    );

                    orderStatus.textContent =
                        "Please complete the highlighted fields.";
                }

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


            if (orderStatus) {
                orderStatus.classList.add(
                    "success"
                );

                orderStatus.textContent =
                    "Your order is ready. WhatsApp is opening.";
            }


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

                    if (orderStatus) {
                        orderStatus.className =
                            "form-status";

                        orderStatus.textContent =
                            "";
                    }
                }
            );


            field.addEventListener(
                "change",
                function () {
                    clearFieldError(field);

                    if (orderStatus) {
                        orderStatus.className =
                            "form-status";

                        orderStatus.textContent =
                            "";
                    }
                }
            );
        }
    );
}