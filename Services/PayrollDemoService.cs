using matthewmackay.info.Models;
using MatthewMackay.Info.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace matthewmackay.info.Services
{
    public class PayrollDemoService
    {
        private readonly IMongoCollection<Employee> _employeeCollection;

        public PayrollDemoService(IDatabaseSettings dbSettings)
        {
            var client = new MongoClient(dbSettings.ConnectionString);
            var database = client.GetDatabase(dbSettings.DatabaseName);
            _employeeCollection = database.GetCollection<Employee>(dbSettings.EmployeeCollectionName);
        }

        public async Task<List<Employee>> GetAll(int userId) =>
            (await _employeeCollection.FindAsync(t => t.UserId == userId)).ToList();

        public async Task<Employee> Get(int userId, ObjectId Id) =>
             await _employeeCollection.Find(t => t.Id == Id && t.UserId == userId)
                .FirstOrDefaultAsync();

        public async Task<Employee> Upsert(int userId, Employee item)
        {
            try
            {
                item.UserId = userId;
                ReplaceOneResult actionResult
                    = await _employeeCollection
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

        public void Insert(Employee employee) => _employeeCollection.InsertOne(employee);

    }
}
