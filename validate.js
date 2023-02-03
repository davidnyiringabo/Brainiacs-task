// let placeholder = document.getElementById('placeholder');
// let form = document.getElementById('form');
// let password = document.getElementById('password');

// console.log(form.childNodes)
// form.addEventListener('submit', () => {
//     form.forEach(element => {
//         console.log(form[element])
//     });
// })

let imgtoggler = document.getElementById('input-profilePicture');
// let imgPlaceholder = document.getElementById('display-img');
let uploadedImg = '';
let form = document.getElementById('form')
let password = document.getElementById('password')
let email = document.getElementById('email');
let conformPassword = document.getElementById('conformPassword')

let submit = document.getElementById('submitButton');

// form.addEventListener('submit', (form) = > {
//     console(form.childNodes[3].childNodes[1].value)
// })

submit.addEventListener('click', (e) => {
    e.preventDefault();
    const initialPassword = form.children[4].children[1].value;
    const finalPassword = form.children[5].children[1].value;

    if (initialPassword !== finalPassword) {
        // document.createElement('p').innerHTML = "Passwords doesn't match";
        document.getElementById('validation').style.display = 'inherit'
        submit.removeEventListener();
        // console.log('Passwords does not match')
    } else {
        // document.getElementById('validation').style.display = 'none'
        form.addEventListener('submit', () => {
            function submitForm(email) {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "/form", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify({ email: email }));
            }

            submitForm(`${email}`);
        })



    }
})


imgtoggler.addEventListener('change', () => {
    // console.log(imgtoggler.value);

    const reader = new FileReader();

    reader.addEventListener('load', () => {
        uploadedImg = reader.result;
        // imgPlaceholder.style.backgroundImage = `url( ${uploadedImg})`
        document.getElementById('display-img').style.backgroundImage = `url(${uploadedImg})`
        reader.readAsDataURL(this.Files[0]);
    })
    reader.readAsDataURL(this.Files[0]);
})