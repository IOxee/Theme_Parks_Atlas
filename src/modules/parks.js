// src/modules/parks.js
export const PARK_IDS = {
    // "8e6bf2ae-77ac-403d-8e10-d7cd9b6c05d7": "1", // Alton Towers Resort
    // "818f544a-38db-4255-b5db-6bf2cb39b7b3": "2", // Thorpe Park
    // "c4307928-fc3c-47df-b976-305026751727": "3", // Chessington World of Adventures Resort
    // "e957da41-3552-4cf6-b636-5babc5cbc4e5": "5", // Walt Disney World® Resort
    // "8fba5a14-8d04-455c-acf8-eccaaa0f58d9": "10", // Silver Dollar City
    // "b1387675-bb84-4eb4-aae6-af96d586c3d6": "11", // Liseberg
    // "be901819-52b2-4a98-8f31-5fecb993bcd6": "12", // Gardaland
    // "8d8a8cc7-4523-4437-8bb6-5c87a26ba5ce": "14", // Walibi Belgium
    // "6e1c96c1-dafc-4c26-a3d3-1b28c888daa8": "15", // Hersheypark
    "498b1747-cc17-4490-aee9-a45147f0f706": "19", // PortAventura World (España)
    // "1f1f9558-4e81-48a7-aad5-9879b633802b": "20", // SeaWorld San Diego
    // "643e837e-b244-4663-8d3a-148c26ecba9c": "21", // SeaWorld Parks and Resorts Orlando
    // "211e981b-ee64-4ff9-8b06-0abf26e63874": "22", // SeaWorld San Antonio
    // "0704cf65-5c67-42f3-a054-f45e03a412cf": "23", // Busch Gardens Williamsburg
    // "1d92560c-474f-4425-906d-e9dd2f2da6ca": "24", // Busch Gardens Tampa
    // "0976f1b8-5782-4cda-887f-dc1d537d8d6e": "25", // Heide Park Resort
    // "7c48a21b-221c-42f8-8339-6334c5f2fb12": "27", // LEGOLAND Windsor
    // "17e01e63-d22f-414f-b65b-1786acbd918c": "32", // Six Flags Magic Mountain
    // "32fd247c-f2dd-44d6-aa2b-10c158df162f": "33", // Six Flags Discovery Kingdom
    // "5dd95124-888c-449d-9a65-46d7ecc8878c": "34", // Six Flags Over Texas
    // "a8ea944a-5ab7-42ed-bb02-ed08e64f125a": "35", // Six Flags Over Georgia
    // "314e42e5-95e7-448f-a127-01699a4fba04": "36", // Six Flags St. Louis
    // "8d8e39eb-4b0a-48b9-ac67-444dd6e97519": "37", // Six Flags Great Adventure
    // "96fc6528-d143-4c6c-a2ac-01e3c1192d21": "38", // Six Flags Great America
    // "da6388a0-cbfe-49f9-9c63-12e1f63dda62": "39", // Six Flags Fiesta Texas
    // "b3c6033a-4dc2-476c-98d2-ce31c6b961a7": "42", // Six Flags America
    // "a2cfe9e9-6734-4b9e-90c2-6427fa303e5c": "43", // Six Flags New England
    // "6d6099c4-170d-4beb-85c2-73b26249eead": "48", // La Ronde, Montreal
    // "bda7d2f4-6622-4f8f-80c6-a46986d73469": "49", // Paultons Park
    // "ee2ec4b5-3bc3-403c-9e30-7fa607e6311e": "50", // Cedar Point
    // "97501356-1021-4bb7-9a90-2f3fc96b435d": "52", // LEGOLAND Billund
    // "9c6a0987-e519-4d6e-b011-e6c47a60641b": "53", // Walibi Holland
    // "c0eddd5b-da82-4161-9a5f-2eb4ab5f82e7": "54", // Plopsaland De Panne
    // "6c3cd0cc-57b5-431b-926c-2658e8104057": "55", // Dollywood
    // "0257ff9f-c73c-4855-b5b4-774755c4d146": "56", // Phantasialand
    // "119fce4a-9662-484f-ac3a-d62d16bdc7ab": "57", // California's Great America
    // "b23d90e6-47f4-4258-8690-e74d777fca0f": "58", // Canada's Wonderland
    // "025c75ed-80a8-4bba-8b80-192e2ceff58c": "59", // Carowinds
    // "694e1f6e-d6a2-4c86-9749-5da1a9cb8924": "60", // Kings Island
    // "b1444147-b93a-4f73-b12d-28f9b1f7ec7c": "61", // Knott's Berry Farm
    // "71f82221-5f3e-4e2c-b09c-31c149e0dd59": "62", // Kings Dominion
    // "c4231018-dc6f-4d8d-bfc2-7a21a6c9e9fa": "63", // Worlds of Fun
    // "d4c0e0c4-18c6-4918-a505-209d839c2615": "68", // Valleyfair
    // "d5f3aa8d-2ef9-4436-9829-b1f6774f592b": "69", // Dorney Park
    // "6a33b034-2e39-46ea-8808-a06b29b9b2d6": "70", // Michigan's Adventure
    // "259cf011-6195-42dd-bfdb-640969e0bfb9": "130", // Guangzhou Chimelong Tourist Resort
    // "21776b5a-1444-4924-8ab2-6c66d9219628": "160", // Efteling Themepark Resort
    // "faff60df-c766-4470-8adb-dee78e813f42": "275", // Tokyo Disney Resort
    // "85c5cdc5-95c3-4190-9a05-9707b634889d": "276", // Bellewaerde
    "4809bc90-1580-4738-9a77-a713fed396a8": "278", // LEGOLAND Deutschland (Alemania)
    // "be4e3681-7e3c-43a5-89e6-bb4863d8fe35": "279", // LEGOLAND California
    // "7a4adf8d-8c3f-4300-b277-19707e4f8e12": "280", // LEGOLAND Florida
    // "dfa64b30-f5af-444c-a7f8-3db78537a0f8": "281", // Six Flags Darien Lake
    "46ad6ab4-90db-4c39-b9a4-be833266c210": "291", // Futuroscope (Francia)
    "df686841-3a46-4ac7-a1c7-8f3cac840a2b": "298", // Parque Warner Madrid (España)
    // "f9497403-adf3-4409-bd79-bb5b54000e45": "301", // Walibi Rhône-Alpes
    // "22489737-c1f7-4ac9-b79b-b664e5efd866": "302", // Holiday Park
    "85e3b542-af91-4f8a-8d28-445868a7c8fd": "309", // Europa-Park (Alemania, cerca de Francia/Suiza)
    // "7b1d2346-363e-4a36-be23-5637fc6d508a": "310", // Movie Park Germany
    // "7e95a960-dd7f-41a4-938c-4abe417c24f2": "311", // Bobbejaanland
    // "1dea1b67-0d06-4ad2-9145-8fc1783fd4e8": "312", // Kennywood
    // "40ebecca-2221-4230-9814-6a00b3fbb558": "328", // Universal Beijing Resort
    // "d5487510-2e13-4eb5-9fab-9a9c11cec738": "329", // Everland Resort
    // "38ca7997-883b-4ae8-a87c-69a74967d59e": "332", // Chimelong International Ocean Tourist Resort
    // "126bee75-8235-4007-8fe8-48aa52e33188": "333", // Lotte World
};

const PARK_UUIDS = new Set(Object.keys(PARK_IDS));
const ID_TO_UUID = Object.fromEntries(
    Object.entries(PARK_IDS).map(([uuid, id]) => [id, uuid])
);

export async function getParkId(key) {
    if (typeof key !== 'string') return null;
    if (PARK_IDS[key]) return PARK_IDS[key];
    if (ID_TO_UUID[key]) return key;
    return null;
}
