using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace matthewmackay.info.Models
{
    public interface IDatabaseSettings
    {
        string TestCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class DatabaseSettings : IDatabaseSettings
    {
        public string TestCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

}
