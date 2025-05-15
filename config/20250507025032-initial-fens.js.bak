'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Puzzles', [
      {
        title: "The Corner Trap",
        fen: "7k/5K2/5P2/8/8/8/8/8 w - - 0 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Storm Breaker",
        fen: "r1b1kb1r/pppp1ppp/2n2n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 2 5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Royal Cage",
        fen: "rnb1kbnr/ppp2ppp/8/3pp3/3P4/3B1N2/PPP2PPP/RNBQK2R w KQkq - 0 5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Edge of the World",
        fen: "6k1/5ppp/8/8/8/8/PPP5/4R1K1 w - - 0 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Silent Strike",
        fen: "r3kb1r/ppp2ppp/2n2n2/3pp3/3P4/2P2NP1/PP2PPBP/RNB1K2R w KQkq - 2 6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Final Embrace",
        fen: "r1bqk2r/ppp2ppp/2n2n2/3pp3/3P1B2/2N2N2/PPP2PPP/R2QK2R w KQkq - 4 6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Net Tightening",
        fen: "6k1/5ppp/8/8/8/8/5PPP/5RK1 w - - 0 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Frozen King",
        fen: "7k/5ppp/8/8/8/8/PPP2PPP/6K1 w - - 0 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Web of Death",
        fen: "r2qkb1r/ppp2ppp/2n2n2/3pp3/2P5/2N2NP1/PP2PPBP/R1BQ1RK1 w kq - 4 7",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Puzzles', null, {});
  }
};
