document.getElementById('portfolioForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const portfolioData = Object.fromEntries(formData.entries());

    const imageFile = formData.get('image');
    const publicationFile = formData.get('publications');

    if (imageFile.size > 5242880) {
        alert('Image file size should be less than 5MB');
        return;
    }

    if (publicationFile.size > 2097152) {
        alert('Paper publications file size should be less than 2MB');
        return;
    }

    const portfolioWindow = window.open('', '_blank');
    portfolioWindow.document.write(generatePortfolioHTML(portfolioData, URL.createObjectURL(imageFile), URL.createObjectURL(publicationFile)));
    portfolioWindow.document.close();

    // Add a delay to ensure the document is fully loaded before adding the button
    portfolioWindow.onload = function() {
        const downloadButton = portfolioWindow.document.createElement('button');
        downloadButton.innerText = 'Download as PDF';
        downloadButton.onclick = () => downloadAsPDF(portfolioData, URL.createObjectURL(imageFile));
        portfolioWindow.document.body.appendChild(downloadButton);
    };
});

function generatePortfolioHTML(data, imageURL, publicationURL) {
    return `
        <html>
        <head>
            <title>${data.name}'s Portfolio</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .container { max-width: 800px; margin: auto; padding: 20px; }
                h1 { text-align: center; }
                .section { margin-bottom: 20px; }
                .section h2 { border-bottom: 2px solid #1b1c1c; padding-bottom: 10px; }
                img { max-width: 150px; border-radius: 50%; }
                nav { background-color: #1b1c1c; padding: 10px; }
                nav a { color: white; margin: 0 10px; text-decoration: none; }
                .page { display: none; }
                .page.active { display: block; }
            </style>
        </head>
        <body>
            <nav>
                <a href="#home" onclick="showPage('home')">Home</a>
                <a href="#experience" onclick="showPage('experience')">Experience</a>
                <a href="#specialization" onclick="showPage('specialization')">Specialization</a>
                <a href="#achievements" onclick="showPage('achievements')">Achievements</a>
                <a href="#articles" onclick="showPage('articles')">Articles</a>
                <a href="#books" onclick="showPage('books')">Books</a>
                <a href="#certificates" onclick="showPage('certificates')">Certificates</a>
                <a href="#contact" onclick="showPage('contact')">Contact</a>
                <a href="#links" onclick="showPage('links')">Links</a>
                <a href="#publications" onclick="showPage('publications')">Publications</a>
            </nav>
            <div class="container">
                <div id="home" class="page active">
                    <h1>${data.name}'s Portfolio</h1>
                    <img src="${imageURL}" alt="${data.name}">
                </div>
                <div id="experience" class="page">
                    <h2>Work/Teaching Experience</h2>
                    <p>${data.experience}</p>
                </div>
                <div id="specialization" class="page">
                    <h2>Specialization in Teaching</h2>
                    <p>${data.specialization}</p>
                </div>
                <div id="achievements" class="page">
                    <h2>Achievements</h2>
                    <p>${data.achievements}</p>
                </div>
                <div id="articles" class="page">
                    <h2>Published Articles</h2>
                    <p><a href="${data.articles}" target="_blank">${data.articles}</a></p>
                </div>
                <div id="books" class="page">
                    <h2>Books</h2>
                    <p>${data.books}</p>
                </div>
                <div id="certificates" class="page">
                    <h2>Certificates</h2>
                    <p>${data.certificates}</p>
                </div>
                <div id="contact" class="page">
                    <h2>Contact Details</h2>
                    <p>${data.contact}</p>
                </div>
                <div id="links" class="page">
                    <h2>Links</h2>
                    <p>LinkedIn: <a href="${data.linkedin}" target="_blank">${data.linkedin}</a></p>
                    <p>GitHub: <a href="${data.github}" target="_blank">${data.github}</a></p>
                    <p>YouTube: <a href="${data.youtube}" target="_blank">${data.youtube}</a></p>
                    <p>Resume: <a href="${data.resume}" target="_blank">${data.resume}</a></p>
                </div>
                <div id="publications" class="page">
                    <h2>Paper Publications</h2>
                    <p><a href="${publicationURL}" target="_blank">${data.publications.name}</a></p>
                </div>
            </div>
            <script>
                function showPage(pageId) {
                    document.querySelectorAll('.page').forEach(page => {
                        page.classList.remove('active');
                    });
                    document.getElementById(pageId).classList.add('active');
                }
            </script>
        </body>
        </html>
    `;
}

function downloadAsPDF(data, imageURL) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(`${data.name}'s Portfolio`, 10, 10);
    doc.addImage(imageURL, 'JPEG', 10, 20, 50, 50);

    let y = 80;
    const sections = [
        { title: 'Work/Teaching Experience', content: data.experience },
        { title: 'Specialization in Teaching', content: data.specialization },
        { title: 'Achievements', content: data.achievements },
        { title: 'Published Articles', content: data.articles },
        { title: 'Books', content: data.books },
        { title: 'Certificates', content: data.certificates },
        { title: 'Contact Details', content: data.contact },
        { title: 'LinkedIn', content: data.linkedin },
        { title: 'GitHub', content: data.github },
        { title: 'YouTube', content: data.youtube },
        { title: 'Resume', content: data.resume },
        { title: 'Paper Publications', content: data.publications.name },
    ];

    sections.forEach(section => {
        doc.text(section.title, 10, y);
        y += 10;
        doc.text(section.content, 10, y);
        y += 20;
    });

    doc.save(`${data.name}_Portfolio.pdf`);
}




