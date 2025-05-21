document.addEventListener("DOMContentLoaded", () => {
  // Initialize the alphabet grid
  initializeAlphabetGrid();

  // Handle contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }
});

function initializeAlphabetGrid() {
  const alphabetGrid = document.querySelector(".alphabet-grid");
  if (!alphabetGrid) return;

  // Create A-Z boxes
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const letterBox = createLetterBox(letter);
    alphabetGrid.appendChild(letterBox);
  }
}

function createLetterBox(letter) {
  const box = document.createElement("div");
  box.className = "letter-box";
  box.textContent = letter;

  // Get all categories that start with this letter
  const categoriesForLetter = getAllCategoriesForLetter(letter);

  // Add click event to the letter box
  box.addEventListener("click", () => {
    displayCategoriesForLetter(letter, categoriesForLetter);
  });

  return box;
}

function getAllCategoriesForLetter(letter) {
  const categories = [];
  // Check if we have direct categories for this letter
  if (bookData[letter]) {
    categories.push(...Object.keys(bookData[letter]));
  }

  // Check all books data for categories starting with this letter
  Object.keys(bookData).forEach((key) => {
    Object.keys(bookData[key]).forEach((category) => {
      if (category.startsWith(letter) && !categories.includes(category)) {
        categories.push(category);
      }
    });
  });

  return categories.sort();
}

function displayCategoriesForLetter(letter, categories) {
  const booksDisplay = document.querySelector(".books-display");
  const currentCategory = document.getElementById("current-category");
  const booksGrid = document.querySelector(".books-grid");

  if (!booksDisplay || !currentCategory || !booksGrid) return;

  // Update current category text
  currentCategory.textContent = `Categories starting with ${letter}`;

  // Clear existing content
  booksGrid.innerHTML = "";

  if (categories.length === 0) {
    const noCategories = document.createElement("p");
    noCategories.textContent = "No categories available";
    noCategories.style.textAlign = "center";
    noCategories.style.color = "#64748b";
    noCategories.style.padding = "2rem";
    booksGrid.appendChild(noCategories);
    return;
  }

  // Create and append category cards
  categories.forEach((category) => {
    const categoryCard = createCategoryCard(category);
    booksGrid.appendChild(categoryCard);
  });

  // Scroll to categories section
  booksDisplay.scrollIntoView({ behavior: "smooth" });
}

function createCategoryCard(category) {
  const card = document.createElement("div");
  card.className = "category-card";

  card.innerHTML = `
    <h3>${category}</h3>
    <button class="explore-button" onclick="displayBooksForCategory('${category}')">
      Explore
    </button>
  `;

  return card;
}

function displayBooksForCategory(category) {
  const booksDisplay = document.querySelector(".books-display");
  const currentCategory = document.getElementById("current-category");
  const booksGrid = document.querySelector(".books-grid");

  if (!booksDisplay || !currentCategory || !booksGrid) return;

  // Update current category text
  currentCategory.textContent = category;

  // Clear existing books
  booksGrid.innerHTML = "";

  // Get all books for this category from all letters
  const books = getAllBooksForCategory(category);

  if (books.length === 0) {
    const noBooks = document.createElement("p");
    noBooks.textContent = "No books available in this category";
    noBooks.style.textAlign = "center";
    noBooks.style.color = "#64748b";
    noBooks.style.padding = "2rem";
    booksGrid.appendChild(noBooks);
    return;
  }

  // Create and append book cards
  books.forEach((book) => {
    const bookCard = createBookCard(book);
    booksGrid.appendChild(bookCard);
  });

  // Scroll to books section
  booksDisplay.scrollIntoView({ behavior: "smooth" });
}

function getAllBooksForCategory(category) {
  const books = [];

  // Search through all letters for books in this category
  Object.keys(bookData).forEach((letter) => {
    if (bookData[letter][category]) {
      books.push(...bookData[letter][category]);
    }
  });

  return books;
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  card.innerHTML = `
        <h3>${book.title}</h3>
        <div class="author">
            By <a href="${book.authorWiki}" target="_blank">${book.author}</a>
        </div>
        <button class="add-to-cart" onclick="addToCart('${book.title}')">
            Add to Cart
        </button>
    `;

  return card;
}

function addToCart(bookTitle) {
  console.log(`Added to cart: ${bookTitle}`);
  // You can enhance this function to show a cart modal or update a cart counter
  alert(`Added to cart: ${bookTitle}`);
}

function handleContactSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  console.log("Contact form submitted:", data);
  alert("Thank you for your message! We will get back to you soon.");
  e.target.reset();
}
