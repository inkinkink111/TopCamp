const mongoose = require("mongoose");
const citiesTh = require("./citiesTh");
const { places, descriptors, imageUrls } = require("./seedHelpers");
const Campground = require("../models/camp");
const axios = require("axios");

const DB_URL = process.env.DB_URL;

// connect mongoose to database
mongoose
  .connect(DB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Mongoose Connection Error:", err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// call unsplash and return small image
async function seedImg() {
  try {
    const resp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "Hr-tJF0DaVq6QSxftMZQloOVDcQy_LDKT6Jc2Lrhprc",
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}

const seedDB = async () => {
  await Campground.deleteMany({});
  // const c = new Campground({ title: 'purple field' });
  // await c.save();
  for (let i = 0; i < 100; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    //random image
    const randImage = [];
    for (let j = 0; j < 3; j++) {
      randImage.push({
        url: sample(imageUrls),
        filename: "TopCamp" + `${Math.floor(Math.random() * 10000)}`,
      });
    }
    const camp = new Campground({
      //USER ID
      author: "640f8c709af926500b44ebc6",
      location: `${citiesTh[rand1000].admin_name},${citiesTh[rand1000].city}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(citiesTh[rand1000].lng),
          parseFloat(citiesTh[rand1000].lat),
        ],
      },
      images: [...randImage],
      // image: await seedImg(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores non suscipit in provident dolores molestiae sapiente, facere, iure officiis soluta eligendi ea? Voluptatem molestias fugiat doloremque rem ratione eligendi amet?",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
