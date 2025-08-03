'use strict'
//#region contacts
let contacts = [
  {
    name: "Ben Salomon",
    phone: "050-580-8325",
    email: "benS@gmail.com",
    address: "12 hatikva, kiryat bialik",
    notes: "second manager of the site",
    Image: "images/person1.jpg",
  },
  {
    name: "Meitav Itah",
    phone: "052-478-7402",
    email: "meitav1010@gmail.com",
    address: "32 beit alpha , kiryat haim",
    notes: "manager of the site",
    Image: "images/person2.jpg",
  },
  {
    name: "Rinat Bar",
    phone: "054-956-7825",
    email: "rinat.bar@example.com",
    address: "456 rotshild , tel-aviv",
    notes: "singer in israel",
    Image: "images/person3.jpg",
  },
  {
    name: "Alsu Bogndanov",
    phone: "052-123-4567",
    email: "adb.kzn@gmail.com",
    address: "akko road 149, haifa",
    notes: "Best Teacher For JS",
    Image: "images/person4.jpg",
  }
];
//#endregion

//#region DOM Elements
const contactList = document.querySelector('.contacts'); // Contact list container
//#endregion
buildContactList();
//#region Refresh Contacts List
// Refresh the contact list 
function buildContactList() {
  contactList.innerHTML = '';
  // Always sort: favorites first, then A-Z
  const list = (contacts).slice().sort((a, b) => {
    if (b.favorite - a.favorite !== 0) return b.favorite - a.favorite;
    return a.name.localeCompare(b.name);
  });
  list.forEach((elem, index) => {
    const contact = document.createElement('li');
    contact.className = "contact";
    contact.setAttribute('data-id', contacts.indexOf(elem));

    const contactImg = document.createElement('img');
    contactImg.className = "avatarImg";
    contactImg.src = elem.Image;
    contactImg.title = elem.name;
    contactImg.alt = "contact pic" + (index + 1);

    const contactName = document.createElement('span');
    contactName.className = "contactName";
    contactName.textContent = elem.name + ' | ' + elem.phone;

    const actions = document.createElement('div');
    actions.className = "actions";

    // Star (favorite) button
    const starBtn = document.createElement('button');
    starBtn.className = 'favoriteContact';
    starBtn.title = elem.favorite ? 'Unmark Favorite' : 'Mark as Favorite';
    starBtn.innerHTML = elem.favorite ? '★' : '☆';

    const infoContact = document.createElement('button');
    infoContact.className = "infoDetail";
    infoContact.alt = "info";
    infoContact.title = "contactInfo";
    infoContact.textContent = "ℹ️";

    const editContact = document.createElement('button');
    editContact.className = "editContact";
    editContact.alt = "edit";
    editContact.title = "editContact";
    editContact.textContent = "✏️";

    const deleteContact = document.createElement('button');
    deleteContact.className = "deleteContact";
    deleteContact.alt = "delete";
    deleteContact.title = "deleteContact";
    deleteContact.textContent = "🗑️";

    actions.append(starBtn, infoContact, editContact, deleteContact);
    contact.append(contactImg, contactName, actions);
    contactList.append(contact);
  });
}
//#endregion

//#region Show Contact Details Popup
function showContactDetails(contact) {
  document.getElementById('popupName').textContent = contact.name;
  document.getElementById('popupPhone').textContent = contact.phone;
  document.getElementById('popupEmail').textContent = contact.email;
  document.getElementById('popupAddress').textContent = contact.address;
  document.getElementById('popupNotes').textContent = contact.notes;
  document.getElementById('contactDetailsPopup').style.display = 'block';
}
//#endregion

//#region Show Edit Contact Popup

function showEditContactPopup(editContactObj, editId) {
  document.getElementById('editName').value = editContactObj.name;
  document.getElementById('editPhone').value = editContactObj.phone;
  document.getElementById('editEmail').value = editContactObj.email;
  document.getElementById('editAddress').value = editContactObj.address;
  document.getElementById('editNotes').value = editContactObj.notes;
  document.getElementById('editImageLink').value = editContactObj.Image;
  document.getElementById('editContactPopUp').style.display = 'block';
  // Save edit ID for later update
  document.getElementById('editContactPopUp').setAttribute('data-edit-id', editId);
}
//#endregion

