using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace matthewmackay.info.Models
{
    public class Employee
    {
        [BsonIgnore]
        [JsonProperty("id")]
        public string _id
        {
            get
            {
                return Id.ToString();
            }
            set
            {
                Id = new ObjectId(value);
            }
        }

        [BsonId]
        [JsonIgnore]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [JsonIgnore]
        public int? UserId { get; set; }

        public List<Dependent> Dependents { get; set; }

        public string Name { get; set; }

        public int AnnualPayPeriods { get; set; }

        public decimal SalaryPerPeriod { get; set; }

        public decimal AnnualBenefitExpense { get; set; }

        public decimal AnnualDependentBenefitExpense { get; set; }

    }
}
