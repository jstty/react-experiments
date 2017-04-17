module.exports = {
  port: 8000,
  stats: {
      // stats microservice config
      db: {
        client: 'sqlite3',
        connection: {
          database: 'stats_db',
          filename: ":memory:"
        },
        pool: { min: 1, max: 1 },
        useNullAsDefault: true
      }
  }
}