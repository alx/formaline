// requires GridStore config object used to setup formaline (see below)
// see https://github.com/christkv/node-mongodb-native/blob/master/test/gridstore/grid_store_file_test.js
// 
// Chunk.DEFAULT_CHUNK_SIZE = 1024 * 256;

fileStorage.gridStore = {
  // Must set database object - new Db('my_mongodb', new Server("127.0.0.1", 27017, options_hash_here);
  database: null,
  // You can use an object id as well as filename now
  save: function(filename, options) {
    var me = this;
    var gs_options = options || {}
    return new mongodb.GridStore(me.database, filename, "w", gs_options);
  },
  // set to true in order to force formaline to use GridStore instead (see writeToFileStore)
  status: 'closed',
  files: function(callback) {
    var me = this;
    client.collection(me.database, callback);
  }
  readFile: function(filename) {
    getFiles(function(err, collection) {      
      collection.find({'filename': filename}).toArray(function(err, items) {        
        // Read test of the file
        GridStore.read(client, filename, function(err, data) {
        });
      });
    });
  }
};