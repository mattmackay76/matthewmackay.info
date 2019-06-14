﻿using matthewmackay.info.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace matthewmackay.info.Services
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

        public List<Test> Get() => _testCollection.Find<Test>(t => true).ToList();

    }
}
