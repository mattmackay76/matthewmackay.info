using MatthewMackay.Info.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatthewMackay.Info.Services
{
    public class TestService
    {
        private readonly IMongoCollection<Test> _testCollection;
        public TestService(IDatabaseSettings dbSettings)
        {
            var client = new MongoClient(dbSettings.ConnectionString);
            var database = client.GetDatabase(dbSettings.DatabaseName);
            _testCollection = database.GetCollection<Test>(dbSettings.TestCollectionName);
        }

        public async Task<List<Test>> GetAll(int userId) => 
            (await _testCollection.FindAsync(t => t.UserId == userId)).ToList();

        public async Task<Test> Get(int userId, ObjectId Id) =>
             await _testCollection.Find(t => t.Id == Id && t.UserId == userId)
                .FirstOrDefaultAsync();
            


        public async Task<Test> Upsert(int userId, Test item)
        {
            try
            {
                item.UserId = userId;
                ReplaceOneResult actionResult
                    = await _testCollection
                                    .ReplaceOneAsync(n => n.Id.Equals(item.Id)
                                            , item
                                            , new UpdateOptions { IsUpsert = true });

                if (!actionResult.IsAcknowledged)
                    throw new Exception("Unable to upsert");

                return item;

            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }


        public void Insert(Test test) => _testCollection.InsertOne(test);

    }
}
