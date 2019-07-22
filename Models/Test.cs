using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatthewMackay.Info.Models
{
    [Serializable]
    public class Test
    {
        [BsonIgnore]
        [JsonProperty("id")]
        public string _id {
            get {
                return Id.ToString();
            }
            set {
                Id = new ObjectId(value);
            }
        }

        [BsonId]
        [JsonIgnore]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [JsonIgnore]
        public int? UserId { get; set; }

        public string SomeData { get; set; }
        
    }
}