// document.getElementById('portfolioForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const portfolioData = Object.fromEntries(formData.entries());

//     const imageFile = formData.get('image');
//     const publicationFile = formData.get('publications');

//     if (imageFile.size > 5242880) {
//         alert('Image file size should be less than 5MB');
//         return;
//     }

//     if (publicationFile.size > 2097152) {
//         alert('Paper publications file size should be less than 2MB');
//         return;
//     }

//     const portfolioWindow = window.open('', '_blank');
//     portfolioWindow.document.write(generatePortfolioHTML(portfolioData, URL.createObjectURL(imageFile)));
//     portfolioWindow.document.close();

//     // Add a delay to ensure the document is fully loaded before adding the button
//     portfolioWindow.onload = function() {
//         const downloadButton = portfolioWindow.document.createElement('button');
//         downloadButton.innerText = 'Download as PDF';
//         downloadButton.onclick = () => downloadAsPDF(portfolioData, URL.createObjectURL(imageFile));
//         portfolioWindow.document.body.appendChild(downloadButton);
//     };
// });

// function generatePortfolioHTML(data, imageURL) {
//     return `
//         <html>
//         <head>
//             <title>${data.name}'s Portfolio</title>
//             <style>
//                 body { font-family: Arial, sans-serif; }
//                 .container { max-width: 800px; margin: auto; padding: 20px; }
//                 h1 { text-align: center; }
//                 .section { margin-bottom: 20px; }
//                 .section h2 { border-bottom: 2px solid #007BFF; padding-bottom: 10px; }
//                 img { max-width: 150px; border-radius: 50%; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <h1>${data.name}'s Portfolio</h1>
//                 <div class="section">
//                     <h2>Work/Teaching Experience</h2>
//                     <p>${data.experience}</p>
//                 </div>
//                 <div class="section">
//                     <h2>Specialization in Teaching</h2>
//                     <p>${data.specialization}</p>
//                 </div>
//                 <div class="section">
//                     <h2>Image</h2>
//                     <img src="${imageURL}" alt="${data.name}">
//                 </div>
//                 <div class="section">
//                     <h2>Achievements</h2>
//                     <p>${data.achievements}</p>
//                 </div>
//                 <div class="section">
//                     <h2>Published Articles</h2>
//                     <p><a href="${data.articles}" target="_blank">${data.articles}</a></p>
//                 </div>
//                 <div class="section">
//                     <h2>Books</h2>
//                     <p>${data.books}</p>
//                 </div>
//                 <div class="section">
//                     <h2>Certificates</h2>
//                     <p>${data.certificates}</p>
//                 </div>
//                 <div class="section">
//                     <h2>Contact Details</h2>
//                     <p>${data.contact}</p>
//                 </div>
//                 <div class="section">
//                     <h2>LinkedIn</h2>
//                     <p><a href="${data.linkedin}" target="_blank">${data.linkedin}</a></p>
//                 </div>
//                 <div class="section">
//                     <h2>GitHub</h2>
//                     <p><a href="${data.github}" target="_blank">${data.github}</a></p>
//                 </div>
//                 <div class="section">
//                     <h2>YouTube</h2>
//                     <p><a href="${data.youtube}" target="_blank">${data.youtube}</a></p>
//                 </div>
//                 <div class="section">
//                     <h2>Resume</h2>
//                     <p><a href="${data.resume}" target="_blank">${data.resume}</a></p>
//                 </div>
//                 <div class="section">
//                     <h2>Paper Publications</h2>
//                     <p>${data.publications.name}</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//     `;
// }

// function downloadAsPDF(data, imageURL) {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     doc.text(`${data.name}'s Portfolio`, 10, 10);
//     doc.addImage(imageURL, 'JPEG', 10, 20, 50, 50);

//     let y = 80;
//     const sections = [
//         { title: 'Work/Teaching Experience', content: data.experience },
//         { title: 'Specialization in Teaching', content: data.specialization },
//         { title: 'Achievements', content: data.achievements },
//         { title: 'Published Articles', content: data.articles },
//         { title: 'Books', content: data.books },
//         { title: 'Certificates', content: data.certificates },
//         { title: 'Contact Details', content: data.contact },
//         { title: 'LinkedIn', content: data.linkedin },
//         { title: 'GitHub', content: data.github },
//         { title: 'YouTube', content: data.youtube },
//         { title: 'Resume', content: data.resume },
//         { title: 'Paper Publications', content: data.publications.name },
//     ];

//     sections.forEach(section => {
//         doc.text(section.title, 10, y);
//         y += 10;
//         doc.text(section.content, 10, y);
//         y += 20;
//     });

//     doc.save(`${data.name}_Portfolio.pdf`);
// }
