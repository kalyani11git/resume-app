function addExperience() {
    const experienceDiv = document.createElement('div');
    experienceDiv.className = 'input-group';
    experienceDiv.innerHTML = `
        <input type="text" placeholder="Company Name" />
        <input type="text" placeholder="Position" />
        <input type="text" placeholder="Location" />
        <input type="date" placeholder="Start Date" />
        <input type="date" placeholder="End Date" />
        <textarea placeholder="Job Responsibilities"></textarea>
        <button class="remove-btn" onclick="removeInput(this)">Remove</button>
    `;
    document.getElementById('experienceInputs').appendChild(experienceDiv);
}

document.getElementById('profileImage').addEventListener('change', function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const imgPreview = document.getElementById('profileImgPreview');
        imgPreview.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});


function addEducation() {
    const educationDiv = document.createElement('div');
    educationDiv.className = 'input-group';
    educationDiv.innerHTML = `
        <input type="text" placeholder="Institution Name" />
        <input type="text" placeholder="Degree" />
        <input type="text" placeholder="Field of Study" />
        <input type="date" placeholder="Start Date" />
        <input type="date" placeholder="End Date" />
        <button class="remove-btn" onclick="removeInput(this)">Remove</button>
    `;
    document.getElementById('educationInputs').appendChild(educationDiv);
}

function addCertification() {
    const certificationDiv = document.createElement('div');
    certificationDiv.className = 'input-group';
    certificationDiv.innerHTML = `
        <input type="text" placeholder="Certification Name" />
        <input type="text" placeholder="Issuing Organization" />
        <input type="date" placeholder="Certification Date" />
        <button class="remove-btn" onclick="removeInput(this)">Remove</button>
    `;
    document.getElementById('certificationInputs').appendChild(certificationDiv);
}

function addProject() {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'input-group';
    projectDiv.innerHTML = `
        <input type="text" placeholder="Project Name" />
        <input type="text" placeholder="Project Description" />
        <input type="text" placeholder="Technologies Used" />
        <input type="date" placeholder="Start Date" />
        <input type="date" placeholder="End Date" />
        <button class="remove-btn" onclick="removeInput(this)">Remove</button>
    `;
    document.getElementById('projectInputs').appendChild(projectDiv);
}

function removeInput(button) {
    button.parentElement.remove();
}

function generateResume() {
    const profileImgPreview = document.getElementById('profileImgPreview');
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const summary = document.getElementById('summary').value;

    document.getElementById('namePreview').innerText = +fullName;
    document.getElementById('emailPreview').innerText = email;
    document.getElementById('phonePreview').innerText = phone;
    document.getElementById('locationPreview').innerText = location;
    document.getElementById('summaryPreview').innerText = summary;

    // Handling Work Experience
    const experiences = document.querySelectorAll('#experienceInputs .input-group');
    let workExperienceHTML = '';
    experiences.forEach(exp => {
        const company = exp.querySelector('input[type=text]').value;
        const position = exp.querySelectorAll('input[type=text]')[1].value;
        const location = exp.querySelectorAll('input[type=text]')[2].value;
        const startDate = exp.querySelectorAll('input[type=date]')[0].value;
        const endDate = exp.querySelectorAll('input[type=date]')[1].value;
        const responsibilities = exp.querySelector('textarea').value;
        
        workExperienceHTML += `
            <h4>${company}</h4>
            <p>${position}, ${location}</p>
            <p>${startDate} - ${endDate}</p>
            <p>${responsibilities}</p>
        `;
    });
    document.getElementById('workExperiencePreview').innerHTML = workExperienceHTML;

    // Handling Education
    const educations = document.querySelectorAll('#educationInputs .input-group');
    let educationHTML = '';
    educations.forEach(edu => {
        const institution = edu.querySelector('input[type=text]').value;
        const degree = edu.querySelectorAll('input[type=text]')[1].value;
        const field = edu.querySelectorAll('input[type=text]')[2].value;
        const startDate = edu.querySelectorAll('input[type=date]')[0].value;
        const endDate = edu.querySelectorAll('input[type=date]')[1].value;
        
        educationHTML += `
            <h4>${institution}</h4>
            <p>${degree} in ${field}</p>
            <p>${startDate} - ${endDate}</p>
        `;
    });
    document.getElementById('educationPreview').innerHTML = educationHTML;

    // Handling Certifications
    const certifications = document.querySelectorAll('#certificationInputs .input-group');
    let certificationsHTML = '';
    certifications.forEach(cert => {
        const name = cert.querySelector('input[type=text]').value;
        const organization = cert.querySelectorAll('input[type=text]')[1].value;
        const certDate = cert.querySelector('input[type=date]').value;

        certificationsHTML += `
            <h4>${name}</h4>
            <p>Issued by ${organization}</p>
            <p>${certDate}</p>
        `;
    });
    document.getElementById('certificationsPreview').innerHTML = certificationsHTML;

    // Handling Projects
    const projects = document.querySelectorAll('#projectInputs .input-group');
    let projectsHTML = '';
    projects.forEach(proj => {
        const name = proj.querySelector('input[type=text]').value;
        const description = proj.querySelectorAll('input[type=text]')[1].value;
        const technologies = proj.querySelectorAll('input[type=text]')[2].value;
        const startDate = proj.querySelectorAll('input[type=date]')[0].value;
        const endDate = proj.querySelectorAll('input[type=date]')[1].value;

        projectsHTML += `
            <h4>${name}</h4>
            <p>${description}</p>
            <p>Technologies: ${technologies}</p>
            <p>${startDate} - ${endDate}</p>
        `;
    });
    document.getElementById('projectsPreview').innerHTML = projectsHTML;
}

// Download Resume
document.getElementById('downloadResume').addEventListener('click', function () {
    const resumeContent = document.getElementById('resumeContent');

    html2canvas(resumeContent).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 277); // A4 dimensions
        pdf.save('resume.pdf');
    });
});


// document.getElementById('downloadResume').addEventListener('click', function () {
//     const resumeContent = document.getElementById('resumeContent');

//     html2canvas(resumeContent).then(function (canvas) {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         pdf.addImage(imgData, 'PNG', 10, 10, 190, 277); // A4 dimensions
//         pdf.save('resume.pdf');
//     });
// });