//#region Popup Close Buttons

//Close details popup
document.getElementById('closeDetailsBtn').addEventListener('click', () => {
  document.getElementById('contactDetailsPopup').style.display = 'none';
});

// Show add contact popup
document.getElementById('addContactBtn').addEventListener('click', () => {
  document.getElementById('addContactPopUp').style.display = 'block';
})

// Close add contact popup
document.getElementById('closeAddContactPopUp').addEventListener('click', () => {
  console.log("asdasd")
  document.getElementById('addContactPopUp').style.display = 'none';
});
// Close edit contact popup
document.getElementById('closeEditContactPopUp').addEventListener('click', () => {
  document.getElementById('editContactPopUp').style.display = 'none';
});
//#endregion

//#region Contact List events
//click events on the contact list (info, edit, delete, star)
contactList.addEventListener('click', (e) => {
  if (e.target && e.target.closest('button').classList.contains('infoDetail')) {
    const li = e.target.closest('li');
    if (li && contactList.contains(li)) {
      const id = li.getAttribute('data-id');
      const contact = contacts[id];
      showContactDetails(contact); // Show info
    }
  } else if (e.target && e.target.closest('button').classList.contains('editContact')) {
    const li = e.target.closest('li');
    if (li && contactList.contains(li)) {
      const editId = li.getAttribute('data-id');
      const editContactObj = contacts[editId];
      showEditContactPopup(editContactObj, editId); // Open edit popup
    }
  } else if (e.target && e.target.closest('button').classList.contains('deleteContact')) {
    const li = e.target.closest('li');
    if (li && contactList.contains(li)) {
      const deleteId = li.getAttribute('data-id');
      const contactName = contacts[deleteId].name; //delete contact
      // Confirm before delete
      if (confirm(`Are you sure you want to delete the contact: ${contactName}?`)) {
        contacts.splice(deleteId, 1); // Remove from array
        buildContactList(); // Refresh UI
      }
    }
  } else if (e.target && e.target.closest('button').classList.contains('favoriteContact')) {
    const li = e.target.closest('li');
    if (li && contactList.contains(li)) {
      const id = li.getAttribute('data-id');
      contacts[id].favorite = !contacts[id].favorite; //star button(favourite)
      buildContactList();//refresh UI
    }
  }
});
//#endregion

//#region Add Contact 
// Add contact save button
document.getElementById('save').addEventListener('click', function () {
  // Get input field values
  const name = document.getElementById('addName').value;
  const phone = document.getElementById('addPhone').value;
  const email = document.getElementById('addEmail').value;
  const address = document.getElementById('addAddress').value;
  const notes = document.getElementById('addNotes').value;
  const imageLink = document.getElementById('addImageLink').value || 'images/default.jpg';

  // Required fields check
  if (!name || !phone) {
    alert('Name and Phone are required fields!');
    return;
  }

  // Phone prefix validation
  const prefix = phone.substring(0, 3);
  const validPrefixes = ['054', '050', '052'];
  let isValidPrefix = false;
  for (let i = 0; i < validPrefixes.length; i++) {
    if (prefix === validPrefixes[i]) {
      isValidPrefix = true;
      break;
    }
  }
  if (!isValidPrefix) {
    alert('Phone must start with 054, 050, or 052!');
    return;
  }

  // Phone length and digits only check
  if (phone.length !== 10) {
    alert('Phone must be exactly 10 digits!');
    return;
  }
  for (let i = 0; i < phone.length; i++) {
    if (phone[i] < '0' || phone[i] > '9') {
      alert('Phone must contain only numbers!');
      return;
    }
  }

  // Simple email format check
  let isValidEmail = false;
  for (let i = 0; i < email.length; i++) {
    if (email[i] === '@') {
      isValidEmail = true;
      break;
    }
  }

  // Check for duplicate name (case-insensitive)
  if (contacts.some(c => c.name.trim().toLowerCase() === name.trim().toLowerCase())) {
    alert('A contact with this name already exists!');
    return;
  }

  // Create new contact object
  const newContact = {
    name: name,
    phone: phone,
    email: email,
    address: address,
    notes: notes,
    Image: imageLink
  };

  // Add to contacts array
  contacts.push(newContact);

  // Sort contacts array in-place after adding
  contacts.sort((a, b) => {
    if ((b.favorite ? 1 : 0) - (a.favorite ? 1 : 0) !== 0) return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
    return a.name.localeCompare(b.name);
  });
  buildContactList();

  // Clear form and close popup
  document.getElementById('addContactPopUp').style.display = 'none';
  document.getElementById('addPhone').value = '';
  document.getElementById('addEmail').value = '';
  document.getElementById('addAddress').value = '';
  document.getElementById('addNotes').value = '';
  document.getElementById('addImageLink').value = '';
  document.getElementById('popupName').textContent = '';
});
//#endregion

