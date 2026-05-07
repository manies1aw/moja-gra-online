const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// =========================================================================
// TUTAJ WKLEJ SWOJĄ PEŁNĄ BAZĘ DANYCH (TYLKO ZMIENNĄ casesData) !!!
// =========================================================================
const casesData = [
    { id: 'ak47', name: 'Skrzynia AK-47', price: 35.00, items: [
                { name: "AK-47 | Predator", tier: "blue" }, { name: "AK-47 | Jungle Spray", tier: "blue" }, { name: "AK-47 | Safari Mesh", tier: "blue" }, { name: "AK-47 | Baroque Purple", tier: "blue" }, { name: "AK-47 | Black Laminate", tier: "blue" }, { name: "AK-47 | Elite Build", tier: "blue" }, { name: "AK-47 | Uncharted", tier: "blue" }, { name: "AK-47 | Emerald Pinstripe", tier: "blue" }, { name: "AK-47 | Steel Delta", tier: "blue" },
                { name: "AK-47 | First Class", tier: "purple" }, { name: "AK-47 | Blue Laminate", tier: "purple" }, { name: "AK-47 | Orbit Mk01", tier: "purple" }, { name: "AK-47 | Safety Net", tier: "purple" }, { name: "AK-47 | Rat Rod", tier: "purple" }, { name: "AK-47 | Slate", tier: "purple" },
                { name: "AK-47 | Jet Set", tier: "pink" }, { name: "AK-47 | Hydroponic", tier: "pink" }, { name: "AK-47 | Case Hardened", tier: "pink" }, { name: "AK-47 | Red Laminate", tier: "pink" }, { name: "AK-47 | Redline", tier: "pink" }, { name: "AK-47 | Cartel", tier: "pink" }, { name: "AK-47 | Frontside Misty", tier: "pink" }, { name: "AK-47 | Point Disarray", tier: "pink" }, { name: "AK-47 | Phantom Disruptor", tier: "pink" }, { name: "AK-47 | Panthera onca", tier: "pink" }, { name: "AK-47 | Ice Coaled", tier: "pink" },
                { name: "AK-47 | Fire Serpent", tier: "red" }, { name: "AK-47 | Vulcan", tier: "red" }, { name: "AK-47 | Jaguar", tier: "red" }, { name: "AK-47 | Wasteland Rebel", tier: "red" }, { name: "AK-47 | Aquamarine Revenge", tier: "red" }, { name: "AK-47 | Fuel Injector", tier: "red" }, { name: "AK-47 | Neon Revolution", tier: "red" }, { name: "AK-47 | Bloodsport", tier: "red" }, { name: "AK-47 | The Empress", tier: "red" }, { name: "AK-47 | Neon Rider", tier: "red" }, { name: "AK-47 | Asiimov", tier: "red" }, { name: "AK-47 | Wild Lotus", tier: "red" }, { name: "AK-47 | Legion of Anubis", tier: "red" }, { name: "AK-47 | X-Ray", tier: "red" }, { name: "AK-47 | Gold Arabesque", tier: "red" }, { name: "AK-47 | Leet Museo", tier: "red" }, { name: "AK-47 | Nightwish", tier: "red" }, { name: "AK-47 | Head Shot", tier: "red" }, { name: "AK-47 | Inheritance", tier: "red" }
            ] },
            { id: 'm4a1s', name: 'Skrzynia M4A1-S', price: 35.00, items: [
                { name: "M4A1-S | Fizzy POP", tier: "blue" }, { name: "M4A1-S | Briefing", tier: "blue" }, { name: "M4A1-S | VariCamo", tier: "blue" }, { name: "M4A1-S | Mud-Spec", tier: "blue" }, { name: "M4A1-S | Moss Quartz", tier: "blue" }, { name: "M4A1-S | Boreal Forest", tier: "blue" },
                { name: "M4A1-S | Guardian", tier: "purple" }, { name: "M4A1-S | Emphorosaur-S", tier: "purple" }, { name: "M4A1-S | Night Terror", tier: "purple" }, { name: "M4A1-S | Flashback", tier: "purple" }, { name: "M4A1-S | Basilisk", tier: "purple" }, { name: "M4A1-S | Bright Water", tier: "purple" }, { name: "M4A1-S | Dark Water", tier: "purple" }, { name: "M4A1-S | Nitro", tier: "purple" }, { name: "M4A1-S | Blood Tiger", tier: "purple" },
                { name: "M4A1-S | Black Lotus", tier: "pink" }, { name: "M4A1-S | Blue Phosphor", tier: "pink" }, { name: "M4A1-S | Control Panel", tier: "pink" }, { name: "M4A1-S | Nightmare", tier: "pink" }, { name: "M4A1-S | Leaded Glass", tier: "pink" }, { name: "M4A1-S | Decimator", tier: "pink" }, { name: "M4A1-S | Atomic Alloy", tier: "pink" }, { name: "M4A1-S | Hot Rod", tier: "pink" }, { name: "M4A1-S | Knight", tier: "pink" }, { name: "M4A1-S | Icarus Fell", tier: "pink" },
                { name: "M4A1-S | Imminent Danger", tier: "red" }, { name: "M4A1-S | Welcome to the Jungle", tier: "red" }, { name: "M4A1-S | Printstream", tier: "red" }, { name: "M4A1-S | Player Two", tier: "red" }, { name: "M4A1-S | Mecha Industries", tier: "red" }, { name: "M4A1-S | Chantico's Fire", tier: "red" }, { name: "M4A1-S | Golden Coil", tier: "red" }, { name: "M4A1-S | Hyper Beast", tier: "red" }, { name: "M4A1-S | Cyrex", tier: "red" }, { name: "M4A1-S | Master Piece", tier: "red" }
            ] },
            { id: 'm4a4', name: 'Skrzynia M4A4', price: 35.00, items: [
                { name: "M4A4 | Desert Storm", tier: "blue" }, { name: "M4A4 | Jungle Tiger", tier: "blue" }, { name: "M4A4 | Tornado", tier: "blue" }, { name: "M4A4 | Urban DDPAT", tier: "blue" }, { name: "M4A4 | Mainframe", tier: "blue" }, { name: "M4A4 | Dark Blossom", tier: "blue" }, { name: "M4A4 | Faded Zebra", tier: "blue" }, { name: "M4A4 | Converter", tier: "blue" }, { name: "M4A4 | Magnesium", tier: "blue" }, { name: "M4A4 | Global Offensive", tier: "blue" }, { name: "M4A4 | Poly Mag", tier: "blue" },
                { name: "M4A4 | Radiation Hazard", tier: "purple" }, { name: "M4A4 | Modern Hunter", tier: "purple" }, { name: "M4A4 | Daybreak", tier: "purple" }, { name: "M4A4 | Zirka", tier: "purple" }, { name: "M4A4 | Evil Daimyo", tier: "purple" }, { name: "M4A4 | Griffin", tier: "purple" }, { name: "M4A4 | Red DDPAT", tier: "purple" }, { name: "M4A4 | Spider Lily", tier: "purple" }, { name: "M4A4 | Etch Lord", tier: "purple" },
                { name: "M4A4 | Poseidon", tier: "pink" }, { name: "M4A4 | Desolate Space", tier: "pink" }, { name: "M4A4 | 龍王 (Dragon King)", tier: "pink" }, { name: "M4A4 | Hellfire", tier: "pink" }, { name: "M4A4 | Tooth Fairy", tier: "pink" }, { name: "M4A4 | Cyber Security", tier: "pink" }, { name: "M4A4 | X-Ray", tier: "pink" }, { name: "M4A4 | Desert-Strike", tier: "pink" }, { name: "M4A4 | The Battlestar", tier: "pink" },
                { name: "M4A4 | Asiimov", tier: "red" }, { name: "M4A4 | Royal Paladin", tier: "red" }, { name: "M4A4 | Buzz Kill", tier: "red" }, { name: "M4A4 | Neo-Noir", tier: "red" }, { name: "M4A4 | The Emperor", tier: "red" }, { name: "M4A4 | In Living Color", tier: "red" }, { name: "M4A4 | The Coalition", tier: "red" }, { name: "M4A4 | Temukau", tier: "red" }, { name: "M4A4 | Eye of Horus", tier: "red" }, { name: "M4A4 | Howl", tier: "red" }
            ] },
            { id: 'awp', name: 'Skrzynia AWP', price: 45.00, items: [
                { name: "AWP | Safari Mesh", tier: "blue" }, { name: "AWP | Sun in Leo", tier: "blue" }, { name: "AWP | Snake Camo", tier: "blue" }, { name: "AWP | Acheron", tier: "blue" }, { name: "AWP | Capillary", tier: "blue" }, { name: "AWP | Black Nile", tier: "blue" }, { name: "AWP | Pit Viper", tier: "blue" },
                { name: "AWP | Pink DDPAT", tier: "purple" }, { name: "AWP | Worm God", tier: "purple" }, { name: "AWP | Phobos", tier: "purple" }, { name: "AWP | PAW", tier: "purple" }, { name: "AWP | Atheris", tier: "purple" }, { name: "AWP | Exoskeleton", tier: "purple" }, { name: "AWP | POP AWP", tier: "purple" },
                { name: "AWP | BOOM", tier: "pink" }, { name: "AWP | Graphite", tier: "pink" }, { name: "AWP | Electric Hive", tier: "pink" }, { name: "AWP | Redline", tier: "pink" }, { name: "AWP | Corticera", tier: "pink" }, { name: "AWP | Elite Build", tier: "pink" }, { name: "AWP | Fever Dream", tier: "pink" }, { name: "AWP | Mortis", tier: "pink" }, { name: "AWP | Duality", tier: "pink" }, { name: "AWP | Chromatic Aberration", tier: "pink" },
                { name: "AWP | Lightning Strike", tier: "red" }, { name: "AWP | Asiimov", tier: "red" }, { name: "AWP | Man-o'-war", tier: "red" }, { name: "AWP | Hyper Beast", tier: "red" }, { name: "AWP | Oni Taiji", tier: "red" }, { name: "AWP | Neo-Noir", tier: "red" }, { name: "AWP | Wildfire", tier: "red" }, { name: "AWP | Chrome Cannon", tier: "red" }, { name: "AWP | Fade", tier: "red" },
                { name: "AWP | Desert Hydra", tier: "gold" }, { name: "AWP | The Prince", tier: "gold" }, { name: "AWP | Gungnir", tier: "gold" }, { name: "AWP | Medusa", tier: "gold" }, { name: "AWP | Dragon Lore", tier: "gold" }
            ] },
            { id: 'karambit', name: 'Skrzynia Karambit', price: 100.00, items: [
                { name: "★ Karambit | Urban Masked", tier: "gold" }, { name: "★ Karambit | Stained", tier: "gold" }, { name: "★ Karambit | Slaughter", tier: "gold" }, { name: "★ Karambit | Scorched", tier: "gold" }, { name: "★ Karambit | Safari Mesh", tier: "gold" }, { name: "★ Karambit | Night", tier: "gold" }, { name: "★ Karambit | Forest DDPAT", tier: "gold" }, { name: "★ Karambit | Fade", tier: "gold" }, { name: "★ Karambit | Crimson Web", tier: "gold" }, { name: "★ Karambit | Case Hardened", tier: "gold" }, { name: "★ Karambit | Boreal Forest", tier: "gold" }, { name: "★ Karambit | Blue Steel", tier: "gold" }, { name: "★ Karambit | Ultraviolet", tier: "gold" }, { name: "★ Karambit | Rust Coat", tier: "gold" }, { name: "★ Karambit | Tiger Tooth", tier: "gold" }, { name: "★ Karambit | Marble Fade", tier: "gold" }, { name: "★ Karambit | Doppler", tier: "gold" }, { name: "★ Karambit | Damascus Steel", tier: "gold" }, { name: "★ Karambit | Freehand", tier: "gold" }, { name: "★ Karambit | Bright Water", tier: "gold" }, { name: "★ Karambit | Autotronic", tier: "gold" }, { name: "★ Karambit | Gamma Doppler", tier: "gold" }, { name: "★ Karambit | Black Laminate", tier: "gold" }, { name: "★ Karambit | Lore", tier: "gold" }
            ] },
            { id: 'mixed_knives', name: 'Skrzynia Kos', price: 150.00, items: [
                { name: "★ Flip Knife | Urban Masked", tier: "gold" }, { name: "★ Flip Knife | Stained", tier: "gold" }, { name: "★ Flip Knife | Slaughter", tier: "gold" }, { name: "★ Flip Knife | Scorched", tier: "gold" }, { name: "★ Flip Knife | Safari Mesh", tier: "gold" }, { name: "★ Flip Knife | Night", tier: "gold" }, { name: "★ Flip Knife | Fade", tier: "gold" }, { name: "★ Flip Knife | Crimson Web", tier: "gold" }, { name: "★ Flip Knife | Case Hardened", tier: "gold" }, { name: "★ Flip Knife | Boreal Forest", tier: "gold" }, { name: "★ Flip Knife | Blue Steel", tier: "gold" }, { name: "★ Flip Knife | Rust Coat", tier: "gold" }, { name: "★ Flip Knife | Tiger Tooth", tier: "gold" }, { name: "★ Flip Knife | Marble Fade", tier: "gold" }, { name: "★ Flip Knife | Doppler", tier: "gold" }, { name: "★ Flip Knife | Damascus Steel", tier: "gold" }, { name: "★ Flip Knife | Lore", tier: "gold" },
                { name: "★ Bowie Knife | Slaughter", tier: "gold" }, { name: "★ Bowie Knife | Scorched", tier: "gold" }, { name: "★ Bowie Knife | Safari Mesh", tier: "gold" }, { name: "★ Bowie Knife | Night", tier: "gold" }, { name: "★ Bowie Knife | Case Hardened", tier: "gold" }, { name: "★ Bowie Knife | Doppler", tier: "gold" }, { name: "★ Bowie Knife | Marble Fade", tier: "gold" },
                { name: "★ Skeleton Knife | Safari Mesh", tier: "gold" }, { name: "★ Skeleton Knife | Urban Masked", tier: "gold" }, { name: "★ Skeleton Knife | Night Stripe", tier: "gold" }, { name: "★ Skeleton Knife | Case Hardened", tier: "gold" }, { name: "★ Skeleton Knife | Crimson Web", tier: "gold" }, { name: "★ Skeleton Knife | Slaughter", tier: "gold" }, { name: "★ Skeleton Knife | Fade", tier: "gold" },
                { name: "★ M9 Bayonet | Safari Mesh", tier: "gold" }, { name: "★ M9 Bayonet | Night", tier: "gold" }, { name: "★ M9 Bayonet | Fade", tier: "gold" }, { name: "★ M9 Bayonet | Crimson Web", tier: "gold" }, { name: "★ M9 Bayonet | Case Hardened", tier: "gold" }, { name: "★ M9 Bayonet | Lore", tier: "gold" }, { name: "★ M9 Bayonet | Tiger Tooth", tier: "gold" }, { name: "★ M9 Bayonet | Doppler", tier: "gold" }
            ] },
            { id: 'deagle', name: 'Skrzynia Deagle', price: 30.00, items: [
                { name: "Desert Eagle | Bronze Deco", tier: "blue" }, { name: "Desert Eagle | Meteorite", tier: "blue" }, { name: "Desert Eagle | Urban Rubble", tier: "blue" }, { name: "Desert Eagle | Mudder", tier: "blue" }, { name: "Desert Eagle | Urban DDPAT", tier: "blue" }, { name: "Desert Eagle | Night", tier: "blue" }, { name: "Desert Eagle | Corinthian", tier: "blue" }, { name: "Desert Eagle | Oxide Blaze", tier: "blue" }, { name: "Desert Eagle | Blue Ply", tier: "blue" }, { name: "Desert Eagle | Sputnik", tier: "blue" }, { name: "Desert Eagle | Trigger Discipline", tier: "blue" }, { name: "Desert Eagle | Brass", tier: "blue" },
                { name: "Desert Eagle | Conspiracy", tier: "purple" }, { name: "Desert Eagle | Directive", tier: "purple" }, { name: "Desert Eagle | Naga", tier: "purple" }, { name: "Desert Eagle | Heirloom", tier: "purple" }, { name: "Desert Eagle | Pilot", tier: "purple" }, { name: "Desert Eagle | Night Heist", tier: "purple" }, { name: "Desert Eagle | Light Rail", tier: "purple" }, { name: "Desert Eagle | Crimson Web", tier: "purple" },
                { name: "Desert Eagle | Ocean Drive", tier: "pink" }, { name: "Desert Eagle | Code Red", tier: "pink" }, { name: "Desert Eagle | Mecha Industries", tier: "pink" }, { name: "Desert Eagle | Kumicho Dragon", tier: "pink" }, { name: "Desert Eagle | Cobalt Disruption", tier: "pink" }, { name: "Desert Eagle | Hypnotic", tier: "pink" },
                { name: "Desert Eagle | Printstream", tier: "red" }, { name: "Desert Eagle | Golden Koi", tier: "red" }, { name: "Desert Eagle | Fennec Fox", tier: "red" }, { name: "Desert Eagle | Sunset Storm 壱", tier: "red" }, { name: "Desert Eagle | Hand Cannon", tier: "red" }, { name: "Desert Eagle | Blaze", tier: "red" }, { name: "Desert Eagle | Emerald Jörmungandr", tier: "red" }, { name: "Desert Eagle | Midnight Storm", tier: "red" }
            ] },
            { id: 'aug', name: 'Skrzynia AUG', price: 25.00, items: [
                { name: "AUG | Sand Storm", tier: "blue" }, { name: "AUG | Torque", tier: "blue" }, { name: "AUG | Plague", tier: "blue" }, { name: "AUG | Amber Fade", tier: "blue" }, { name: "AUG | Carved Jade", tier: "blue" }, { name: "AUG | Tom Cat", tier: "blue" }, { name: "AUG | Amber Slipstream", tier: "blue" }, { name: "AUG | Triqua", tier: "blue" }, { name: "AUG | Ricochet", tier: "blue" }, { name: "AUG | Wings", tier: "blue" }, { name: "AUG | Anodized Navy", tier: "blue" }, { name: "AUG | Copperhead", tier: "blue" }, { name: "AUG | Withered Wood", tier: "blue" }, { name: "AUG | Radiation Hazard", tier: "blue" }, { name: "AUG | Condemned", tier: "blue" }, { name: "AUG | Snake Pit", tier: "blue" }, { name: "AUG | Surveillance", tier: "blue" }, { name: "AUG | Navy Murano", tier: "blue" }, { name: "AUG | Sweeper", tier: "blue" }, { name: "AUG | Daedalus", tier: "blue" }, { name: "AUG | Contractor", tier: "blue" }, { name: "AUG | Storm", tier: "blue" }, { name: "AUG | Colony", tier: "blue" },
                { name: "AUG | Bengal Tiger", tier: "purple" }, { name: "AUG | Arctic Wolf", tier: "purple" }, { name: "AUG | Midnight Lily", tier: "purple" }, { name: "AUG | Flame Jörmungandr", tier: "purple" }, { name: "AUG | Random Access", tier: "purple" }, { name: "AUG | Aristocrat", tier: "purple" }, { name: "AUG | Hot Rod", tier: "purple" },
                { name: "AUG | Death by Puppy", tier: "pink" }, { name: "AUG | Momentum", tier: "pink" }, { name: "AUG | Stymphalian", tier: "pink" }, { name: "AUG | Syd Mead", tier: "pink" }, { name: "AUG | Fleet Flock", tier: "pink" },
                { name: "AUG | Chameleon", tier: "red" }, { name: "AUG | Akihabara Accept", tier: "red" }
            ] },
            { id: 'galil', name: 'Skrzynia Galil AR', price: 20.00, items: [
                { name: "Galil AR | Tuxedo", tier: "blue" }, { name: "Galil AR | Aqua Terrace", tier: "blue" }, { name: "Galil AR | Shattered", tier: "blue" }, { name: "Galil AR | Blue Titanium", tier: "blue" }, { name: "Galil AR | Sandstorm", tier: "blue" }, { name: "Galil AR | Kami", tier: "blue" }, { name: "Galil AR | Rocket Pop", tier: "blue" }, { name: "Galil AR | Black Sand", tier: "blue" }, { name: "Galil AR | Akoben", tier: "blue" }, { name: "Galil AR | Vandal", tier: "blue" },
                { name: "Galil AR | Dusk Ruins", tier: "purple" }, { name: "Galil AR | Amber Fade", tier: "purple" }, { name: "Galil AR | Destroyer", tier: "purple" }, { name: "Galil AR | Cerberus", tier: "purple" }, { name: "Galil AR | Orange DDPAT", tier: "purple" }, { name: "Galil AR | Stone Cold", tier: "purple" }, { name: "Galil AR | Firefight", tier: "purple" }, { name: "Galil AR | Crimson Tsunami", tier: "purple" }, { name: "Galil AR | Signal", tier: "purple" }, { name: "Galil AR | Connexion", tier: "purple" },
                { name: "Galil AR | Phoenix Blacklight", tier: "pink" }, { name: "Galil AR | CAUTION!", tier: "pink" }, { name: "Galil AR | Eco", tier: "pink" }, { name: "Galil AR | Sugar Rush", tier: "pink" }, { name: "Galil AR | Chromatic Aberration", tier: "pink" },
                { name: "Galil AR | Chatterbox", tier: "red" }
            ] },
            { id: 'fiveseven', name: 'Skrzynia Five-SeveN', price: 20.00, items: [
                { name: "Five-SeveN | Coolant", tier: "blue" }, { name: "Five-SeveN | Candy Apple", tier: "blue" }, { name: "Five-SeveN | Orange Peel", tier: "blue" }, { name: "Five-SeveN | Hot Shot", tier: "blue" }, { name: "Five-SeveN | Withered Vine", tier: "blue" }, { name: "Five-SeveN | Nitro", tier: "blue" }, { name: "Five-SeveN | Nightshade", tier: "blue" }, { name: "Five-SeveN | Kami", tier: "blue" }, { name: "Five-SeveN | Urban Hazard", tier: "blue" },
                { name: "Five-SeveN | Violent Daimyo", tier: "purple" }, { name: "Five-SeveN | Scumbria", tier: "purple" }, { name: "Five-SeveN | Capillary", tier: "purple" }, { name: "Five-SeveN | Flame Test", tier: "purple" }, { name: "Five-SeveN | Crimson Blossom", tier: "purple" }, { name: "Five-SeveN | Scrawl", tier: "purple" }, { name: "Five-SeveN | Neon Kimono", tier: "purple" }, { name: "Five-SeveN | Case Hardened", tier: "purple" }, { name: "Five-SeveN | Copper Galaxy", tier: "purple" }, { name: "Five-SeveN | Retribution", tier: "purple" },
                { name: "Five-SeveN | Triumvirate", tier: "pink" }, { name: "Five-SeveN | Buddy", tier: "pink" }, { name: "Five-SeveN | Fowl Play", tier: "pink" }, { name: "Five-SeveN | Boost Protocol", tier: "pink" }, { name: "Five-SeveN | Hybrid", tier: "pink" }, { name: "Five-SeveN | Monkey Business", tier: "pink" }, { name: "Five-SeveN | Fall Hazard", tier: "pink" },
                { name: "Five-SeveN | Fairy Tale", tier: "red" }, { name: "Five-SeveN | Hyper Beast", tier: "red" }, { name: "Five-SeveN | Angry Mob", tier: "red" }, { name: "Five-SeveN | Rooster", tier: "red" }
            ] },
            { id: 'famas', name: 'Skrzynia FAMAS', price: 25.00, items: [
                { name: "FAMAS | Contrast Spray", tier: "blue" }, { name: "FAMAS | Colony", tier: "blue" }, { name: "FAMAS | Night Borre", tier: "blue" }, { name: "FAMAS | Faulty Wiring", tier: "blue" }, { name: "FAMAS | Cyanospatter", tier: "blue" }, { name: "FAMAS | CaliCamo", tier: "blue" }, { name: "FAMAS | Teardown", tier: "blue" }, { name: "FAMAS | Doomkitty", tier: "blue" }, { name: "FAMAS | Hexane", tier: "blue" }, { name: "FAMAS | Survivor Z", tier: "blue" },
                { name: "FAMAS | Macabre", tier: "purple" }, { name: "FAMAS | Crypsis", tier: "purple" }, { name: "FAMAS | Decommissioned", tier: "purple" }, { name: "FAMAS | Sundown", tier: "purple" }, { name: "FAMAS | Dark Water", tier: "purple" }, { name: "FAMAS | Meow 36", tier: "purple" }, { name: "FAMAS | Spitfire", tier: "purple" }, { name: "FAMAS | Styx", tier: "purple" }, { name: "FAMAS | Pulse", tier: "purple" }, { name: "FAMAS | Sergeant", tier: "purple" }, { name: "FAMAS | Neural Net", tier: "purple" },
                { name: "FAMAS | Valence", tier: "pink" }, { name: "FAMAS | Prime Conspiracy", tier: "pink" }, { name: "FAMAS | ZX Spectron", tier: "pink" }, { name: "FAMAS | Afterimage", tier: "pink" }, { name: "FAMAS | Djinn", tier: "pink" },
                { name: "FAMAS | Mecha Industries", tier: "red" }, { name: "FAMAS | Eye of Athena", tier: "red" }, { name: "FAMAS | Meltdown", tier: "red" }, { name: "FAMAS | Rapid Eye Movement", tier: "red" }, { name: "FAMAS | Waters of Nephthys", tier: "red" }, { name: "FAMAS | Roll Cage", tier: "red" }, { name: "FAMAS | Commemoration", tier: "red" }
            ] },
            { id: 'dualberettas', name: 'Skrzynia Dual Berettas', price: 20.00, items: [
                { name: "Dual Berettas | Moon in Libra", tier: "blue" }, { name: "Dual Berettas | Anodized Navy", tier: "blue" }, { name: "Dual Berettas | Black Limba", tier: "blue" }, { name: "Dual Berettas | Panther", tier: "blue" }, { name: "Dual Berettas | Retribution", tier: "blue" }, { name: "Dual Berettas | Dualing Dragons", tier: "blue" }, { name: "Dual Berettas | Cartel", tier: "blue" }, { name: "Dual Berettas | Ventilators", tier: "blue" }, { name: "Dual Berettas | Shred", tier: "blue" }, { name: "Dual Berettas | Elite 1.6", tier: "blue" },
                { name: "Dual Berettas | Emerald", tier: "purple" }, { name: "Dual Berettas | Balance", tier: "purple" }, { name: "Dual Berettas | Drift Wood", tier: "purple" }, { name: "Dual Berettas | Hideout", tier: "purple" }, { name: "Dual Berettas | Demolition", tier: "purple" }, { name: "Dual Berettas | Cobalt Quartz", tier: "purple" }, { name: "Dual Berettas | Duelist", tier: "purple" }, { name: "Dual Berettas | Hemoglobin", tier: "purple" },
                { name: "Dual Berettas | Marina", tier: "pink" }, { name: "Dual Berettas | Urban Shock", tier: "pink" }, { name: "Dual Berettas | Royal Consorts", tier: "pink" }, { name: "Dual Berettas | Dezastre", tier: "pink" }, { name: "Dual Berettas | Flora Carnivora", tier: "pink" }, { name: "Dual Berettas | Cobra Strike", tier: "pink" },
                { name: "Dual Berettas | Twin Turbo", tier: "red" }, { name: "Dual Berettas | Melondrama", tier: "red" }
            ] },
            { id: 'cz75', name: 'Skrzynia CZ75-Auto', price: 20.00, items: [
                { name: "CZ75-Auto | Silver", tier: "blue" }, { name: "CZ75-Auto | Hexane", tier: "blue" }, { name: "CZ75-Auto | Twist", tier: "blue" }, { name: "CZ75-Auto | Poison Dart", tier: "blue" }, { name: "CZ75-Auto | Crimson Web", tier: "blue" }, { name: "CZ75-Auto | Emerald", tier: "blue" }, { name: "CZ75-Auto | Nitro", tier: "blue" }, { name: "CZ75-Auto | Tuxedo", tier: "blue" },
                { name: "CZ75-Auto | Polymer", tier: "purple" }, { name: "CZ75-Auto | Imprint", tier: "purple" }, { name: "CZ75-Auto | Distressed", tier: "purple" }, { name: "CZ75-Auto | Emerald Quartz", tier: "purple" }, { name: "CZ75-Auto | Vendetta", tier: "purple" }, { name: "CZ75-Auto | Circaetus", tier: "purple" }, { name: "CZ75-Auto | Chalice", tier: "purple" }, { name: "CZ75-Auto | Tread Plate", tier: "purple" }, { name: "CZ75-Auto | Tigris", tier: "purple" }, { name: "CZ75-Auto | Pole Position", tier: "purple" },
                { name: "CZ75-Auto | Red Astor", tier: "pink" }, { name: "CZ75-Auto | Tacticat", tier: "pink" }, { name: "CZ75-Auto | Eco", tier: "pink" }, { name: "CZ75-Auto | Syndicate", tier: "pink" }, { name: "CZ75-Auto | The Fuschia Is Now", tier: "pink" },
                { name: "CZ75-Auto | Yellow Jacket", tier: "red" }, { name: "CZ75-Auto | Xiangliu", tier: "red" }, { name: "CZ75-Auto | Victoria", tier: "red" }
            ] },
            { id: 'glock', name: 'Skrzynia Glock-18', price: 20.00, items: [
                { name: "Glock-18 | Candy Apple", tier: "blue" }, { name: "Glock-18 | Blue Fissure", tier: "blue" }, { name: "Glock-18 | Catacombs", tier: "blue" }, { name: "Glock-18 | Bunsen Burner", tier: "blue" }, { name: "Glock-18 | Wraiths", tier: "blue" }, { name: "Glock-18 | Ironwork", tier: "blue" }, { name: "Glock-18 | Off World", tier: "blue" }, { name: "Glock-18 | Warhawk", tier: "blue" }, { name: "Glock-18 | Oxide Blaze", tier: "blue" }, { name: "Glock-18 | Sacrifice", tier: "blue" }, { name: "Glock-18 | Clear Polymer", tier: "blue" }, { name: "Glock-18 | Winterized", tier: "blue" }, { name: "Glock-18 | Glockingbird", tier: "blue" },
                { name: "Glock-18 | Reactor", tier: "purple" }, { name: "Glock-18 | Teal Graf", tier: "purple" }, { name: "Glock-18 | Green Line", tier: "purple" }, { name: "Glock-18 | Coral Bloom", tier: "purple" }, { name: "Glock-18 | Brass", tier: "purple" }, { name: "Glock-18 | Nuclear Garden", tier: "purple" }, { name: "Glock-18 | Synth Leaf", tier: "purple" }, { name: "Glock-18 | Steel Disruption", tier: "purple" }, { name: "Glock-18 | Grinder", tier: "purple" }, { name: "Glock-18 | Royal Legion", tier: "purple" }, { name: "Glock-18 | Weasel", tier: "purple" }, { name: "Glock-18 | Moonrise", tier: "purple" }, { name: "Glock-18 | Umbral Rabbit", tier: "purple" }, { name: "Glock-18 | Block 18", tier: "purple" }, { name: "Glock-18 | Trace Lock", tier: "purple" },
                { name: "Glock-18 | Fade", tier: "pink" }, { name: "Glock-18 | Franklin", tier: "pink" }, { name: "Glock-18 | Pink DDPAT", tier: "pink" }, { name: "Glock-18 | Dragon Tattoo", tier: "pink" }, { name: "Glock-18 | Twilight Galaxy", tier: "pink" }, { name: "Glock-18 | AXIA", tier: "pink" }, { name: "Glock-18 | Water Elemental", tier: "pink" }, { name: "Glock-18 | Vogue", tier: "pink" }, { name: "Glock-18 | Snack Attack", tier: "pink" }, { name: "Glock-18 | Shinobu", tier: "pink" }, { name: "Glock-18 | Mirror Mosaic", tier: "pink" },
                { name: "Glock-18 | Ramese's Reach", tier: "red" }, { name: "Glock-18 | Gamma Doppler", tier: "red" }, { name: "Glock-18 | Wasteland Rebel", tier: "red" }, { name: "Glock-18 | Bullet Queen", tier: "red" }, { name: "Glock-18 | Neo-Noir", tier: "red" }, { name: "Glock-18 | Gold Toof", tier: "red" }, { name: "Glock-18 | Fully Tuned", tier: "red" }
            ] },
            { id: 'usps', name: 'Skrzynia USP-S', price: 25.00, items: [
                { name: "USP-S | Torque", tier: "blue" }, { name: "USP-S | Check Engine", tier: "blue" }, { name: "USP-S | Ticket to Hell", tier: "blue" }, { name: "USP-S | Night Ops", tier: "blue" }, { name: "USP-S | Flashback", tier: "blue" }, { name: "USP-S | Blood Tiger", tier: "blue" }, { name: "USP-S | Lead Conduit", tier: "blue" }, { name: "USP-S | Business Class", tier: "blue" }, { name: "USP-S | Royal Guard", tier: "blue" }, { name: "USP-S | Bleeding Edge", tier: "blue" },
                { name: "USP-S | Alpine Camo", tier: "purple" }, { name: "USP-S | Guardian", tier: "purple" }, { name: "USP-S | Cyrex", tier: "purple" }, { name: "USP-S | Black Lotus", tier: "purple" }, { name: "USP-S | Stainless", tier: "purple" }, { name: "USP-S | Overgrowth", tier: "purple" }, { name: "USP-S | Royal Blue", tier: "purple" }, { name: "USP-S | Blueprint", tier: "purple" }, { name: "USP-S | Dark Water", tier: "purple" },
                { name: "USP-S | Cortex", tier: "pink" }, { name: "USP-S | Monster Mashup", tier: "pink" }, { name: "USP-S | Caiman", tier: "pink" }, { name: "USP-S | Ancient Visions", tier: "pink" }, { name: "USP-S | Serum", tier: "pink" }, { name: "USP-S | Purple DDPAT", tier: "pink" }, { name: "USP-S | Orion", tier: "pink" }, { name: "USP-S | Orange Anolis", tier: "pink" }, { name: "USP-S | Road Rash", tier: "pink" }, { name: "USP-S | Whiteout", tier: "pink" },
                { name: "USP-S | Neo-Noir", tier: "red" }, { name: "USP-S | Printstream", tier: "red" }, { name: "USP-S | The Traitor", tier: "red" }, { name: "USP-S | Kill Confirmed", tier: "red" }, { name: "USP-S | Target Acquired", tier: "red" }
            ] },
            { id: 'fakee', name: 'Skrzynia FAKEE', price: 40.00, items: [
                { name: "AK-47 | Safari Mesh", tier: "blue" }, { name: "M4A1-S | Boreal Forest", tier: "blue" }, { name: "M4A4 | Desert Storm", tier: "blue" }, { name: "AWP | Pit Viper", tier: "blue" }, { name: "Desert Eagle | Bronze Deco", tier: "blue" }, { name: "AUG | Sweeper", tier: "blue" }, { name: "Galil AR | Black Sand", tier: "blue" },
                { name: "AK-47 | Slate", tier: "purple" }, { name: "M4A1-S | Night Terror", tier: "purple" }, { name: "AWP | Phobos", tier: "purple" }, { name: "Desert Eagle | Conspiracy", tier: "purple" }, { name: "Five-SeveN | Retribution", tier: "purple" },
                { name: "AK-47 | Redline", tier: "pink" }, { name: "M4A1-S | Decimator", tier: "pink" }, { name: "AWP | Fever Dream", tier: "pink" },
                { name: "AK-47 | Vulcan", tier: "red" }, { name: "M4A4 | Asiimov", tier: "red" },
                { name: "★ Karambit | Doppler", tier: "gold" }
            ] },
            { id: 'toxic', name: 'Skrzynia TOXIC', price: 45.00, items: [
                { name: "AK-47 | Uncharted", tier: "blue" }, { name: "M4A1-S | Mud-Spec", tier: "blue" }, { name: "M4A4 | Magnesium", tier: "blue" }, { name: "AWP | Acheron", tier: "blue" }, { name: "Desert Eagle | Night", tier: "blue" }, { name: "FAMAS | Survivor Z", tier: "blue" }, { name: "CZ75-Auto | Poison Dart", tier: "blue" },
                { name: "AK-47 | Safety Net", tier: "purple" }, { name: "M4A4 | Radiation Hazard", tier: "purple" }, { name: "AWP | Atheris", tier: "purple" }, { name: "AUG | Random Access", tier: "purple" }, { name: "Galil AR | Cerberus", tier: "purple" },
                { name: "M4A4 | Desolate Space", tier: "pink" }, { name: "AWP | Mortis", tier: "pink" }, { name: "Desert Eagle | Ocean Drive", tier: "pink" },
                { name: "M4A1-S | Hyper Beast", tier: "red" }, { name: "AWP | Wildfire", tier: "red" },
                { name: "★ Skeleton Knife | Fade", tier: "gold" }
            ] },
            { id: 'venom', name: 'Skrzynia VENOM', price: 50.00, items: [
                { name: "AK-47 | Elite Build", tier: "blue" }, { name: "M4A1-S | Fizzy POP", tier: "blue" }, { name: "M4A4 | Converter", tier: "blue" }, { name: "AWP | Black Nile", tier: "blue" }, { name: "Desert Eagle | Meteorite", tier: "blue" }, { name: "Five-SeveN | Coolant", tier: "blue" }, { name: "Dual Berettas | Shred", tier: "blue" },
                { name: "AK-47 | Rat Rod", tier: "purple" }, { name: "M4A1-S | Basilisk", tier: "purple" }, { name: "M4A4 | Evil Daimyo", tier: "purple" }, { name: "AWP | Exoskeleton", tier: "purple" }, { name: "CZ75-Auto | Vendetta", tier: "purple" },
                { name: "AK-47 | Phantom Disruptor", tier: "pink" }, { name: "M4A1-S | Nightmare", tier: "pink" }, { name: "FAMAS | Afterimage", tier: "pink" },
                { name: "Desert Eagle | Printstream", tier: "red" }, { name: "AK-47 | Bloodsport", tier: "red" },
                { name: "★ M9 Bayonet | Marble Fade", tier: "gold" },
            ] },
            { id: 'maniek', name: 'Skrzynia Maniek', price: 30.00, items: [
                { id: 'maniek', name: 'Skrzynia MANIEK', price: 100.00, items: [
                { name: "Galil AR | Rocket Pop", tier: "blue" },
                { name: "Glock-18 | High Beam", tier: "blue" },
                { name: "M4A4 | Poly Mag", tier: "blue" },
                { name: "MAC-10 | Ensnare", tier: "blue" },
                { name: "P90 | Grim", tier: "blue" },
                { name: "P250 | Cassette", tier: "blue" },
                { name: "SSG 08 | Abyss", tier: "blue" },
                { name: "AK-47 | Slate", tier: "purple" },
                { name: "Desert Eagle | Light Rail", tier: "purple" },
                { name: "M4A1-S | Night Terror", tier: "purple" },
                { name: "UMP-45 | Crimson Foil", tier: "purple" },
                { name: "XM1014 | Entombed", tier: "purple" },
                { name: "AK-47 | Ice Coaled", tier: "pink" },
                { name: "AWP | Chromatic Aberration", tier: "pink" },
                { name: "AWP | Mortis", tier: "pink" },
                { name: "P90 | Nostalgia", tier: "pink" },
                { name: "MP7 | Bloodsport", tier: "red" },
                { name: "★ Butterfly Knife | Doppler Phase 4", tier: "gold" }
            ] },
            ];
// =========================================================================

const tierChances = { "blue": 79.92, "purple": 15.98, "pink": 3.20, "red": 0.64, "gold": 0.26 };

function getRealisticPrice(tier, wearMultiplier, isStatTrak) {
    let base = tier === 'blue' ? 5 : tier === 'purple' ? 25 : tier === 'pink' ? 120 : tier === 'red' ? 600 : 2500;
    let finalPrice = base * wearMultiplier * (1 + (Math.random() * 0.4 - 0.2));
    if (isStatTrak) finalPrice *= 2.5;
    return finalPrice.toFixed(2);
}

function rollItemServer(caseId) {
    const caseObj = casesData.find(c => c.id === caseId);
    if (!caseObj) return { name: "BŁĄD", tier: "blue", wear: "Factory New", wearMultiplier: 1, isStatTrak: false, savedPrice: "0.00" };
    
    const validItems = caseObj.items.filter(i => i && i.tier);
    const availableTiers = [...new Set(validItems.map(i => i.tier))];
    
    let totalChance = 0; availableTiers.forEach(tier => totalChance += (tierChances[tier] || 1));
    let rand = Math.random() * totalChance; let selectedTier = availableTiers[0];
    
    for (let tier of availableTiers) {
        let chance = tierChances[tier] || 1;
        if (rand < chance) { selectedTier = tier; break; } rand -= chance;
    }
    
    const itemsOfTier = validItems.filter(i => i.tier === selectedTier);
    const baseItem = itemsOfTier[Math.floor(Math.random() * itemsOfTier.length)];
    
    const wears = [{ name: "Factory New", chance: 10, multiplier: 2.5 }, { name: "Minimal Wear", chance: 20, multiplier: 1.5 }, { name: "Field-Tested", chance: 40, multiplier: 1.0 }, { name: "Well-Worn", chance: 20, multiplier: 0.8 }, { name: "Battle-Scarred", chance: 10, multiplier: 0.5 }];
    let wearRand = Math.random() * 100, selectedWear = wears[0];
    for (let w of wears) { if (wearRand < w.chance) { selectedWear = w; break; } wearRand -= w.chance; }
    
    let item = { ...baseItem, wear: selectedWear.name, wearMultiplier: selectedWear.multiplier, isStatTrak: Math.random() < 0.10 };
    item.savedPrice = getRealisticPrice(item.tier, item.wearMultiplier, item.isStatTrak);
    return item;
}

let activeBattle = null;

io.on('connection', (socket) => {
    console.log('Nowy gracz:', socket.id);
    if (activeBattle) socket.emit('battleAvailable', activeBattle.queue.length);

    socket.on('createBattle', (queue) => {
        if (activeBattle) { socket.emit('battleError', 'Ktoś już założył bitwę!'); return; }
        activeBattle = { player1: socket.id, player2: null, queue: queue };
        socket.broadcast.emit('battleAvailable', queue.length); 
    });

    socket.on('joinBattle', () => {
        if (activeBattle && activeBattle.player1 !== socket.id && !activeBattle.player2) {
            activeBattle.player2 = socket.id;
            let player1Drops = []; let player2Drops = [];
            activeBattle.queue.forEach(caseObj => {
                player1Drops.push(rollItemServer(caseObj.id));
                player2Drops.push(rollItemServer(caseObj.id));
            });
            io.to(activeBattle.player1).emit('startBattleClient', { myDrops: player1Drops, opponentDrops: player2Drops, queue: activeBattle.queue, opponentName: "Gracz 2" });
            io.to(activeBattle.player2).emit('startBattleClient', { myDrops: player2Drops, opponentDrops: player1Drops, queue: activeBattle.queue, opponentName: "Gracz 1" });
            io.emit('hideBattleJoin'); activeBattle = null; 
        }
    });

    socket.on('disconnect', () => {
        if (activeBattle && activeBattle.player1 === socket.id) { activeBattle = null; io.emit('hideBattleJoin'); }
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => { console.log(`Serwer działa na porcie: ${PORT}`); });