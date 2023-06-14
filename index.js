'use strict';

window.addEventListener('DOMContentLoaded', () => {
  let models;

  const modelTBody = document.getElementById('modelTBody');
  const modelForm = document.forms['modelForm'];
  modelForm['email'].value="@gmail.com";
  
  function createModel(e) {
    e.preventDefault();
    const name = modelForm['name'].value;
    const category = modelForm['category'].value;
    const email = modelForm['email'].value;
    const cel = modelForm['cel'].value;
    const image = modelForm['image'].value;

    models = [...models, { name, category, email, cel, image }];
    localStorage.setItem('modelsCrud', JSON.stringify(models));
    readModels();
    modelForm.reset();
    modelForm['email'].value = "@gmail.com";
  }

  function readModels() {
    modelTBody.innerHTML = '';

    models.forEach((element, index) => {
      const { name, category,email,cel, image } = element;
      // pokemonTBody.innerHTML += `
      //   <tr>
      //     <td>${index + 1}</td>
      //     <td>${name}</td>
      //     <td><span class="badge text-bg-primary">${type}</span></td>
      //     <td>
      //       <img src="${image}" alt="${name}" width="32"
      //         height="32" />
      //     </td>
      //     <td>
      //       <button class="btn btn-outline-danger btn-sm" onClick=deletePokemon(${index})>❌</button>
      //     </td>
      //   </tr>
      // `;
      const tableRow = document.createElement('tr');

      const idTableData = document.createElement('td');
      idTableData.textContent = index + 1;

      const nameTableData = document.createElement('td');
      nameTableData.textContent = name;

      const categoryTableDataT = document.createElement('td');      
      const catCategory = document.createElement('span');      
      const colorCategory = {        
        "Mis Mundo": 'primary',
        "Mis Universo":'secondary',
        "Mis Internacional": 'success',
        "Mis Perú": 'danger'
      };   
      catCategory.className = 'badge text-bg-' + colorCategory[category];
      catCategory.textContent = category;
      categoryTableDataT.appendChild(catCategory);


      const emailTableDataT = document.createElement('td');
      emailTableDataT.textContent = email;

      const celTableDataT = document.createElement('td');
      celTableDataT.textContent = cel;

      const imageTableData = document.createElement('td');
      const imageImg = document.createElement('img');
      imageImg.setAttribute('src', image);
      imageImg.setAttribute('alt', name);
      imageImg.setAttribute('width', '56px');
      imageImg.setAttribute('height', '56px');
      imageTableData.appendChild(imageImg);

      const actionsTableData = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-outline-danger btn-sm';
      deleteButton.textContent = '🗑';
      deleteButton.addEventListener('click', () => deleteModel(index));
      actionsTableData.appendChild(deleteButton);

      tableRow.appendChild(idTableData);
      tableRow.appendChild(nameTableData);
      tableRow.appendChild(categoryTableDataT);
      tableRow.appendChild(emailTableDataT);
      tableRow.appendChild(celTableDataT);
      tableRow.appendChild(imageTableData);
      tableRow.appendChild(actionsTableData);

      modelTBody.appendChild(tableRow);
    });
  }

  const deleteModel = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: 'No, cancélalo!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        models = models.filter((_, index) => index !== id);
        localStorage.setItem('modelsCrud', JSON.stringify(models));
        readModels();
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'Tu Modelo ha sido eliminado',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu Modelo está seguro',
          'error'
        );
      }
    })
  };

  if (localStorage.getItem('modelsCrud')) {
    models = JSON.parse(localStorage.getItem('modelsCrud'));
  } else {
    models = [
      { name: 'Marina Mora', category: 'Mis Universo',email:'models1@gmail.com', cel:'952931180', image: 'https://w7.pngwing.com/pngs/885/200/png-transparent-woman-s-profile-cleanser-exfoliation-face-hair-removal-facial-cosmetic-treatment-black-hair-cosmetics-lip-thumbnail.png' },
      { name: 'Patricia Veliz', category: 'Mis Mundo',email:'models2@gmail.com', cel:'981820794', image: 'https://w7.pngwing.com/pngs/424/301/png-transparent-woman-about-to-touch-her-lips-beauty-parlour-hair-care-manicure-pedicure-hairdresser-black-hair-cosmetics-people-thumbnail.png' },
      { name: 'Rocio Miranda', category: 'Mis Internacional',email:'models3@gmail.com', cel:'952748652', image: 'https://w7.pngwing.com/pngs/690/233/png-transparent-beauty-parlour-model-cosmetics-model-celebrities-black-hair-woman-thumbnail.png' },
      { name: 'Ana Maria Copello', category: 'Mis Perú',email:'models4@gmail.com', cel:'952748963', image: 'https://w7.pngwing.com/pngs/131/310/png-transparent-cosmetics-face-lotion-skin-care-model-face-people-lip-beauty-thumbnail.png' },
      { name: 'Rocio Miranda', category: 'Mis Universo',email:'models5@gmail.com', cel:'952478596', image: 'https://w7.pngwing.com/pngs/875/925/png-transparent-woman-touching-her-face-illustration-skin-therapy-wrinkle-surgery-scar-faces-face-people-cosmetics-thumbnail.png' }
    ];
    localStorage.setItem('modelsCrud', JSON.stringify(models));
  }

  modelForm.addEventListener('submit', createModel);
  readModels();
});