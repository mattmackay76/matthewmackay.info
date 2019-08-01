using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace matthewmackay.info.Models
{
    public class Dependent
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
        public string Name { get; set; }

        public string DependentType { get; set; }

    }
}
