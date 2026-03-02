import { PLACE_CATEGORIES } from '../utils/constants';
import { randomCoordOffset, randomRating } from '../utils/helpers';

/**
 * Simulated places database.
 * In production, replace with Google Places API, Foursquare, or OpenStreetMap Overpass API.
 */

const PLACE_TEMPLATES = {
  restaurant: [
    { name: 'Trattoria del Corso', cuisine: 'Italiana tradizionale' },
    { name: 'Osteria Bella Vista', cuisine: 'Cucina locale' },
    { name: 'Pizzeria Napoli', cuisine: 'Pizza napoletana' },
    { name: 'Ristorante Il Giardino', cuisine: 'Cucina mediterranea' },
    { name: 'Sushi Zen', cuisine: 'Giapponese' },
    { name: 'La Pergola', cuisine: 'Cucina raffinata' },
    { name: 'Burger House', cuisine: 'Hamburger gourmet' },
    { name: 'Taverna del Porto', cuisine: 'Pesce fresco' },
  ],
  cafe: [
    { name: 'Caffè Centrale', specialty: 'Espresso artigianale' },
    { name: 'Bar Roma', specialty: 'Cornetti freschi' },
    { name: 'The Coffee Lab', specialty: 'Specialty coffee' },
    { name: 'Dolce Vita Café', specialty: 'Pasticceria' },
    { name: 'Brew & Bean', specialty: 'Cold brew' },
  ],
  bar: [
    { name: 'Cocktail Bar 1920', specialty: 'Cocktail d\'autore' },
    { name: 'The Pub', specialty: 'Birre artigianali' },
    { name: 'Wine Bar Enoteca', specialty: 'Vini locali' },
    { name: 'Lounge Bar Sky', specialty: 'Aperitivi con vista' },
    { name: 'Irish Pub Dublin', specialty: 'Birre irlandesi' },
  ],
  museum: [
    { name: 'Museo d\'Arte Moderna', specialty: 'Arte contemporanea' },
    { name: 'Museo di Storia Naturale', specialty: 'Esposizioni naturalistiche' },
    { name: 'Galleria d\'Arte', specialty: 'Pittura e scultura' },
    { name: 'Museo della Scienza', specialty: 'Esposizioni interattive' },
    { name: 'Museo Archeologico', specialty: 'Reperti storici' },
  ],
  park: [
    { name: 'Parco Centrale', specialty: 'Area verde urbana' },
    { name: 'Giardini Botanici', specialty: 'Piante esotiche' },
    { name: 'Villa Comunale', specialty: 'Giardino storico' },
    { name: 'Parco Avventura', specialty: 'Percorsi acrobatici' },
    { name: 'Lungolago / Lungomare', specialty: 'Passeggiata panoramica' },
  ],
  shopping: [
    { name: 'Centro Commerciale Le Terrazze', specialty: 'Shopping center' },
    { name: 'Via dello Shopping', specialty: 'Negozi di moda' },
    { name: 'Mercato Coperto', specialty: 'Prodotti locali' },
    { name: 'Outlet Village', specialty: 'Brand a prezzi ridotti' },
    { name: 'Bottega Artigiana', specialty: 'Artigianato locale' },
  ],
  entertainment: [
    { name: 'Cinema Multisala', specialty: 'Film in prima visione' },
    { name: 'Teatro Comunale', specialty: 'Spettacoli dal vivo' },
    { name: 'Bowling Center', specialty: 'Bowling e giochi' },
    { name: 'Escape Room Mystery', specialty: 'Giochi di fuga' },
    { name: 'Sala Giochi Arcade', specialty: 'Retrogaming' },
  ],
  landmark: [
    { name: 'Piazza Principale', specialty: 'Centro storico' },
    { name: 'Cattedrale / Duomo', specialty: 'Architettura religiosa' },
    { name: 'Torre Panoramica', specialty: 'Vista sulla città' },
    { name: 'Ponte Storico', specialty: 'Monumento storico' },
    { name: 'Fontana Monumentale', specialty: 'Opera d\'arte pubblica' },
  ],
  nightlife: [
    { name: 'Club Neon', specialty: 'Musica elettronica' },
    { name: 'Jazz Club Blue Note', specialty: 'Musica dal vivo' },
    { name: 'Discoteca Paradise', specialty: 'DJ set' },
    { name: 'Karaoke Night', specialty: 'Karaoke' },
    { name: 'Latin Club Havana', specialty: 'Salsa e bachata' },
  ],
  sport: [
    { name: 'Palestra FitLife', specialty: 'Fitness e crossfit' },
    { name: 'Piscina Comunale', specialty: 'Nuoto libero' },
    { name: 'Campo Sportivo', specialty: 'Calcetto e basket' },
    { name: 'Pista Ciclabile', specialty: 'Ciclismo urbano' },
    { name: 'Centro Arrampicata', specialty: 'Bouldering' },
  ],
};

/**
 * Generate simulated places near a given location.
 * In production, this would call an external API.
 */
export function generateNearbyPlaces(latitude, longitude, radiusKm, categories = null) {
  const selectedCategories = categories || Object.keys(PLACE_TEMPLATES);
  const places = [];

  for (const category of selectedCategories) {
    const templates = PLACE_TEMPLATES[category] || [];
    const categoryInfo = PLACE_CATEGORIES[category];
    if (!categoryInfo) continue;

    for (const template of templates) {
      const coords = randomCoordOffset(latitude, longitude, radiusKm);
      places.push({
        id: `${category}_${Math.random().toString(36).slice(2, 9)}`,
        name: template.name,
        category,
        categoryLabel: categoryInfo.label,
        emoji: categoryInfo.emoji,
        description: template.cuisine || template.specialty,
        rating: randomRating(3.2, 5.0),
        avgDuration: categoryInfo.avgDuration,
        latitude: coords.latitude,
        longitude: coords.longitude,
        address: `Via ${template.name.split(' ').pop()}, ${Math.floor(Math.random() * 100) + 1}`,
      });
    }
  }

  return places;
}

/**
 * Filter places suitable for a given time slot.
 */
export function getPlacesForTimeSlot(places, timeSlotId) {
  const timeFilters = {
    morning: ['cafe', 'museum', 'park', 'landmark', 'sport', 'shopping'],
    afternoon: ['restaurant', 'cafe', 'museum', 'park', 'shopping', 'entertainment', 'landmark', 'sport'],
    evening: ['restaurant', 'bar', 'entertainment', 'nightlife', 'landmark'],
    full_day: Object.keys(PLACE_CATEGORIES),
  };

  const allowedCategories = timeFilters[timeSlotId] || Object.keys(PLACE_CATEGORIES);
  return places.filter(p => allowedCategories.includes(p.category));
}
