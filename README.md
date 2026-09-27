# Pydantic Practice Website (Static Bundle)

This package contains a complete, zero-dependency practice website for mastering Python's **Pydantic V2** library.

## File Structure

```text
pydantic-practice-website/
├── index.html        <-- Web interface & application layout
├── css/
│   └── styles.css    <-- Styling (Responsive Dark Mode)
├── js/
│   ├── questions.js  <-- Question bank & flashcard database
│   └── app.js        <-- Quiz logic, score tracking, local storage
└── README.md         <-- Instructions for usage & deployment
```

## How to Run Locally

1. Unzip `pydantic_practice_website.zip`.
2. Double click `index.html` to open it directly in any modern web browser (Chrome, Firefox, Safari, Edge).
3. No web server, Node.js, or database is required!

## How to Deploy for Free

### Option 1: Netlify Drop (10 Seconds)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the unzipped `pydantic-practice-website` folder onto the web page.
3. Your site will immediately go live with a free SSL domain!

### Option 2: GitHub Pages
1. Create a repository on GitHub.
2. Push these files into the repository.
3. Enable **GitHub Pages** under `Settings > Pages > Branch: main`.

## How to Add More Questions

Open `js/questions.js` and append new items to the `questionBank` array following this structure:

```javascript
{
  id: 9,
  category: "Validation",
  question: "Your question text here?",
  options: [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  correct: 0, // Index of correct option (0-3)
  explanation: "Detailed explanation of why Option 1 is correct."
}
```
