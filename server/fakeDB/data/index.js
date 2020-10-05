const mongoose = require('mongoose');
const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();

const image1Id = mongoose.Types.ObjectId();
const image2Id = mongoose.Types.ObjectId();
const image3Id = mongoose.Types.ObjectId();
const image4Id = mongoose.Types.ObjectId();
const image5Id = mongoose.Types.ObjectId();

exports.images = [
  {
    _id: image1Id,
    cloudinaryId: 'fdtnnlou6ykg1n2escke',
    url:
      'https://res.cloudinary.com/ddgarlelj/image/upload/v1599206835/fdtnnlou6ykg1n2escke.jpg'
  },
  {
    _id: image2Id,
    cloudinaryId: 'toevmnduf8kmfhuxpq1s',
    url:
      'https://res.cloudinary.com/ddgarlelj/image/upload/v1599206801/toevmnduf8kmfhuxpq1s.jpg'
  },
  {
    _id: image3Id,
    cloudinaryId: 'tkoewud9vbnuypq9ivgt',
    url:
      'https://res.cloudinary.com/ddgarlelj/image/upload/v1599206821/tkoewud9vbnuypq9ivgt.jpg'
  },
  {
    _id: image4Id,
    cloudinaryId: 'subu8hcsiq9i2vrefrno',
    url:
      'https://res.cloudinary.com/ddgarlelj/image/upload/v1599206809/subu8hcsiq9i2vrefrno.jpg'
  },
  {
    _id: image5Id,
    cloudinaryId: 'st7lwyeey4qgpaavf3md',
    url:
      'https://res.cloudinary.com/ddgarlelj/image/upload/v1599206828/st7lwyeey4qgpaavf3md.jpg'
  }
];

exports.users = [
  {
    _id: user1Id,
    username: 'abcd',
    email: 'abcd@email.com',
    password: 'test@1234'
  },
  {
    _id: user2Id,
    username: 'test',
    email: 'test@email.com',
    password: 'test@1234'
  },
  {
    _id: user3Id,
    username: 'imac',
    email: 'imac@email.com',
    password: 'test@1234'
  }
];

exports.rentals = [
  {
    title: 'black pearl',
    city: 'prague',
    street: 'Havelská Street',
    category: 'condo',
    image: image1Id,
    numOfRooms: 7,
    shared: true,
    description: 'Very nice house in center of the city.',
    dailyPrice: 163,
    owner: user1Id
  },

  {
    title: 'modern apartment in center',
    city: 'new york',
    street: '57 E 57th St',
    category: 'apartment',
    image: image2Id,
    numOfRooms: 2,
    shared: false,
    description: 'Very nice apartment in center of the city.',
    dailyPrice: 11,
    owner: user3Id
  },
  {
    title: 'lovely house in nature',
    city: 'bratislava',
    street: 'Rybné námestie 1',
    category: 'house',
    image: image3Id,
    numOfRooms: 5,
    shared: true,
    description: 'Very nice house in center of the city.',
    dailyPrice: 23,
    owner: user1Id
  },
  {
    title: 'blue stripe',
    city: 'budapest',
    street: 'Váci street',
    category: 'apartment',
    image: image4Id,
    numOfRooms: 3,
    shared: true,
    description: 'Very nice apartment in center of the city.',
    dailyPrice: 52,
    owner: user2Id
  },
  {
    title: 'nice view on ocean',
    city: 'san francisco',
    street: '140 Mason St',
    category: 'condo',
    image: image5Id,
    numOfRooms: 4,
    shared: true,
    description: 'Very nice condo in center of the city.',
    dailyPrice: 43,
    owner: user3Id
  }
];
