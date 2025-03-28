# Dungeon Mapper Web

A 2D web-based dungeon exploration game where players navigate through interconnected rooms, collect items, and solve puzzles. Built with Next.js and deployed on Vercel.

## Features

- Room-based navigation with North, South, East, West, Up, and Down movement
- Dynamic map loading from JSON configuration
- Item collection and inventory system
- Persistent game state using localStorage
- Responsive design for both desktop and mobile

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dungeon-mapper-web.git
cd dungeon-mapper-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the game.

## Game Structure

### Room Configuration

Rooms are defined in the `map.json` file with the following structure:

```json
{
  "rooms": {
    "room1": {
      "name": "Ancient Hallway",
      "image": "/rooms/room1.png",
      "exits": {
        "north": "room2",
        "east": "room3"
      },
      "objects": ["key", "torch"]
    }
  },
  "starting_room": "room1"
}
```

### Adding Rooms

1. Create a PNG image for your room and place it in the `/public/rooms/` directory
2. Add the room configuration to the `map.json` file
3. Connect it to existing rooms by updating the exits

### Adding Objects

Objects are defined in the `map.json` file and can be placed in rooms:

```json
"objects": {
  "key": {
    "name": "Rusty Key",
    "description": "An old rusty key that might unlock something",
    "image": "/objects/key.png"
  }
}
```

## Deployment

The game can be easily deployed to Vercel:

```bash
npm run build
# or
yarn build
```

Follow the Vercel deployment instructions to deploy your built application.

## Customizing the Game

### Room Images

- Room images should be PNG files placed in the `/public/rooms/` directory
- Recommended resolution: 800x600 pixels

### Object Images

- Object images should be PNG files placed in the `/public/objects/` directory
- Recommended resolution: 64x64 pixels

### Game Logic

- Modify win conditions in `stateManager.js`
- Add special room behavior in `Room.js`
- Customize game UI in the CSS files

## License

This project is licensed under the MIT License - see the LICENSE file for details.
