using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatthewMackay.Info.Models
{
    public interface IDatabaseSettings
    {
        string EmployeeCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class DatabaseSettings : IDatabaseSettings
    {
        public string EmployeeCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

}
