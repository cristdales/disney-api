const bcrypt = require('bcrypt');
const Character = require('../src/models/Character');
const Genre = require('../src/models/Genre');
const Movie = require('../src/models/Movie');
const User = require('../src/models/User');
const sequelize = require('../src/sequelize');

beforeEach(async function () {
  await sequelize.sync({ force: true });

  const [email, password, saltRounds] = [
    'dummyuser@somedomain.com',
    'somepassword',
    10,
  ];
  const hashedPwd = await bcrypt.hash(password, saltRounds);
  User.create({ email, hashedPwd });

  const [fan, fam, act, sfi, adv, mus, rom] = await Genre.bulkCreate([
    { name: 'Fantasy' },
    { name: 'Family' },
    { name: 'Action' },
    { name: 'Science Fiction' },
    { name: 'Adventure' },
    { name: 'Musical' },
    { name: 'Romance' },
  ]);

  const [nr, t, jf, l, v, a, z] = await Character.bulkCreate([
    {
      name: 'Natasha Romanoff',
      age: 32,
      weight: 59,
    },
    {
      name: 'Thor',
      age: 1500,
      weight: 291,
    },
    {
      name: 'Jane Foster',
      age: 33,
      weight: 61,
    },
    {
      name: 'Loki',
      age: 1500,
      weight: 238,
    },
    {
      name: 'Venom',
      age: 18,
      weight: 118,
    },
    {
      name: 'Addison',
    },
    {
      name: 'Zed',
    },
  ]);

  const [bwi, ven, tho, zom] = await Movie.bulkCreate([
    {
      title: 'Black Widow',
      releaseDate: '29/05/2021',
      score: 4,
    },
    {
      title: 'Venom',
      releaseDate: '05/10/2018',
      score: 3,
    },
    {
      title: 'Thor',
      releaseDate: '28/04/2011',
      score: 4,
    },
    {
      title: 'Z-O-M-B-I-E-S 3',
      releaseDate: '15/06/2022',
      score: 3,
    },
  ]);

  await bwi.addGenres([act.id, adv.id, sfi.id]);
  await bwi.addCharacters([nr.id]);
  await bwi.save();

  await ven.addGenres([act.id, adv.id, sfi.id]);
  await ven.addCharacters([v.id]);
  await ven.save();

  await tho.addGenres([act.id, adv.id, fan.id]);
  await tho.addCharacters([t.id, l.id, jf.id]);
  await tho.save();

  await zom.addGenres([fam.id, mus.id, rom.id]);
  await zom.addCharacters([a.id, z.id]);
  await zom.save();
});