// Save edited contact changes
document.getElementById('saveEdit').addEventListener('click', function () {
  const id = document.getElementById('editContactPopUp').getAttribute('data-edit-id');
  if (id !== null) {
    contacts[id] = {
      name: document.getElementById('editName').value,
      phone: document.getElementById('editPhone').value,
      email: document.getElementById('editEmail').value,
      address: document.getElementById('editAddress').value,
      notes: document.getElementById('editNotes').value,
      Image: document.getElementById('editImageLink').value || 'images/default.jpg',
      favorite: contacts[id].favorite // preserve favorite status
    };
    // Sort contacts array after editing
    contacts.sort((a, b) => {
      if ((b.favorite ? 1 : 0) - (a.favorite ? 1 : 0) !== 0) return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
      return a.name.localeCompare(b.name);
    });
    document.getElementById('editContactPopUp').style.display = 'none';
    buildContactList(); // Refresh UI with changes
  }
});
//#endregion

//#region Favorite Property
// Add a favorite property to each contact if not present
contacts.forEach(c => { if (typeof c.favorite === 'undefined') c.favorite = false; });
//#endregion

//#region Initial refresh
// Initial refresh of all contacts
buildContactList();
//#endregion

//#region Search 
// Search input 
document.getElementById('searchInput').addEventListener('input', function () {
  const searchValue = this.value.trim().toLowerCase();
  if (searchValue === '') {
    buildContactList();
  } else {
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(searchValue));
    buildContactList(filtered);
  }
});
//#endregion

//#region Delete All Contacts
// Delete all contacts button
document.getElementById('deleteAllBtn').addEventListener('click', function () {
  if (confirm('Are you sure you want to delete all contacts?')) {
    contacts.length = 0;
    buildContactList();
  }
});
//#endregion

//#region Contact Hover Effects
// Add hover on contact
contactList.addEventListener('mouseover', function (e) {
  const li = e.target.closest('.contact');
  if (li && contactList.contains(li)) {
    li.style.backgroundColor = '#bbbfc9';
  }
});
contactList.addEventListener('mouseout', function (e) {
  const li = e.target.closest('.contact');
  if (li && contactList.contains(li)) {
    li.style.backgroundColor = 'white';
  }
});
//#endregion

//#region Secret Button 
const greatJobBtn = document.createElement('button');
greatJobBtn.id = 'greatJobBtn';
greatJobBtn.textContent = 'Click Me';

document.body.insertBefore(greatJobBtn, document.body.firstChild);

// Add overlay for the message
const greatJobOverlay = document.createElement('div');
greatJobOverlay.id = 'greatJobOverlay';
greatJobOverlay.textContent = 'Great Job!!!';
greatJobOverlay.style.display = 'none';

document.body.appendChild(greatJobOverlay);

greatJobBtn.addEventListener('click', () => {
  greatJobOverlay.style.display = 'flex';
  setTimeout(() => {
    greatJobOverlay.style.opacity = '1';
  }, 10);
});

greatJobOverlay.addEventListener('click', () => {
  greatJobOverlay.style.opacity = '0';
  setTimeout(() => {
    greatJobOverlay.style.display = 'none';
  }, 300);
});
//#endregion

