function Stats($logger, $q, $resource) {
    $resource.add('db',  require('./stats.datastore.js'));
}

module.exports = Stats;