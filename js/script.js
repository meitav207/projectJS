'use strict'
// אנשי קשר קבועים התחלתיים במערך
const contacts = [
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
];

const contactList = document.querySelector('.contacts')
contacts.forEach((elem,index)=>{
  const contact = document.createElement('li');
  contact.className="contact";

  const contactImg = document.createElement('img');
  contactImg.className="avatarImg";
  contactImg.src = elem.Image;
  contactImg.title=elem.name;
  contactImg.alt="contact pic"+(index+1);

  const contactName = document.createElement('span');
  contactName.className="contactName";
  contactName.textContent=elem.name;

  const actions = document.createElement('div');
  actions.className="actions";

  const infoContact = document.createElement('button');
  infoContact.className="infoDetail";
  infoContact.alt="info";
  infoContact.textContent = "ℹ️";

  const editContact = document.createElement('button');
  editContact.className="editContact";
  editContact.alt="edit";
  editContact.textContent = "✏️";

  const deleteContact = document.createElement('button');
  deleteContact.className = "deleteContact";
  deleteContact.alt="delete";
  deleteContact.textContent = "🗑️";

  actions.append(infoContact,editContact,deleteContact)
  contact.append(contactImg,contactName,actions)
  contactList.append(contact)
});
