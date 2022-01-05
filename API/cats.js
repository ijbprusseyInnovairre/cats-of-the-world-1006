const express = require('express');

const jwt = require('jsonwebtoken');
const app = express();

const accessTokenSecret = 'RNVvkphtfEOyKlFnIAqsnw==';

app.use(express.json());

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

const cats = [{
        "id": 1,
        "Breed": "Abyssinian[5]",
        "Location of origin": "Unspecified, but somewhere in Afro-Asia likely Ethiopia[6]",
        "Type": "Natural",
        "Body type": "Semi-foreign",
        "Coat type and length": "Short",
        "Coat pattern": "Agouti"
    },
    {
        "id": 2,
        "Breed": "Aegean",
        "Location of origin": "Greece",
        "Type": "Natural",
        "Body type": "Moderate",
        "Coat type and length": "Semi-long",
        "Coat pattern": "Multi-color"
    },
    {
        "id": 3,
        "Breed": "American Bobtail[7]",
        "Location of origin": "United States[8]",
        "Type": "Mutation",
        "Body type": "Cobby",
        "Coat type and length": "Semi-long",
        "Coat pattern": "All"
    },
    {
        "id": 4,
        "Breed": "American Curl[9]",
        "Location of origin": "United States[8]",
        "Type": "Mutation",
        "Body type": "Semi-foreign",
        "Coat type and length": "Semi-long",
        "Coat pattern": "All"
    },
    {
        "id": 5,
        "Breed": "American Ringtail",
        "Location of origin": "United States[8]",
        "Type": "Mutation",
        "Body type": "Foreign",
        "Coat type and length": "Semi-long",
        "Coat pattern": "All"
    },
    {
        "id": 6,
        "Breed": "American Shorthair",
        "Location of origin": "United States[8]",
        "Type": "Natural",
        "Body type": "Cobby",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 7,
        "Breed": "American Wirehair",
        "Location of origin": "United States[8]",
        "Type": "Mutation",
        "Body type": "Normal",
        "Coat type and length": "Rex",
        "Coat pattern": "All"
    },
    {
        "id": 8,
        "Breed": "Aphrodite Giant",
        "Location of origin": "Cyprus",
        "Type": "Natural",
        "Body type": "Lean and muscular",
        "Coat type and length": "All",
        "Coat pattern": "All"
    },
    {
        "id": 9,
        "Breed": "Arabian Mau",
        "Location of origin": "the Arabian Peninsula",
        "Type": "Natural",
        "Body type": "Moderate and muscular",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 10,
        "Breed": "Asian",
        "Location of origin": "Developed in United Kingdom;\r\nfoundation stock from Asia",
        "Type": "Natural",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Evenly solid"
    },
    {
        "id": 11,
        "Breed": "Asian Semi-longhair",
        "Location of origin": "United Kingdom",
        "Type": "Crossbreed between the Burmese and long-haired cats",
        "Body type": "Cobby",
        "Coat type and length": "Semi-long",
        "Coat pattern": "Evenly solid"
    },
    {
        "id": 12,
        "Breed": "Australian Mist",
        "Location of origin": "Australia",
        "Type": "Crossbreed between the Abyssinian and Burmese",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Spotted or marbled"
    },
    {
        "id": 13,
        "Breed": "Balinese",
        "Location of origin": "Developed in United States;[8]\r\nfoundation stock from Thailand",
        "Type": "Mutation of the Siamese",
        "Body type": "Semi-foreign",
        "Coat type and length": "Long",
        "Coat pattern": "Colorpoint"
    },
    {
        "id": 14,
        "Breed": "Bambino",
        "Location of origin": "United States",
        "Type": "Crossbreed between the Munchkin and Sphynx",
        "Body type": "Dwarf",
        "Coat type and length": "Rex",
        "Coat pattern": ""
    },
    {
        "id": 15,
        "Breed": "Bengal",
        "Location of origin": "Developed in United States,\r\nbut created in Asia",
        "Type": "Hybrid of the Abyssinian and Egyptian Mau × leopard cat (Prionailurus bengalensis)",
        "Body type": "Large",
        "Coat type and length": "Short",
        "Coat pattern": "Spotted, marbled, or rosetted"
    },
    {
        "id": 16,
        "Breed": "Birman",
        "Location of origin": "Developed in France;\r\nfoundation stock from Burma (Myanmar)[8]",
        "Type": "The original Birman was crossed with the Siamese and the Persian to create the Birman of today.",
        "Body type": "Cobby",
        "Coat type and length": "Semi-long",
        "Coat pattern": "Mitted colorpoint"
    },
    {
        "id": 17,
        "Breed": "Bombay",
        "Location of origin": "United States and Burma (Myanmar)",
        "Type": "Crossbreed between the Black American Shorthair and Sable Burmese",
        "Body type": "Cobby",
        "Coat type and length": "Short",
        "Coat pattern": "Solid black"
    },
    {
        "id": 18,
        "Breed": "Brazilian Shorthair",
        "Location of origin": "Brazil",
        "Type": "Natural",
        "Body type": "Normal",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 19,
        "Breed": "British Longhair",
        "Location of origin": "United Kingdom (England)[8]",
        "Type": "Natural",
        "Body type": "Cobby",
        "Coat type and length": "Semi-long",
        "Coat pattern": "All"
    },
    {
        "id": 20,
        "Breed": "British Shorthair",
        "Location of origin": "United Kingdom (England)[8]",
        "Type": "Natural",
        "Body type": "Cobby",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 21,
        "Breed": "Burmese",
        "Location of origin": "Burma (Myanmar)[8]",
        "Type": "Natural",
        "Body type": "Semi-foreign or semi-cobby",
        "Coat type and length": "Short",
        "Coat pattern": "Solid or Tortoiseshell"
    },
    {
        "id": 22,
        "Breed": "Burmilla",
        "Location of origin": "United Kingdom (England)[8]",
        "Type": "Crossbreed between the Brown Tortie Burmese and the Chinchilla Persian",
        "Body type": "Semi-cobby",
        "Coat type and length": "Short",
        "Coat pattern": "Solid with Shaded Silver and Silver Tipped patterns"
    },
    {
        "id": 23,
        "Breed": "California Spangled",
        "Location of origin": "United States[8]",
        "Type": "Crossbreed between the Abyssinian, American Shorthair and British Shorthair",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Spotted tabby"
    },
    {
        "id": 24,
        "Breed": "Chantilly-Tiffany",
        "Location of origin": "United States",
        "Type": "Natural",
        "Body type": "Cobby",
        "Coat type and length": "Long",
        "Coat pattern": "Solid, classic tabby, spotted tabby and ticked tabby"
    },
    {
        "id": 25,
        "Breed": "Chartreux",
        "Location of origin": "France[8]",
        "Type": "Natural",
        "Body type": "Muscular Cobby",
        "Coat type and length": "Short",
        "Coat pattern": "Comes in varying shades of blue"
    },
    {
        "id": 26,
        "Breed": "Chausie",
        "Location of origin": "United States",
        "Type": "Hybrid of the Abyssinian × jungle cat (Felis chaus)",
        "Body type": "Normal",
        "Coat type and length": "Short",
        "Coat pattern": "Solid black, black grizzled tabby and black ticked tabby"
    },
    {
        "id": 27,
        "Breed": "Colorpoint Shorthair",
        "Location of origin": "England, United Kingdom",
        "Type": "Crossbreed between the Abyssinian, Siamese and short-haired cats",
        "Body type": "Foreign",
        "Coat type and length": "Short",
        "Coat pattern": "Colorpoint"
    },
    {
        "id": 28,
        "Breed": "Cornish Rex",
        "Location of origin": "Cornwall, England, United Kingdom",
        "Type": "Mutation",
        "Body type": "Foreign",
        "Coat type and length": "Rex",
        "Coat pattern": "All"
    },
    {
        "id": 29,
        "Breed": "Cymric, Manx Longhair or Long-haired Manx[a]",
        "Location of origin": "the Isle of Man, United States, and Canada [b][8]",
        "Type": "Mutation of the Manx",
        "Body type": "Semi-cobby",
        "Coat type and length": "Long",
        "Coat pattern": "All"
    },
    {
        "id": 30,
        "Breed": "Cyprus",
        "Location of origin": "Cyprus",
        "Type": "Natural",
        "Body type": "Lean and muscular",
        "Coat type and length": "All",
        "Coat pattern": "All"
    },
    {
        "id": 31,
        "Breed": "Devon Rex",
        "Location of origin": "Buckfastleigh, Devon, England, United Kingdom",
        "Type": "Mutation",
        "Body type": "Semi-foreign",
        "Coat type and length": "Rex",
        "Coat pattern": "All"
    },
    {
        "id": 32,
        "Breed": "Donskoy or\r\nDon Sphynx",
        "Location of origin": "Russia",
        "Type": "Mutation",
        "Body type": "Semi-foreign",
        "Coat type and length": "Hairless",
        "Coat pattern": "Solid"
    },
    {
        "id": 33,
        "Breed": "Dragon Li or\r\nChinese Li Hua",
        "Location of origin": "China",
        "Type": "Natural",
        "Body type": "Normal",
        "Coat type and length": "Short",
        "Coat pattern": "Ticked tabby"
    },
    {
        "id": 34,
        "Breed": "Dwelf",
        "Location of origin": "United States",
        "Type": "Crossbreed between the American Curl, Munchkin and Sphinx",
        "Body type": "Dwarf",
        "Coat type and length": "Hairless",
        "Coat pattern": "All"
    },
    {
        "id": 35,
        "Breed": "Egyptian Mau",
        "Location of origin": "Egypt[8]",
        "Type": "Natural",
        "Body type": "Moderate and muscular",
        "Coat type and length": "Short",
        "Coat pattern": "Spotted tabby"
    },
    {
        "id": 36,
        "Breed": "European Shorthair",
        "Location of origin": "Continental Europe[8]",
        "Type": "Natural",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 37,
        "Breed": "Exotic Shorthair",
        "Location of origin": "United States",
        "Type": "Crossbreed between the American Shorthair and Persian",
        "Body type": "Cobby",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 38,
        "Breed": "Foldex[10]",
        "Location of origin": "Canada",
        "Type": "Crossbreed between the Exotic Shorthair and Scottish Fold",
        "Body type": "Cobby",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 39,
        "Breed": "German Rex",
        "Location of origin": "Germany[8]",
        "Type": "Mutation",
        "Body type": "Semi-foreign",
        "Coat type and length": "Rex",
        "Coat pattern": "All"
    },
    {
        "id": 40,
        "Breed": "Havana Brown",
        "Location of origin": "United Kingdom (England);\r\nfoundation stock from Thailand",
        "Type": "Crossbreed between the Siamese and black short-haired cats",
        "Body type": "Semi-foreign",
        "Coat type and length": "Short",
        "Coat pattern": "Solid brown"
    },
    {
        "id": 41,
        "Breed": "Highlander",
        "Location of origin": "United States",
        "Type": "Crossbreed between the Desert Lynx and Jungle Curl",
        "Body type": "Moderate",
        "Coat type and length": "Short/long",
        "Coat pattern": "All"
    },
    {
        "id": 42,
        "Breed": "Himalayan or\r\nColorpoint Persian[c]",
        "Location of origin": "United States and United Kingdom[8]",
        "Type": "Crossbreed between the Persian and Siamese",
        "Body type": "Cobby",
        "Coat type and length": "Long",
        "Coat pattern": "Colorpoint"
    },
    {
        "id": 43,
        "Breed": "Japanese Bobtail",
        "Location of origin": "Japan[d][8]",
        "Type": "Mutation",
        "Body type": "Moderate",
        "Coat type and length": "Short/long",
        "Coat pattern": "All"
    },
    {
        "id": 44,
        "Breed": "Javanese or\r\nColorpoint Longhair[e]",
        "Location of origin": "Developed in United States[8] and Canada;\r\nfoundation stock from Southeast Asia",
        "Type": "Crossbreed between the Balinese with some Colorpoint Shorthair, Oriental Longhair and Siamese",
        "Body type": "Oriental",
        "Coat type and length": "Long",
        "Coat pattern": "Colorpoint"
    },
    {
        "id": 45,
        "Breed": "Kanaani",
        "Location of origin": "Germany",
        "Type": "Hybrid of short-haired cats × the African wildcat (Felis lybica)",
        "Body type": "Semi-foreign",
        "Coat type and length": "Short",
        "Coat pattern": "Solid black, chocolate spotted tabby or cinnamon spotted tabby"
    },
    {
        "id": 46,
        "Breed": "Khao Manee",
        "Location of origin": "Thailand",
        "Type": "Natural",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Solid white"
    },
    {
        "id": 47,
        "Breed": "Kinkalow",
        "Location of origin": "United States",
        "Type": "Crossbreed between the Munchkin and American Curl",
        "Body type": "Dwarf",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 48,
        "Breed": "Korat",
        "Location of origin": "Thailand[8]",
        "Type": "Natural",
        "Body type": "Muscular, Semi-foreign",
        "Coat type and length": "Semi-Cobby",
        "Coat pattern": "Solid blue"
    },
    {
        "id": 49,
        "Breed": "Korean Bobtail",
        "Location of origin": "Korea",
        "Type": "Natural, mutation",
        "Body type": "Moderate",
        "Coat type and length": "Short/long",
        "Coat pattern": "Colorpoint"
    },
    {
        "id": 50,
        "Breed": "Korn Ja",
        "Location of origin": "Thailand",
        "Type": "Natural",
        "Body type": "Small",
        "Coat type and length": "Short",
        "Coat pattern": "Solid black"
    },
    {
        "id": 51,
        "Breed": "Kurilian Bobtail or\r\nKuril Islands Bobtail",
        "Location of origin": "eastern Russia and Japan",
        "Type": "Natural, mutation",
        "Body type": "Semi-cobby",
        "Coat type and length": "Short/long",
        "Coat pattern": "All"
    },
    {
        "id": 52,
        "Breed": "Lambkin",
        "Location of origin": "United States[8]",
        "Type": "Crossbreed between the Munchkin and Selkirk Rex",
        "Body type": "Dwarf",
        "Coat type and length": "Rex",
        "Coat pattern": "All"
    },
    {
        "id": 53,
        "Breed": "LaPerm",
        "Location of origin": "United States[8]",
        "Type": "Mutation",
        "Body type": "Moderate",
        "Coat type and length": "Rex",
        "Coat pattern": "All"
    },
    {
        "id": 54,
        "Breed": "Lykoi",
        "Location of origin": "United States",
        "Type": "Mutation",
        "Body type": "Moderate",
        "Coat type and length": "Hairless",
        "Coat pattern": "Solid black roan"
    },
    {
        "id": 55,
        "Breed": "Maine Coon",
        "Location of origin": "United States[8]",
        "Type": "Natural, Crossbreed",
        "Body type": "Large",
        "Coat type and length": "Semi-long to long",
        "Coat pattern": "All"
    },
    {
        "id": 56,
        "Breed": "Manx",
        "Location of origin": "the Isle of Man[8]",
        "Type": "Mutation",
        "Body type": "Moderate",
        "Coat type and length": "Short/long",
        "Coat pattern": "All"
    },
    {
        "id": 57,
        "Breed": "Mekong Bobtail",
        "Location of origin": "Russia",
        "Type": "Mutation",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Colorpoint"
    },
    {
        "id": 58,
        "Breed": "Minskin",
        "Location of origin": "United States",
        "Type": "Crossbreed between the Munchkin and Sphynx",
        "Body type": "Dwarf",
        "Coat type and length": "Hairless",
        "Coat pattern": "All"
    },
    {
        "id": 59,
        "Breed": "Napoleon",
        "Location of origin": "United States",
        "Type": "Crossbreed between the Persian and Munchkin",
        "Body type": "Dwarf",
        "Coat type and length": "Short/long",
        "Coat pattern": "All"
    },
    {
        "id": 60,
        "Breed": "Munchkin",
        "Location of origin": "United States[8]",
        "Type": "Mutation",
        "Body type": "Dwarf",
        "Coat type and length": "Short/long",
        "Coat pattern": "All"
    },
    {
        "id": 61,
        "Breed": "Nebelung",
        "Location of origin": "United States",
        "Type": "Natural, Mutation",
        "Body type": "Foreign",
        "Coat type and length": "Semi-long",
        "Coat pattern": "Solid blue"
    },
    {
        "id": 62,
        "Breed": "Norwegian Forest Cat",
        "Location of origin": "Norway[8]",
        "Type": "Natural",
        "Body type": "Cobby",
        "Coat type and length": "Long",
        "Coat pattern": "All but colorpoint"
    },
    {
        "id": 63,
        "Breed": "Ocicat",
        "Location of origin": "United States[8]",
        "Type": "Crossbreed between the Abyssinian, American Shorthair and Siamese",
        "Body type": "Large",
        "Coat type and length": "Short",
        "Coat pattern": "Spotted tabby"
    },
    {
        "id": 64,
        "Breed": "Ojos Azules",
        "Location of origin": "United States[8]",
        "Type": "Crossbreed",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 65,
        "Breed": "Oregon Rex\r\n(extinct)",
        "Location of origin": "United States",
        "Type": "Mutation",
        "Body type": "",
        "Coat type and length": "Rex",
        "Coat pattern": ""
    },
    {
        "id": 66,
        "Breed": "Oriental Bicolor",
        "Location of origin": "Developed in United States and United Kingdom, later in Continental Europe;\r\nfoundation stock ultimately from Thailand",
        "Type": "Color variety of the Oriental Shorthair",
        "Body type": "Oriental",
        "Coat type and length": "Short",
        "Coat pattern": "Bicolor"
    },
    {
        "id": 67,
        "Breed": "Oriental Longhair[f]",
        "Location of origin": "Developed in United States and United Kingdom;\r\nfoundation stock ultimately from Thailand[8]",
        "Type": "Crossbreed between the Oriental Shorthair and Domestic Longhair",
        "Body type": "Oriental",
        "Coat type and length": "Semi-long",
        "Coat pattern": "All; if colorpoint is considered to be a separate breed, it is called the Javanese"
    },
    {
        "id": 68,
        "Breed": "Oriental Shorthair[f]",
        "Location of origin": "Developed in United States and United Kingdom;\r\nfoundation stock ultimately from Thailand[8]",
        "Type": "Crossbreed between the European Shorthair and Siamese",
        "Body type": "Oriental",
        "Coat type and length": "Short",
        "Coat pattern": "All"
    },
    {
        "id": 69,
        "Breed": "Persian (modern)",
        "Location of origin": "Developed in United States and Europe;\r\nfoundation stock from Greater Iran[8]",
        "Type": "Mutation of the traditional Persian",
        "Body type": "Cobby",
        "Coat type and length": "Long",
        "Coat pattern": "All but colorpoint"
    },
    {
        "id": 70,
        "Breed": "Persian (traditional)",
        "Location of origin": "Greater Iran[8]",
        "Type": "Natural, but some crossbreeding with the Turkish Angora",
        "Body type": "Cobby",
        "Coat type and length": "Long",
        "Coat pattern": "All but colorpoint"
    },
    {
        "id": 71,
        "Breed": "Peterbald",
        "Location of origin": "Russia",
        "Type": "Crossbreed between the Donskoy, Oriental Shorthair and Siamese;\r\nbefore this, it was between the Balinese and Javanese",
        "Body type": "Oriental",
        "Coat type and length": "Hairless, velour, brush, or straight coat",
        "Coat pattern": "All"
    },
    {
        "id": 72,
        "Breed": "Pixie-bob",
        "Location of origin": "United States[8]",
        "Type": "Mutation (falsely claimed to be a bobcat hybrid early on)",
        "Body type": "Medium",
        "Coat type and length": "Short",
        "Coat pattern": "Spotted tabby"
    },
    {
        "id": 73,
        "Breed": "Ragamuffin or\r\nLiebling (obsolete)",
        "Location of origin": "United States",
        "Type": "Crossbreed between the Ragdoll with limited out-crossing to the Himalayan, the Persian, and other long-haired cats",
        "Body type": "Cobby",
        "Coat type and length": "Long",
        "Coat pattern": "All"
    },
    {
        "id": 74,
        "Breed": "Ragdoll",
        "Location of origin": "United States[8]",
        "Type": "Behavioral mutation in a crossbreed, presumed to be between the Persian or Turkish Angora and the Birman or Burmese",
        "Body type": "Cobby",
        "Coat type and length": "Long",
        "Coat pattern": "Colorpoint, mitted, or bicolor"
    },
    {
        "id": 75,
        "Breed": "Raas",
        "Location of origin": "Raas Island, Indonesia",
        "Type": "Natural",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Solid blue, solid cinnamon, or cinnamon colorpoint"
    },
    {
        "id": 76,
        "Breed": "Russian Blue",
        "Location of origin": "Russia[8]",
        "Type": "Natural",
        "Body type": "Moderate, Oriental",
        "Coat type and length": "Short",
        "Coat pattern": "Solid blue"
    },
    {
        "id": 77,
        "Breed": "Russian White, Russian Black and Russian Tabby",
        "Location of origin": "Developed in Australia;\r\nfoundation stock from Russia",
        "Type": "Crossbreeds between the Russian Blue and short-haired cats from Siberia, Russia",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Solid white, solid black and tabby"
    },
    {
        "id": 78,
        "Breed": "Sam Sawet",
        "Location of origin": "Thailand",
        "Type": "Color variety of the Thai",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Solid"
    },
    {
        "id": 79,
        "Breed": "Savannah",
        "Location of origin": "United States",
        "Type": "Hybrid of the domestic cat × serval (Leptailurus serval)[11]",
        "Body type": "Large",
        "Coat type and length": "Short",
        "Coat pattern": "Spotted"
    },
    {
        "id": 80,
        "Breed": "Scottish Fold",
        "Location of origin": "United Kingdom (Scotland)[8]",
        "Type": "Mutation of the bones and cartilage of the ears",
        "Body type": "Cobby",
        "Coat type and length": "Short/long",
        "Coat pattern": "All"
    },
    {
        "id": 81,
        "Breed": "Selkirk Rex",
        "Location of origin": "United States in 1988[8]",
        "Type": "Mutation/crossbreed between the American Shorthair, Persian, Himalayan, Exotic Shorthair and British Shorthair",
        "Body type": "Large and cobby",
        "Coat type and length": "Short/long (longhair can sometimen in early generations appear to be semi-long)",
        "Coat pattern": "All"
    },
    {
        "id": 82,
        "Breed": "Serengeti",
        "Location of origin": "United States",
        "Type": "Crossbreed/hybrid between the Bengal and Oriental Shorthair",
        "Body type": "Oriental",
        "Coat type and length": "Short",
        "Coat pattern": "Spotted"
    },
    {
        "id": 83,
        "Breed": "Serrade Petit",
        "Location of origin": "France",
        "Type": "Natural",
        "Body type": "Semi-cobby",
        "Coat type and length": "Short",
        "Coat pattern": "Solid tan, solid orange and solid white"
    },
    {
        "id": 84,
        "Breed": "Siamese (modern)\r\n<yyyyy data-mw-deduplicate=\"TemplateStyles:r1033199720\">.mw-parser-output div.crossreference{padding-left:0}<yyyyy data-mw-deduplicate=\"TemplateStyles:r1033289096\">.mw-parser-output .hatnote{font-style:italic}.mw-parser-output div.hatnote{padding-left:1.6em;margin-bottom:0.5em}.mw-parser-output .hatnote i{font-style:normal}.mw-parser-output .hatnote+link+.hatnote{margin-top:-0.5em}(for traditional, see Thai below)",
        "Location of origin": "Developed in United States and Europe;\r\nfoundation stock from Thailand[8]",
        "Type": "Mutation of the Thai",
        "Body type": "Oriental",
        "Coat type and length": "Short",
        "Coat pattern": "Colorpoint"
    },
    {
        "id": 85,
        "Breed": "Siberian or\r\nSiberian Forest Cat;\r\nNeva Masquerade (colorpoint variety)",
        "Location of origin": "Russia, Ukraine[8]",
        "Type": "Natural",
        "Body type": "Semi-cobby",
        "Coat type and length": "Semi-long",
        "Coat pattern": "All"
    },
    {
        "id": 86,
        "Breed": "Singapura",
        "Location of origin": "Developed in United States;\r\nfoundation stock from Singapore[8]",
        "Type": "Possibly a mutation of a crossbreed (excluding the munchkin cat), solving why they’re so small",
        "Body type": "Small",
        "Coat type and length": "Short",
        "Coat pattern": "Ticked tabby"
    },
    {
        "id": 87,
        "Breed": "Snowshoe",
        "Location of origin": "United States[8]",
        "Type": "Crossbreed between the American Shorthair and Siamese",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Mitted colorpoint"
    },
    {
        "id": 88,
        "Breed": "Sokoke",
        "Location of origin": "Kenya",
        "Type": "Natural",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Ticked tabby"
    },
    {
        "id": 89,
        "Breed": "Somali",
        "Location of origin": "United States, Canada",
        "Type": "Mutation",
        "Body type": "Cobby",
        "Coat type and length": "Long",
        "Coat pattern": "Ticked tabby"
    },
    {
        "id": 90,
        "Breed": "Sphynx",
        "Location of origin": "Canada, Europe[8]",
        "Type": "Mutation",
        "Body type": "Oriental",
        "Coat type and length": "Hairless",
        "Coat pattern": "All"
    },
    {
        "id": 91,
        "Breed": "Suphalak",
        "Location of origin": "Thailand",
        "Type": "Natural",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Solid reddish-brown"
    },
    {
        "id": 92,
        "Breed": "Thai or\r\nTraditional, Classic, or Old-style Siamese;\r\nWichien Maat[g]",
        "Location of origin": "Thailand[8]",
        "Type": "Natural",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Colorpoint"
    },
    {
        "id": 93,
        "Breed": "Thai Lilac, Thai Blue Point and Thai Lilac Point",
        "Location of origin": "Thailand",
        "Type": "Color varieties of the Korat",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Solid lilac and colorpoint (blue point and lilac point only)"
    },
    {
        "id": 94,
        "Breed": "Tonkinese",
        "Location of origin": "Canada, United States[8]",
        "Type": "Crossbreed between the Burmese and Siamese",
        "Body type": "Oriental",
        "Coat type and length": "Short",
        "Coat pattern": "Colorpoint, mink, or solid"
    },
    {
        "id": 95,
        "Breed": "Toyger",
        "Location of origin": "United States",
        "Type": "Crossbreed/hybrid between the Bengal and short-haired cats",
        "Body type": "Moderate",
        "Coat type and length": "Short",
        "Coat pattern": "Mackerel tabby"
    },
    {
        "id": 96,
        "Breed": "Turkish Angora",
        "Location of origin": "Turkey[8]",
        "Type": "Natural",
        "Body type": "Semi-cobby",
        "Coat type and length": "Semi-long",
        "Coat pattern": "All"
    },
    {
        "id": 97,
        "Breed": "Turkish Van",
        "Location of origin": "Developed in United Kingdom (England);\r\nfoundation stock from Turkey",
        "Type": "Natural",
        "Body type": "Semi-cobby",
        "Coat type and length": "Semi-long",
        "Coat pattern": "Van pattern"
    },
    {
        "id": 98,
        "Breed": "Turkish Vankedisi",
        "Location of origin": "Turkey",
        "Type": "Natural",
        "Body type": "Svelte",
        "Coat type and length": "Long",
        "Coat pattern": "Solid white"
    },
    {
        "id": 99,
        "Breed": "Ukrainian Levkoy",
        "Location of origin": "Ukraine",
        "Type": "Crossbreed between the Donskoy and Scottish Fold",
        "Body type": "Moderate",
        "Coat type and length": "Hairless",
        "Coat pattern": "Solid gray"
    },
    {
        "id": 100,
        "Breed": "York Chocolate",
        "Location of origin": "New York, United States",
        "Type": "Natural",
        "Body type": "Moderate",
        "Coat type and length": "Long",
        "Coat pattern": "Solid chocolate, solid lilac and solid taupe or any of these colors with white"
    }
]

app.get('/cats', authenticateJWT, (req, res) => {
    res.json(cats);
});

app.post('/cats', authenticateJWT, (req, res) => {
    const {
        role
    } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    const cat = req.body;
    cats.push(cat);

    res.send('cat added successfully');
});


app.delete('/cats/:id', authenticateJWT, function (req, res) {
    const {
        role
    } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    // Determine item ID
	const id = parseInt(req.params.id, 10)
	if (Number.isNaN(id)) {
		throw new Error(`[400] Invalid row ID: ${id}`)
	}


    const catIndex = cats.findIndex(x => x.id === id);

    if(!catIndex) {
        return res.sendStatus(404);
    }
    
    cats.splice(catIndex, 1)

    res.send('cat removed successfully');
  })

app.listen(4000, () => {
    console.log('CatsOfTheWorld service started on port 4000');
});